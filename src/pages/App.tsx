import React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import { hasValue } from '../helpers/utilHelper';
import { PrivateRoute } from '../helpers/privateRouter';
import { Routes } from './routes';
import { Weight } from './weight';
import { Home } from './home';
import { Auth } from './auth';
import { Header } from '../components/header';
import { useAuth } from '../services/authService';
import { userContext } from '../context/userContext';

const Application: React.FC = React.memo(() => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { user, initialising } = useAuth();
  const [isReady, setReady] = React.useState<boolean>(false);

  const [isDarkTheme, setDarkTheme] = React.useState<boolean>();

  React.useEffect(() => {
    if (initialising || !user) {
      return;
    }

    if (hasValue(user)) {
      user.getIdTokenResult().then((value: any) => {
        axios.defaults.headers.common.Authorization = value.token;
        // new UserService(config).addOrUpdate({
        //   id: user.uid,
        //   email: user.email,
        //   displayName: user.displayName,
        //   photoUrl: user.photoURL
        // } as UserModel);
        setReady(true);
      });
    }
  }, [user, initialising]);

  const theme = React.useMemo(() => {
    let theme = prefersDarkMode;

    if (hasValue(localStorage.getItem('darkTheme'))) {
      console.log('localStorage ', hasValue(localStorage.getItem('darkTheme')));
      theme = JSON.parse(localStorage.getItem('darkTheme') as string);
      setDarkTheme(theme);
    }

    if (hasValue(isDarkTheme) && isDarkTheme !== theme) {
      theme = isDarkTheme as boolean;
      setDarkTheme(theme);
      localStorage.setItem('darkTheme', theme.toString());
    }

    return createMuiTheme({
      palette: {
        type: theme ? 'dark' : 'light'
      },
      typography: {
        button: {
          textTransform: 'none'
        }
      }
    });
  }, [prefersDarkMode, isDarkTheme]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <userContext.Provider
          value={{
            user: user,
            initialising: initialising,
            isReady: isReady,
            isDarkTheme: isDarkTheme ?? prefersDarkMode
            // setDarkTheme: handleDarkTheme
          }}
        >
          <BrowserRouter basename={process.env.PUBLIC_URL ?? undefined}>
            <Header />

            <Switch>
              <PrivateRoute key={Routes.weight} path={Routes.weight} component={Weight} />

              <Route key={Routes.auth} path={Routes.auth} component={Auth} />
              <Route key={Routes.home} path={Routes.home} component={Home} />
              <Route key={'*'} path="*">
                <h1> 404 </h1>
              </Route>
            </Switch>
          </BrowserRouter>
        </userContext.Provider>
      </ThemeProvider>
    </>
  );
});

export const App = Application;
