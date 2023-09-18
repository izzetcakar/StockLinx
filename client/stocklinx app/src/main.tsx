import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from "react-redux";
import store from "./redux/store";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Notifications position="top-center" />
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </Provider>,
)