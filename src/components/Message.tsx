import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Bot, Copy, Check, Image, ExternalLink } from 'lucide-react';
import { Message as MessageType } from '../types';
import { formatDate } from '../utils';
import { ChatService } from '../services/chat';

const MessageContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 100%;
`;

const UserQuery = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.4;
`;

const AssistantResponse = styled.div`
  position: relative;
`;

const ResponseTimestamp = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.sm};
  text-align: left;
`;

const ResponseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const BotAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const BotName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const TabContainer = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: ${props => props.theme.colors.surface};
  overflow: hidden;
`;

const TabHeader = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TabButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  background: ${props => props.isActive ? props.theme.colors.surface : 'transparent'};
  color: ${props => props.isActive ? props.theme.colors.text : props.theme.colors.textSecondary};
  cursor: pointer;
  font-weight: ${props => props.isActive ? '600' : '400'};
  font-size: 0.875rem;
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
  }
  
  &:first-child {
    border-radius: ${props => props.theme.borderRadius.md} 0 0 0;
  }
  
  ${props => props.isActive && `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${props.theme.colors.primary};
    }
  `}
`;

const TabContent = styled.div`
  padding: ${props => props.theme.spacing.md};
  min-height: 120px;
`;

const MarkdownContent = styled.div`
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  
  h1, h2, h3, h4, h5, h6 {
    margin: ${props => props.theme.spacing.md} 0 ${props => props.theme.spacing.sm} 0;
    color: ${props => props.theme.colors.text};
    font-weight: 600;
  }
  
  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.3rem; }
  h3 { font-size: 1.1rem; }
  h4, h5, h6 { font-size: 1rem; }
  
  p {
    margin: ${props => props.theme.spacing.sm} 0;
    line-height: 1.7;
  }
  
  ul, ol {
    margin: ${props => props.theme.spacing.sm} 0;
    padding-left: ${props => props.theme.spacing.lg};
  }
  
  li {
    margin: ${props => props.theme.spacing.xs} 0;
    line-height: 1.6;
  }
  
  code {
    background-color: ${props => props.theme.colors.surface};
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9em;
    color: ${props => props.theme.colors.primary};
  }
  
  pre {
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.md} 0;
    
    code {
      background: none;
      padding: 0;
      color: ${props => props.theme.colors.text};
    }
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    margin: ${props => props.theme.spacing.md} 0;
    padding-left: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textSecondary};
    font-style: italic;
  }
  
  strong, b {
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }
  
  em, i {
    font-style: italic;
  }
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  hr {
    border: none;
    border-top: 1px solid ${props => props.theme.colors.border};
    margin: ${props => props.theme.spacing.lg} 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${props => props.theme.spacing.md} 0;
  }
  
  th, td {
    border: 1px solid ${props => props.theme.colors.border};
    padding: ${props => props.theme.spacing.sm};
    text-align: left;
  }
  
  th {
    background-color: ${props => props.theme.colors.surface};
    font-weight: 600;
  }
`;

const EmptyTabContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
  font-size: 0.875rem;
`;

const SourceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.background};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SourceFavicon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.primary};
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: white;
  font-weight: bold;
`;

const SourceContent = styled.div`
  flex: 1;
`;

const SourceTitle = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: 0.875rem;
`;

const SourceDescription = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8rem;
  line-height: 1.4;
`;

const SourceLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const ImageItem = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ImagePlaceholder = styled.div`
  height: 100px;
  background-color: ${props => props.theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
`;

const ImageCaption = styled.div`
  padding: ${props => props.theme.spacing.sm};
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const MessageActions = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  
  &.show-actions {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.sm};
  
  &:hover {
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.surface};
  }
`;

const MessageTime = styled.div<{ isUser: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.xs};
  text-align: ${props => props.isUser ? 'right' : 'left'};
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-style: italic;
  color: ${props => props.theme.colors.textSecondary};
  
  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.textSecondary};
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 60%, 100% {
      opacity: 1;
    }
    30% {
      opacity: 0.3;
    }
  }
`;

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'lumo' | 'images' | 'sources'>('lumo');
  const isUser = message.type === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  // Get enhanced response data for assistant messages
  const enhancedResponse = !isUser && message.originalQuery ? 
    ChatService.getResponseData(message.originalQuery) : null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'lumo':
        if (message.isLoading) {
          return <TypingIndicator>Thinking</TypingIndicator>;
        }
        return (
          <MarkdownContent>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </MarkdownContent>
        );
      
      case 'images':
        if (message.isLoading) {
          return <EmptyTabContent>Loading images...</EmptyTabContent>;
        }
        if (!enhancedResponse?.images || enhancedResponse.images.length === 0) {
          return <EmptyTabContent>No images available</EmptyTabContent>;
        }
        return (
          <ImageGrid>
            {enhancedResponse.images.map((image, index) => (
              <ImageItem key={index}>
                <ImagePlaceholder>
                  <Image size={32} />
                </ImagePlaceholder>
                <ImageCaption>{image.description}</ImageCaption>
              </ImageItem>
            ))}
          </ImageGrid>
        );
      
      case 'sources':
        if (message.isLoading) {
          return <EmptyTabContent>Loading sources...</EmptyTabContent>;
        }
        if (!enhancedResponse?.sources || enhancedResponse.sources.length === 0) {
          return <EmptyTabContent>No sources available</EmptyTabContent>;
        }
        return (
          <div>
            {enhancedResponse.sources.map((source, index) => {
              // Extract the first letter of the title for favicon
              const faviconLetter = source.title.charAt(0).toUpperCase();
              
              return (
                <SourceItem key={index}>
                  <SourceFavicon>{faviconLetter}</SourceFavicon>
                  <SourceContent>
                    <SourceTitle>
                      <SourceLink href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.title}
                      </SourceLink>
                    </SourceTitle>
                    <SourceDescription>{source.description}</SourceDescription>
                  </SourceContent>
                </SourceItem>
              );
            })}
          </div>
        );
      
      default:
        return (
          <MarkdownContent>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </MarkdownContent>
        );
    }
  };

  return (
    <MessageContainer>
      {/* Show user query in bold at the top */}
      {isUser ? (
        <UserQuery>{message.content}</UserQuery>
      ) : (
        /* For assistant messages, show the response with tabs */
        <AssistantResponse>
          <ResponseHeader>
            <BotAvatar>
              <Bot size={12} />
            </BotAvatar>
            <BotName>Lumo</BotName>
          </ResponseHeader>
          
          <TabContainer>
            <TabHeader>
              <TabButton 
                isActive={activeTab === 'lumo'} 
                onClick={() => setActiveTab('lumo')}
              >
                <Bot size={16} />
                Lumo
              </TabButton>
              <TabButton 
                isActive={activeTab === 'images'} 
                onClick={() => setActiveTab('images')}
              >
                <Image size={16} />
                Images {enhancedResponse?.images?.length ? `• ${enhancedResponse.images.length}` : ''}
              </TabButton>
              <TabButton 
                isActive={activeTab === 'sources'} 
                onClick={() => setActiveTab('sources')}
              >
                <ExternalLink size={16} />
                Sources {enhancedResponse?.sources?.length ? `• ${enhancedResponse.sources.length}` : ''}
              </TabButton>
            </TabHeader>
            <TabContent>
              {renderTabContent()}
            </TabContent>
          </TabContainer>
          
          <MessageActions 
            className={!message.isLoading ? "show-actions" : ""}
            onMouseEnter={(e) => e.currentTarget.classList.add('show-actions')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('show-actions')}
          >
            <ActionButton onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </ActionButton>
          </MessageActions>
          
          {!message.isLoading && (
            <ResponseTimestamp>
              {formatDate(message.timestamp)}
            </ResponseTimestamp>
          )}
        </AssistantResponse>
      )}
    </MessageContainer>
  );
};
