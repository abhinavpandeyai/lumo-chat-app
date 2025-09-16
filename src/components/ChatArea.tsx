import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { Message } from './Message';
import { MessageInput } from './MessageInput';
import { MainContent, EmptyState, EmptyStateTitle, EmptyStateText, Button } from './styled';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  min-height: 40px;
  position: relative;
`;

const ChatHeaderLogo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const ChatTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ChatSubtitle = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-left: ${props => props.theme.spacing.sm};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background};
`;

const MessagesWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`;

const WelcomeLogo = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
`;

const CenteredInputContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: ${props => props.theme.spacing.xl} 0;
`;

const SuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 600px;
`;

const SuggestionButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: left;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary}10;
  }
`;

const ScrollToBottom = styled.button`
  position: fixed;
  bottom: 120px;
  right: 32px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease-in-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const ChatArea: React.FC = () => {
  const { activeChat, createNewChat, sendMessage } = useChat();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = React.useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const suggestedQuestions = [
    "How can ERP help streamline our business processes?",
    "What are the key modules in a modern ERP system?",
    "How to improve inventory management with ERP?"
  ];

  const handleSuggestionClick = async (question: string) => {
    // Send the message directly - the context will handle creating a new chat if needed
    try {
      await sendMessage(question);
    } catch (error) {
      console.error('Error sending suggestion:', error);
    }
  };

  // Auto-scroll disabled - let user control scrolling
  // useEffect(() => {
  //   scrollToBottom();
  // }, [activeChat?.messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && (activeChat?.messages.length || 0) > 0);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeChat?.messages?.length]);

  if (!activeChat || !activeChat.messages || activeChat.messages.length === 0) {
    return (
      <MainContent>
        <ChatHeader>
          <ChatHeaderLogo src="/images/pcsoft_logo.jpeg" alt="PCSoft Logo" />
        </ChatHeader>
        
        <MessagesContainer>
          <WelcomeContainer>
            <WelcomeTitle>
              What can I help with?
            </WelcomeTitle>
            
            <CenteredInputContainer>
              <MessageInput isInCenter={true} />
            </CenteredInputContainer>
            
            <SuggestionsContainer>
              {suggestedQuestions.map((question, index) => (
                <SuggestionButton
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                >
                  {question}
                </SuggestionButton>
              ))}
            </SuggestionsContainer>
          </WelcomeContainer>
        </MessagesContainer>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <ChatHeader>
        <ChatHeaderLogo src="/images/pcsoft_logo.jpeg" alt="PCSoft Logo" />
      </ChatHeader>

      <MessagesContainer ref={messagesContainerRef}>
        <MessagesWrapper>
          {(() => {
            const messagePairs = [];
            const messages = activeChat.messages;
            
            for (let i = 0; i < messages.length; i++) {
              const message = messages[i];
              
              if (message.type === 'user') {
                // Find the corresponding assistant message
                const assistantMessage = messages[i + 1];
                
                if (assistantMessage && assistantMessage.type === 'assistant') {
                  // Create a conversation pair
                  messagePairs.push(
                    <div key={`pair-${message.id}`} style={{ marginBottom: '2rem' }}>
                      <Message key={message.id} message={message} />
                      <Message key={assistantMessage.id} message={assistantMessage} />
                    </div>
                  );
                  i++; // Skip the assistant message in the next iteration
                } else {
                  // User message without assistant response
                  messagePairs.push(<Message key={message.id} message={message} />);
                }
              } else {
                // Standalone assistant message (shouldn't happen normally)
                messagePairs.push(<Message key={message.id} message={message} />);
              }
            }
            
            return messagePairs;
          })()}
          <div ref={messagesEndRef} />
        </MessagesWrapper>
      </MessagesContainer>

      <ScrollToBottom
        className={showScrollButton ? 'visible' : ''}
        onClick={scrollToBottom}
      >
        ↓
      </ScrollToBottom>

      <MessageInput />
    </MainContent>
  );
};
