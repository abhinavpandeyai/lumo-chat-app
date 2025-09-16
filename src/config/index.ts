export const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  appName: process.env.REACT_APP_APP_NAME || 'Lumo',
  version: process.env.REACT_APP_VERSION || '1.0.0',
  environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  
  // Storage keys
  storage: {
    authToken: 'lumo_auth_token',
    user: 'lumo_user',
    chats: 'lumo_chats',
    theme: 'lumo_theme',
  },

  // API endpoints
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      me: '/auth/me',
    },
    chat: {
      conversations: '/chat/conversations',
      messages: '/chat/messages',
      send: '/chat/send',
    },
  },

  // App settings
  settings: {
    maxChatHistory: 100,
    messageTimeout: 30000,
    autoSaveInterval: 5000,
  },
};
