import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { Menu } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { Login } from './components/Login';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatArea } from './components/ChatArea';
import { AdminDashboard } from './components/AdminDashboard';
import { AutoLoginNotification } from './components/SessionExpirationNotification';
import { GlobalStyle, Container, IconButton } from './components/styled';
import { lightTheme } from './theme';

const MobileMenuButton = styled(IconButton)`
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.md};

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: all 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  
  const handleNavigateToAdmin = () => {
    navigate('/admin');
    closeSidebar();
  };

  const handleNavigateToChat = () => {
    navigate('/');
    closeSidebar();
  };

  const isAdminPage = location.pathname === '/admin';
  const isChatPage = location.pathname === '/chat' || location.pathname === '/';

  const renderMainContent = () => {
    if (isAdminPage) {
      return <AdminDashboard />;
    } else {
      return <ChatArea />;
    }
  };

  return (
    <ChatProvider>
      <Container>
        <MobileMenuButton onClick={toggleSidebar}>
          <Menu size={20} />
        </MobileMenuButton>
        
        <Overlay isVisible={sidebarOpen} onClick={closeSidebar} />
        
        <ChatSidebar 
          isOpen={sidebarOpen} 
          onClose={closeSidebar}
          onNavigateToAdmin={handleNavigateToAdmin}
          onNavigateToChat={handleNavigateToChat}
          isAdminPage={isAdminPage}
        />
        {renderMainContent()}
      </Container>
    </ChatProvider>
  );
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
        <AutoLoginNotification />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
