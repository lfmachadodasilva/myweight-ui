import React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import CloseIcon from '@material-ui/icons/Close';
import FacebookIcon from '@material-ui/icons/Facebook';

import { loginWithFacebook } from '../../services/authService';
import { Routes } from '../routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    center: {
      textAlign: 'center',
      margin: theme.spacing(5)
    }
  })
);

const AuthPage: React.FC = React.memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const [t] = useTranslation();

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [hasError, setError] = React.useState<boolean>(false);

  const handleFacebook = React.useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      await loginWithFacebook();
      setTimeout(() => history.push(Routes.home));
    } catch (error) {
      setError(true);
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }, [history]);

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={12} className={classes.center}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FacebookIcon />}
            onClick={handleFacebook}
            endIcon={
              <>
                {isLoading && <CircularProgress size={15} />}
                {hasError && <CloseIcon color="secondary" data-testid="facebook-close-icon" />}
              </>
            }
            disabled={isLoading}
          >
            {t('AUTH.FACEBOOK.BUTTON')}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
});

export const Auth = AuthPage;
