import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import TheVault from "./components/TheVault.jsx";
import LogInSignUp from './components/LogInSignUp.jsx';
import AccountInfo from './components/AccountInfo';
import ProfilePage from './components/ProfilePage';
import Error404Page from "./components/Error404Page.jsx";
import MissingResultPage from "./components/MissingResultPage.jsx";
import InformationalPage from "./components/InformationalPage.jsx"

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
      {
        path: 'films/:id',
        element: <InformationalPage category="films" />
      },
      {
        path: 'characters/:id',
        element: <InformationalPage category="characters" />
      },
      {
        path: 'droids/:id',
        element: <InformationalPage category="droids" />
      },
      {
        path: 'creatures/:id',
        element: <InformationalPage category="creatures" />
      },
      {
        path: 'locations/:id',
        element: <InformationalPage category="locations" />
      },
      {
        path: 'organizations/:id',
        element: <InformationalPage category="organizations" />
      },
      {
        path: 'species/:id',
        element: <InformationalPage category="species" />
      },
      {
        path: 'starships/:id',
        element: <InformationalPage category="starships" />
      },
      {
        path: 'vehicles/:id',
        element: <InformationalPage category="vehicles" />
      },
      {
        path: 'planets/:id',
        element: <InformationalPage category="planets" />
      },
    ],
    errorElement: <Error404Page />
  }
]);
export default router;