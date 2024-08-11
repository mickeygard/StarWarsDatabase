import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import TheVault from "./components/TheVault.jsx";
import LogInSignUp from './components/LogInSignUp.jsx';
import AccountInfo from './components/AccountInfo';
import ProfilePage from './components/ProfilePage';
import Error404Page from "./components/Error404Page.jsx";
import MissingResultPage from "./components/MissingResultPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'loginsignup',
        element: <LogInSignUp />
      },
      {
        path: 'vault',
        element: <TheVault />
      },
      {
        path: 'accountinfo',
        element: <AccountInfo />
      },
      {
        path: 'profilepage',
        element: <ProfilePage />
      },
      {
        path: 'missingresult',
        element: <MissingResultPage />
      },
    ],
    errorElement: <Error404Page />
  }
]);
export default router;