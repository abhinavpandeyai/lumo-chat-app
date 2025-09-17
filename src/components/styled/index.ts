import styled, { createGlobalStyle } from 'styled-components';
import { Theme } from '../../types';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  #root {
    height: 100vh;
    width: 100vw;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md' | 'lg' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
  
  ${props => {
    const size = props.size || 'md';
    switch (size) {
      case 'sm':
        return `
          padding: ${props.theme.spacing.sm} ${props.theme.spacing.md};
          font-size: 0.875rem;
          height: 32px;
        `;
      case 'lg':
        return `
          padding: ${props.theme.spacing.md} ${props.theme.spacing.lg};
          font-size: 1rem;
          height: 48px;
        `;
      default:
        return `
          padding: ${props.theme.spacing.sm} ${props.theme.spacing.md};
          font-size: 0.875rem;
          height: 40px;
        `;
    }
  }}

  ${props => {
    const variant = props.variant || 'primary';
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${props.theme.colors.surface};
          color: ${props.theme.colors.text};
          border: 1px solid ${props.theme.colors.border};
          
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.border};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${props.theme.colors.textSecondary};
          
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.surface};
            color: ${props.theme.colors.text};
          }
        `;
      default:
        return `
          background-color: ${props.theme.colors.primary};
          color: white;
          
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  resize: none;
  font-family: inherit;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const Sidebar = styled.aside<{ isOpen?: boolean }>`
  width: 280px;
  background-color: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: transform 0.3s ease-in-out;
  overflow: hidden; /* Prevent sidebar itself from scrolling */

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  min-height: 64px;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: transparent;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  /* Better touch targets on mobile */
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  margin: ${props => props.theme.spacing.md};
  flex-shrink: 0; /* Prevent search from shrinking */
`;

export const SearchInput = styled(Input)`
  padding-left: 40px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  pointer-events: none;
`;

export const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 ${props => props.theme.spacing.md};
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  
  /* Ensure minimum height for proper scrolling */
  min-height: 0;
  
  /* Better scrollbar on mobile */
  @media (max-width: 768px) {
    /* Hide scrollbar on mobile for cleaner look */
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ChatItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  ${props => props.isActive ? `
    background-color: ${props.theme.colors.primary};
    color: white;
  ` : `
    background-color: transparent;
    color: ${props.theme.colors.text};
    
    &:hover {
      background-color: ${props.theme.colors.border};
    }
  `}
`;

export const ChatTitle = styled.span`
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatDate = styled.span`
  font-size: 0.75rem;
  opacity: 0.7;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
`;

export const EmptyStateText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 400px;
`;
