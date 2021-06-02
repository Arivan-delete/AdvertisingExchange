import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AddBlurForm } from '../../components/AddBlurForm';
import { Blur } from '../../components/Blur';
import { useHomeStyles } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlurs } from '../../store/ducks/blurs/actionCreators';
import { selectIsBlursLoading, selectBlursItems } from '../../store/ducks/blurs/selectors';
import { Route } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { FullBlur } from './components/FullBlur';
import { fetchTags } from '../../store/ducks/tags/actionCreators';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactNotification from 'react-notifications-component'
import { store } from '../../store/store';

export const Home = (): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const blurs = useSelector(selectBlursItems);
  const isLoading = useSelector(selectIsBlursLoading);

  React.useEffect(() => {
    dispatch(fetchBlurs());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <Paper className={classes.blursWrapper} variant="outlined">
      <Paper className={classes.blursHeader} variant="outlined">
        <Route path="/home/:any">
          <BackButton />
        </Route>

        <Route path={['/home', '/home/search']} exact>
          <Typography variant="h6">Дописи</Typography>
        </Route>

        <Route path="/home/blur">
          <Typography variant="h6">Створити допис</Typography>
        </Route>
      </Paper>

      <Route path={['/home', '/home/search']} exact>
        <Paper>
          <div className={classes.addForm}>
            <AddBlurForm classes={classes} />
          </div>
          <div className={classes.addFormBottomLine} />
        </Paper>
      </Route>

      <Route path="/home" exact>
        {isLoading ? (
          <div className={classes.blursCentred}>
            <CircularProgress />
          </div>
        ) : (
          blurs.map((blur: any) => (
            <Blur key={blur._id} classes={classes} images={blur.images} {...blur} />
          ))
        )}
      </Route>
      <ReactNotification/>
      <Route path="/home/blur/:id" component={FullBlur} exact />
    </Paper>
  );
};
