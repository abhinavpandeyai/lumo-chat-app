import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { LoginFormData } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card } from './styled';
import toast from 'react-hot-toast';

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  padding: ${props => props.theme.spacing.lg};
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
    align-items: flex-start;
    padding-top: ${props => props.theme.spacing.xl};
  }
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.theme.spacing.xl};
    min-height: auto;
  }
`;

const LoginHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.lg};
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const LoginTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

const LoginSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const FormGroup = styled.div`
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const ErrorMessage = styled.span`
  display: block;
  color: ${props => props.theme.colors.error};
  font-size: 0.75rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

const DemoCredentials = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

const DemoTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
`;

const DemoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
`;

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome to Lumo!');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleAdminLogin = () => {
    if (setValue) {
      setValue('email', 'sateesh.jain@pcsoft.com');
      setValue('password', 'admin123');
    }
  };

  const handleUserLogin = () => {
    if (setValue) {
      setValue('email', 'harsha.jain@pcsoft.com');
      setValue('password', 'user123');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LogoContainer>
            <Logo src="/images/pcsoft_logo.jpeg" alt="pcsoft Logo" />
            <Logo src="/images/lumo_logo.png" alt="Lumo Logo" />
          </LogoContainer>
          <LoginTitle>PCSoft AI Assistant</LoginTitle>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordContainer>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </PasswordToggle>
            </PasswordContainer>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FormGroup>

          <Button type="submit" disabled={isLoading} size="lg">
            <LogIn size={16} />
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </LoginForm>

        <DemoCredentials>
          <DemoTitle>Demo Credentials</DemoTitle>
          <DemoItem>
            <span>Admin: sateesh.jain@pcsoft.com / admin123</span>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={handleAdminLogin}
            >
              Use
            </Button>
          </DemoItem>
          <DemoItem>
            <span>User: harsha.jain@pcsoft.com / user123</span>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={handleUserLogin}
            >
              Use
            </Button>
          </DemoItem>
        </DemoCredentials>
      </LoginCard>
    </LoginContainer>
  );
};
