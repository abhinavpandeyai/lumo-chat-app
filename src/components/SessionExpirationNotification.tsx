import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { SessionManager } from '../utils/session';
import { useAuth } from '../contexts/AuthContext';

const NotificationContainer = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 10000;
  max-width: 300px;
  transform: translateX(${props => props.show ? '0' : '100%'});
  opacity: ${props => props.show ? '1' : '0'};
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
    max-width: none;
    top: 10px;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary};
`;

const NotificationTitle = styled.h4`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
`;

const NotificationMessage = styled.p`
  margin: ${props => props.theme.spacing.xs} 0 0 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  line-height: 1.3;
`;

const TimeRemaining = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

export const AutoLoginNotification: React.FC = () => {
  const [show, setShow] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setShow(false);
      return;
    }

    // Check if this is an auto-login session
    const checkAutoLogin = () => {
      const remaining = SessionManager.getAutoLoginTimeRemaining();
      setTimeRemaining(remaining);

      // Show notification only if auto-login window is active and less than 5 minutes remain
      const isAutoLoginActive = remaining > 0;
      const shouldShow = isAutoLoginActive && remaining <= (5 * 60 * 1000);
      
      if (shouldShow && !show) {
        setShow(true);
        // Auto-hide after 5 seconds
        setTimeout(() => setShow(false), 5000);
      }
    };

    // Check immediately
    checkAutoLogin();

    // Check every 30 seconds
    const interval = setInterval(checkAutoLogin, 30 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, show]);

  const formatTimeRemaining = (ms: number): string => {
    const minutes = Math.floor(ms / (60 * 1000));
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <NotificationContainer show={show}>
      <NotificationHeader>
        <CheckCircle size={16} />
        <NotificationTitle>Auto-Login Active</NotificationTitle>
      </NotificationHeader>
      
      <NotificationMessage>
        Auto-login available for{' '}
        <TimeRemaining>{formatTimeRemaining(timeRemaining)}</TimeRemaining> more.
        {' '}Continue using the app normally.
      </NotificationMessage>
    </NotificationContainer>
  );
};