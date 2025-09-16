import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Send, Plus } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { Button, Textarea } from './styled';

const InputContainer = styled.div<{ isInCenter?: boolean }>`
  padding: ${props => props.isInCenter ? '0' : `${props.theme.spacing.lg}`};
  border-top: ${props => props.isInCenter ? 'none' : `1px solid ${props.theme.colors.border}`};
  background-color: ${props => props.isInCenter ? 'transparent' : props.theme.colors.background};
`;

const InputWrapper = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: flex-end;
  max-width: 800px;
  margin: 0 auto;
`;

const TextareaContainer = styled.div`
  flex: 1;
  position: relative;
`;

const StyledTextarea = styled(Textarea)`
  min-height: 24px;
  max-height: 120px;
  padding-right: 50px;
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const SendButton = styled(Button)`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 32px;
  height: 32px;
  padding: 0;
  min-width: auto;
`;

const NewChatButton = styled(Button)`
  align-self: flex-end;
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const MAX_CHARS = 2000;

interface MessageInputProps {
  isInCenter?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ isInCenter = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { activeChat, createNewChat, sendMessage, isLoading } = useChat();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return;

    if (!activeChat) {
      createNewChat();
    }

    const messageContent = message.trim();
    setMessage('');
    
    try {
      await sendMessage(messageContent);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const canSend = message.trim().length > 0 && !isLoading;

  return (
    <InputContainer isInCenter={isInCenter}>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          {!activeChat && !isInCenter && (
            <NewChatButton
              type="button"
              variant="secondary"
              onClick={createNewChat}
            >
              <Plus size={16} />
            </NewChatButton>
          )}
          
          <TextareaContainer>
            <StyledTextarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_CHARS))}
              onKeyDown={handleKeyDown}
              placeholder={isInCenter ? "Ask anything..." : (activeChat ? "Type your message..." : "Start a new conversation...")}
              disabled={isLoading}
              rows={1}
            />
            
            <SendButton
              type="submit"
              disabled={!canSend}
              variant={canSend ? 'primary' : 'secondary'}
            >
              <Send size={16} />
            </SendButton>
            
            {message.length > MAX_CHARS * 0.8 && (
              <CharacterCount>
                {message.length}/{MAX_CHARS}
              </CharacterCount>
            )}
          </TextareaContainer>
        </InputWrapper>
      </form>
    </InputContainer>
  );
};
