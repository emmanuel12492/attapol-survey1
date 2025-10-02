import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react'
import theme from './theme'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AvailableSurveys from './pages/AvailableSurveys'
import SurveyDetail from './pages/SurveyDetail'
import UserDashboard from './pages/UserDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { authService } from './services/api'

interface User {
  id: number;
  username: string;
  email: string;
  points: number;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('token');
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ username: email, password });
      if (response.access_token) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        return response;
      } else {
        throw new Error('Login failed - no access token received');
      }
    } catch (error: any) {
      // Clear any existing auth state if login fails
      localStorage.removeItem('token');
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const authContextValue = {
    user,
    setUser,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthContext.Provider value={authContextValue}>
        <Box minH="100vh" bg="gray.50">
          <Navbar />
          <Box as="main" py={8}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/surveys" 
                element={
                  <PrivateRoute>
                    <AvailableSurveys />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/survey/:id" 
                element={
                  <PrivateRoute>
                    <SurveyDetail />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </Box>
        </Box>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App
