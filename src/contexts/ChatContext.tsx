import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Chat, Message, ChatContextType } from '../types';
import { ChatService } from '../services/chat';
import { useAuth } from './AuthContext';
import { generateId } from '../utils';

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  isLoading: boolean;
}

type ChatAction =
  | { type: 'SET_CHATS'; payload: Chat[] }
  | { type: 'SET_ACTIVE_CHAT'; payload: Chat | null }
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'UPDATE_CHAT'; payload: Chat }
  | { type: 'DELETE_CHAT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'UPDATE_MESSAGE'; payload: { chatId: string; messageId: string; content: string } }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: ChatState = {
  chats: [],
  activeChat: null,
  isLoading: false,
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_CHATS':
      return {
        ...state,
        chats: action.payload,
      };
    case 'SET_ACTIVE_CHAT':
      return {
        ...state,
        activeChat: action.payload,
      };
    case 'ADD_CHAT':
      return {
        ...state,
        chats: [action.payload, ...state.chats],
        // Don't automatically set as active here - let SET_ACTIVE_CHAT handle it
      };
    case 'UPDATE_CHAT':
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.id ? action.payload : chat
        ),
        activeChat: state.activeChat?.id === action.payload.id ? action.payload : state.activeChat,
      };
    case 'DELETE_CHAT':
      return {
        ...state,
        chats: state.chats.filter(chat => chat.id !== action.payload),
        activeChat: state.activeChat?.id === action.payload ? null : state.activeChat,
      };
    case 'ADD_MESSAGE':
      const updatedChats = state.chats.map(chat => {
        if (chat.id === action.payload.chatId) {
          return {
            ...chat,
            messages: [...chat.messages, action.payload.message],
            updatedAt: new Date(),
          };
        }
        return chat;
      });
      
      const updatedActiveChat = state.activeChat?.id === action.payload.chatId
        ? {
            ...state.activeChat,
            messages: [...state.activeChat.messages, action.payload.message],
            updatedAt: new Date(),
          }
        : state.activeChat;
      
      return {
        ...state,
        chats: updatedChats,
        activeChat: updatedActiveChat,
      };
    case 'UPDATE_MESSAGE':
      const chatsWithUpdatedMessage = state.chats.map(chat => {
        if (chat.id === action.payload.chatId) {
          return {
            ...chat,
            messages: chat.messages.map(msg => 
              msg.id === action.payload.messageId 
                ? { ...msg, content: action.payload.content }
                : msg
            ),
            updatedAt: new Date(),
          };
        }
        return chat;
      });
      
      const activeChatWithUpdatedMessage = state.activeChat?.id === action.payload.chatId
        ? {
            ...state.activeChat,
            messages: state.activeChat.messages.map(msg => 
              msg.id === action.payload.messageId 
                ? { ...msg, content: action.payload.content }
                : msg
            ),
            updatedAt: new Date(),
          }
        : state.activeChat;
      
      return {
        ...state,
        chats: chatsWithUpdatedMessage,
        activeChat: activeChatWithUpdatedMessage,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      const chats = ChatService.getChats();
      dispatch({ type: 'SET_CHATS', payload: chats });
    }
  }, [user]);

  // Separate effect to set the most recent chat as active when chats are loaded
  React.useEffect(() => {
    // Only set active chat automatically on initial load when there are chats but no active chat
    if (state.chats.length > 0 && !state.activeChat) {
      const mostRecentChat = state.chats[0]; // Chats are already sorted by most recent
      dispatch({ type: 'SET_ACTIVE_CHAT', payload: mostRecentChat });
    }
  }, [state.chats.length, state.activeChat]); // Include state.activeChat to fix deps warning

  const createNewChat = (): void => {
    if (!user) return;
    
    // Create new chat
    const newChat = ChatService.createNewChat(user.id);
    
    // Add the new chat to the state
    dispatch({ type: 'ADD_CHAT', payload: newChat });
    
    // Set the new chat as active
    dispatch({ type: 'SET_ACTIVE_CHAT', payload: newChat });
  };

  const selectChat = (chatId: string): void => {
    // Find the chat in current state first
    let chat = state.chats.find(c => c.id === chatId);
    
    // If not found in current state, refresh from storage
    if (!chat) {
      const chats = ChatService.getChats();
      dispatch({ type: 'SET_CHATS', payload: chats });
      chat = chats.find(c => c.id === chatId);
    }
    
    if (chat) {
      dispatch({ type: 'SET_ACTIVE_CHAT', payload: chat });
    }
  };

  const sendMessage = async (content: string): Promise<void> => {
    if (!user) return;

    let currentChat = state.activeChat;

    // Create new chat if there's no active chat
    if (!currentChat) {
      const newChat = ChatService.createNewChat(user.id);
      dispatch({ type: 'ADD_CHAT', payload: newChat });
      dispatch({ type: 'SET_ACTIVE_CHAT', payload: newChat });
      currentChat = newChat;
    }

    const chatId = currentChat.id;
    const isFirstMessage = currentChat.messages.length === 0;

    const userMessage: Message = {
      id: generateId(),
      content,
      type: 'user',
      timestamp: new Date(),
      chatId: chatId,
    };

    // Add user message immediately
    dispatch({ type: 'ADD_MESSAGE', payload: { chatId: chatId, message: userMessage } });
    ChatService.addMessageToChat(chatId, userMessage);

    // Update chat title if this is the first message
    if (isFirstMessage) {
      ChatService.updateChatTitle(chatId, content);
      const updatedTitle = content.length > 30 ? content.substring(0, 30) + '...' : content;
      
      // Get the chat with the newly added message to preserve all messages
      const chatWithNewMessage = {
        ...currentChat,
        messages: [...currentChat.messages, userMessage],
        title: updatedTitle,
        updatedAt: new Date()
      };
      
      dispatch({ type: 'UPDATE_CHAT', payload: chatWithNewMessage });
      dispatch({ type: 'SET_ACTIVE_CHAT', payload: chatWithNewMessage });
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Create initial assistant message
      const aiResponse = await ChatService.sendMessage(chatId, content);
      
      // Add the assistant message with empty content initially
      dispatch({ type: 'ADD_MESSAGE', payload: { chatId: chatId, message: aiResponse } });
      ChatService.addMessageToChat(chatId, aiResponse);

      // Stream the response content
      const streamGenerator = ChatService.streamResponse(content);
      
      for await (const chunk of streamGenerator) {
        // Update the message content progressively
        dispatch({ type: 'UPDATE_MESSAGE', payload: { chatId: chatId, messageId: aiResponse.id, content: chunk } });
      }

      // Final update to storage with complete content
      const finalMessage = state.activeChat?.messages.find(m => m.id === aiResponse.id);
      if (finalMessage?.content) {
        ChatService.updateMessageContent(chatId, aiResponse.id, finalMessage.content);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: generateId(),
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        type: 'assistant',
        timestamp: new Date(),
        chatId: chatId,
      };

      dispatch({ type: 'ADD_MESSAGE', payload: { chatId: chatId, message: errorMessage } });
      ChatService.addMessageToChat(chatId, errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };  const deleteChat = (chatId: string): void => {
    ChatService.deleteChat(chatId);
    dispatch({ type: 'DELETE_CHAT', payload: chatId });
  };

  const searchChats = (query: string): Chat[] => {
    return ChatService.searchChats(query);
  };

  const value: ChatContextType = {
    chats: state.chats,
    activeChat: state.activeChat,
    createNewChat,
    selectChat,
    sendMessage,
    deleteChat,
    searchChats,
    isLoading: state.isLoading,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
