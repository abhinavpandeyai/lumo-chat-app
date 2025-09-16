import React, { useState } from 'react';
import styled from 'styled-components';

const AvatarContainer = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: ${props => props.size * 0.4}px;
  flex-shrink: 0;
`;

const AvatarImage = styled.img<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  object-fit: cover;
  border-radius: 50%;
`;

interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  name, 
  size = 32, 
  className 
}) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (fullName?: string): string => {
    if (!fullName || typeof fullName !== 'string') {
      return '?';
    }
    
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      return '?';
    }
    
    const names = trimmedName.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // If no src provided or image failed to load, show initials
  if (!src || imageError) {
    return (
      <AvatarContainer size={size} className={className}>
        {getInitials(name)}
      </AvatarContainer>
    );
  }

  return (
    <AvatarImage
      src={src}
      alt={`${name || 'User'}'s avatar`}
      size={size}
      className={className}
      onError={handleImageError}
    />
  );
};
