import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from "react-redux";
import store from "./redux/store";
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <ModalsProvider>
        <Notifications position="top-center" />
        <App />
      </ModalsProvider>
    </MantineProvider>
  </Provider>
)
