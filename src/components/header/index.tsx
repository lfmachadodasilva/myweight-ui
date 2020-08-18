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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

import { Routes } from '../../pages/routes';
import { userContext } from '../../context/userContext';
import { hasValue } from '../../helpers/utilHelper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { signOut } from '../../services/authService';

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
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 999,
    // [theme.breakpoints.up('sm')]: {
    //   zIndex: theme.zIndex.drawer
    // },
    position: 'static'
  }
}));

const HeaderComponent: React.FC = React.memo(() => {
  const classes = useStyles();
  const [t] = useTranslation();
  const history = useHistory();
  const { user } = React.useContext(userContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const userEmail = React.useMemo(() => user?.email ?? '', [user]);
  const userDisplayName = React.useMemo(() => user?.displayName ?? '', [user]);
  const userPhotoURL = React.useMemo(() => user?.photoURL ?? '', [user]);

  const handleGoToHome = React.useCallback(() => {
    history.push(Routes.home);
  }, [history]);

  const handleGoToAuth = React.useCallback(() => {
    history.push(Routes.auth);
  }, [history]);

  const handleProfileMenuOpen = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (hasValue(user)) {
        setAnchorEl(event.currentTarget);
        return;
      }
      setAnchorEl(null);
      handleGoToAuth();
    },
    [handleGoToAuth, user]
  );

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = React.useCallback(async () => {
    setAnchorEl(null);
    // setOpen(false);
    await signOut();
    setTimeout(() => history.push(Routes.home));
  }, [history]);

  const avatarIcon = React.useMemo(() => {
    return hasValue(userPhotoURL) ? (
      <Avatar alt={userEmail} src={userPhotoURL} className={classes.small} />
    ) : (
      <AccountCircle />
    );
  }, [classes.small, userEmail, userPhotoURL]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
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
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                >
                  {avatarIcon}
                </IconButton>
                <Menu
                  data-testid="avatar-menu-element"
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>{avatarIcon}</ListItemIcon>
                    <ListItemText primary={userDisplayName} />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t('HEADER.SETTINGS')} />
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t('HEADER.LOGOUT')} />
                  </MenuItem>
                </Menu>
              </div>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
});

export const Header = HeaderComponent;
