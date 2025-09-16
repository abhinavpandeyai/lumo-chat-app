export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  chatId: string;
  isLoading?: boolean;
  originalQuery?: string; // For assistant messages, stores the original user query
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ChatContextType {
  chats: Chat[];
  activeChat: Chat | null;
  createNewChat: () => void;
  selectChat: (chatId: string) => void;
  sendMessage: (content: string) => Promise<void>;
  deleteChat: (chatId: string) => void;
  searchChats: (query: string) => Chat[];
  isLoading: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    error: string;
    warning: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}
