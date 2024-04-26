import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App';
import { NotificationContextProvider } from './contexts/notificationContext';
import { UserContextProvider } from './contexts/userContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider> 
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContextProvider> 
  </QueryClientProvider>
)
