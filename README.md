# Lumo - pcsoft AI Chat Application

A modern, enterprise-grade ChatGPT-like application built with React.js and TypeScript for pcsoft.

## 🚀 Features

- **Secure Authentication**: Enterprise-level login system with JWT tokens for pcsoft
- **Real-time Chat Interface**: Clean, responsive chat interface similar to ChatGPT
- **Chat Management**: Create, search, and manage multiple conversations
- **Message History**: Persistent chat history with local storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Professional UI**: Modern design with consistent theming
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Styled Components
- **Routing**: React Router v6
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lumo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

The application includes demo credentials for testing:

- **Admin User**:
  - Email: `sateesh.jain@pcsoft.com`
  - Password: `admin123`

- **Regular User**:
  - Email: `harsha.jain@pcsoft.com`
  - Password: `user123`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── styled/          # Styled components
│   ├── ChatArea.tsx     # Main chat interface
│   ├── ChatSidebar.tsx  # Sidebar with chat list
│   ├── Login.tsx        # Authentication page
│   ├── Message.tsx      # Individual message component
│   └── MessageInput.tsx # Message input form
├── contexts/            # React contexts
│   ├── AuthContext.tsx  # Authentication state
│   └── ChatContext.tsx  # Chat state management
├── services/            # API and business logic
│   ├── api.ts          # HTTP client configuration
│   ├── auth.ts         # Authentication service
│   └── chat.ts         # Chat service
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── theme/              # Theme configuration
├── config/             # App configuration
├── App.tsx             # Main app component
└── index.tsx           # App entry point
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_NAME=Lumo
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

### API Integration

The application is currently configured with mock services for demonstration. To integrate with a real AI service:

1. Update the `ChatService.sendMessage()` method in `src/services/chat.ts`
2. Replace the mock authentication in `src/services/auth.ts`
3. Configure your API endpoints in `src/config/index.ts`

## 🚀 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run type-check` - Run TypeScript compiler

## 🔒 Security Features

- JWT token-based authentication
- Protected routes
- Input validation and sanitization
- Secure local storage handling
- XSS protection through React

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1024px+)
- Tablets (768px - 1023px)
- Mobile phones (< 768px)

## 🎨 Theming

The application uses a consistent theme system with:
- Primary and secondary colors
- Consistent spacing and typography
- Professional shadows and borders
- Support for light/dark modes (extensible)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a demonstration application with mock AI responses. In a production environment, you would integrate with actual AI services like OpenAI GPT, Claude, or your custom AI backend.
