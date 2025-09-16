import React from 'react';
import styled from 'styled-components';
import { MessageSquare, Users, Zap, Shield, ArrowRight, Sparkles, Bot, FileText } from 'lucide-react';

const WelcomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  overflow-y: auto;
  min-height: 100vh;
`;

const WelcomeHeader = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  position: relative;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image: radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                    radial-gradient(circle at 75% 75%, white 2px, transparent 2px);
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
`;

const LogoContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.95;
`;

const WelcomeTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: ${props => props.theme.spacing.lg};
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const QuickStartButton = styled.button`
  background: white;
  color: #4f46e5;
  border: none;
  border-radius: 50px;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const WelcomeContent = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: #1f2937;
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  text-align: center;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.xl};
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
    
    &::before {
      left: 100%;
    }
  }
`;

const FeatureIcon = styled.div<{ gradient: string }>`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: ${props => props.gradient};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  font-size: 1rem;
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 25px;
  padding: ${props => props.theme.spacing.xxl};
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CTADescription = styled.p`
  font-size: 1.25rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.95;
`;

const StartChatButton = styled.button`
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xxl};
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
    background: #f8fafc;
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
  text-align: center;
`;

const StatCard = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
`;

interface WelcomePageProps {
  onStartChat?: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStartChat }) => {
  const handleStartChat = () => {
    if (onStartChat) {
      onStartChat();
    }
  };

  return (
    <WelcomeContainer>
      <WelcomeHeader>
        <BackgroundPattern />
        <LogoContainer>
          <Logo src="/images/lumo_logo.png" alt="Lumo Logo" />
        </LogoContainer>
        <WelcomeTitle>Welcome to Lumo</WelcomeTitle>
        <WelcomeSubtitle>
          Your intelligent AI assistant. Ask questions, get insights, and streamline your workflow.
        </WelcomeSubtitle>
        <QuickStartButton onClick={handleStartChat}>
          <Sparkles size={24} />
          Start Chatting
          <ArrowRight size={20} />
        </QuickStartButton>
      </WelcomeHeader>

      <WelcomeContent>
        <SectionTitle>Ready to Begin?</SectionTitle>
        <SectionSubtitle>
          Click the button above or use the "New Chat" option in the sidebar to start your conversation.
        </SectionSubtitle>
      </WelcomeContent>
    </WelcomeContainer>
  );
};