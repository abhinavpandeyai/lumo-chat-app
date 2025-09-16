import { User, LoginFormData, ApiResponse } from '../types';
import { config } from '../config';
import { AuthToken, LocalStorage } from '../utils';

// Mock authentication service for demo purposes
// In a real application, this would make actual API calls
export class AuthService {
  static async login(credentials: LoginFormData): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation (in real app, this would be server-side)
    if (credentials.email === 'sateesh.jain@pcsoft.com' && credentials.password === 'admin123') {
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'Sateesh Jain',
        role: 'admin',
        avatar: '/images/avatars/admin.jpg',
        createdAt: new Date(),
      };

      // Mock JWT token (in real app, this comes from server)
      const mockToken = this.generateMockToken(user);
      AuthToken.set(mockToken);
      LocalStorage.set(config.storage.user, JSON.stringify(user));

      return user;
    } else if (credentials.email === 'harsha.jain@pcsoft.com' && credentials.password === 'user123') {
      const user: User = {
        id: '2',
        email: credentials.email,
        name: 'Harsha Jain',
        role: 'user',
        avatar: '/images/avatars/user.jpg',
        createdAt: new Date(),
      };

      const mockToken = this.generateMockToken(user);
      AuthToken.set(mockToken);
      LocalStorage.set(config.storage.user, JSON.stringify(user));

      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  }

  static async logout(): Promise<void> {
    AuthToken.remove();
    LocalStorage.remove(config.storage.user);
    LocalStorage.remove(config.storage.chats);
  }

  static getCurrentUser(): User | null {
    try {
      const userStr = LocalStorage.getString(config.storage.user);
      if (!userStr || !AuthToken.isValid()) {
        return null;
      }
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return AuthToken.isValid() && this.getCurrentUser() !== null;
  }

  private static generateMockToken(user: User): string {
    // Generate a mock JWT token for demo purposes
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  }
}
