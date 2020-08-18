import React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import AccountCircle from '@material-ui/icons/AccountCircle';

import { Routes } from '../../pages/routes';
import { userContext } from '../../context/userContext';
import { hasValue } from '../../helpers/utilHelper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  title: {
    cursor: 'pointer'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  }
}));

const HeaderComponent: React.FC = React.memo(() => {
  const classes = useStyles();
  const [t] = useTranslation();
  const history = useHistory();
  const { user } = React.useContext(userContext);

  const handleGoToHome = React.useCallback(() => {}, []);

  const userEmail = React.useMemo(() => user?.email ?? '', [user]);
  // const userDisplayName = React.useMemo(() => user?.displayName ?? '', [user]);
  const userPhotoURL = React.useMemo(() => user?.photoURL ?? '', [user]);

  const handleGoToAuth = React.useCallback(() => {
    history.push(Routes.auth);
  }, [history]);

  const handleProfileMenuOpen = React.useCallback(
    () => (event: React.MouseEvent<HTMLButtonElement>) => {
      //   if (hasValue(user)) {
      //     setAnchorEl(event.currentTarget);
      //     return;
      //   }
      //   setAnchorEl(null);
      handleGoToAuth();
    },
    [handleGoToAuth]
  );

  const avatarIcon = React.useMemo(() => {
    return hasValue(userPhotoURL) ? (
      <Avatar alt={userEmail} src={userPhotoURL} className={classes.small} />
    ) : (
      <AccountCircle />
    );
  }, [classes.small, userEmail, userPhotoURL]);

  return (
    <div className={classes.root}>
      <AppBar>
        <Container maxWidth="md">
          <Toolbar>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography variant="h6" className={classes.title} onClick={handleGoToHome}>
                {t('HEADER.TITLE')}
              </Typography>

              <div className={classes.sectionDesktop}>
                <IconButton
                  data-testid="avatar-element"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {avatarIcon}
                </IconButton>
              </div>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
});

export const Header = HeaderComponent;
