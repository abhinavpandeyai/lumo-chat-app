import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Search, LogOut, MessageSquare, Trash2, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { Chat } from '../types';
import { Button, Sidebar, SearchContainer, SearchInput, SearchIcon, ChatList, ChatItem, ChatTitle, ChatDate } from './styled';
import { Avatar } from './Avatar';
import { formatDate, debounce } from '../utils';
import toast from 'react-hot-toast';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  onNavigateToAdmin?: () => void;
}

const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SidebarBrand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SidebarLogo = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0;
  display: none;
`;

const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: auto;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
`;

const UserEmail = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ChatActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;

const QueryHighlight = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: ${props => props.theme.spacing.xs};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ChatDateTime = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.2;
`;

const StyledChatItem = styled(ChatItem)`
  &:hover ${ChatActions} {
    opacity: 1;
  }
  
  /* Override text colors for better visibility when active */
  ${props => props.isActive && `
    ${QueryHighlight} {
      color: white;
    }
    
    ${ChatDateTime} {
      color: rgba(255, 255, 255, 0.8);
    }
  `}
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: transparent;
  color: currentColor;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const EmptyChats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onClose, onNavigateToAdmin }) => {
  const { user, logout } = useAuth();
  const { chats, activeChat, createNewChat, selectChat, deleteChat, searchChats } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);

  // Helper function to get the first user message from a chat
  const getFirstUserMessage = (chat: Chat) => {
    const firstUserMessage = chat.messages?.find((msg) => msg.type === 'user');
    return firstUserMessage?.content || chat.title;
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 60) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  React.useEffect(() => {
    // Show all chats in the sidebar
    setFilteredChats(chats);
  }, [chats]);

  const handleSearch = debounce((query: string) => {
    if (query.trim()) {
      const results = searchChats(query);
      setFilteredChats(results);
    } else {
      setFilteredChats(chats);
    }
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleNewChat = () => {
    createNewChat();
    if (onClose) onClose();
  };

  const handleChatSelect = (chatId: string) => {
    selectChat(chatId);
    if (onClose) onClose();
  };

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteChat(chatId);
      toast.success('Chat deleted');
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out successfully');
  };

  return (
    <Sidebar isOpen={isOpen}>
      <SidebarHeader>
        <SidebarBrand>
          <SidebarLogo 
            src="/images/lumo_logo.png" 
            alt="Lumo Logo" 
          />
        </SidebarBrand>
        <Button onClick={handleNewChat} size="sm">
          <Plus size={16} />
          New Chat
        </Button>
      </SidebarHeader>

      <SearchContainer>
        <SearchInput
          placeholder="Search chats..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchIcon>
          <Search size={16} />
        </SearchIcon>
      </SearchContainer>

      <ChatList>
        {filteredChats.length === 0 ? (
          <EmptyChats>
            <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <div>
              {searchQuery ? 'No chats found' : 'No chats yet'}
            </div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
              {searchQuery ? 'Try a different search term' : 'Start a new conversation'}
            </div>
          </EmptyChats>
        ) : (
          filteredChats.map((chat) => (
            <StyledChatItem
              key={chat.id}
              isActive={activeChat?.id === chat.id}
              onClick={() => handleChatSelect(chat.id)}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <QueryHighlight>
                  {truncateText(getFirstUserMessage(chat))}
                </QueryHighlight>
                <ChatDateTime>{formatDate(chat.updatedAt)}</ChatDateTime>
              </div>
              <ChatActions>
                <ActionButton onClick={(e) => handleDeleteChat(e, chat.id)}>
                  <Trash2 size={14} />
                </ActionButton>
              </ChatActions>
            </StyledChatItem>
          ))
        )}
      </ChatList>

      <SidebarFooter>
        {user && (
          <UserInfo>
            <Avatar 
              src={user.avatar} 
              name={user.name} 
              size={32}
            />
            <UserDetails>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserDetails>
          </UserInfo>
        )}
        
        {/* Show admin link only for admin users */}
        {user?.role === 'admin' && onNavigateToAdmin && (
          <Button variant="ghost" onClick={onNavigateToAdmin} size="sm">
            <Settings size={16} />
            Admin Dashboard
          </Button>
        )}
        
        <Button variant="ghost" onClick={handleLogout} size="sm">
          <LogOut size={16} />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
