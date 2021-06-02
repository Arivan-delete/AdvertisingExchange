import { Avatar, CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { BackButton } from '../../components/BackButton';
import { useHomeStyles } from '../theme';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import classNames from 'classnames';
import Skeleton from '@material-ui/lab/Skeleton';

import './User.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsBlursLoading, selectBlursItems } from '../../store/ducks/blurs/selectors';
import { Blur } from '../../components/Blur';
import { fetchBlurs } from '../../store/ducks/blurs/actionCreators';
import { User } from '../../store/ducks/user/contracts/state';
import { AuthApi } from '../../services/api/authApi';
import { RouteComponentProps } from 'react-router-dom';

export const UserPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const classes = useHomeStyles();
  const blurs = useSelector(selectBlursItems);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsBlursLoading);
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [userData, setUserData] = React.useState<any>();

  React.useEffect(() => {
    const userId = match.params.id;
    dispatch(fetchBlurs());
    if (userId) {
      AuthApi.getUserInfo(userId).then(user => {
        setUserData(user);
      });
    }
  }, [dispatch, match.params.id]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Paper className={classNames(classes.blursWrapper, 'user')} variant="outlined">
      <Paper className={classes.blursHeader} variant="outlined">
        <BackButton />
        <div>
          <Typography variant="h6">Madelaine Petsch</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {blurs.length} допису
          </Typography>
        </div>
      </Paper>

      <div className="user__header"></div>

      <div className="user__info">
        <Avatar src="https://cdn130.picsart.com/324781271027201.jpg?type=webp&to=min&r=240"/>
        {!userData ? (
          <Skeleton variant="text" width={250} height={30} />
        ) : (
          <h2 className="user__info-fullname">{userData.username}</h2>
        )}
        {!userData ? (
          <Skeleton variant="text" width={60} />
        ) : (
          <span className="user__info-username">@{userData?.username}</span>
        )}

        <p className="user__info-description">
        actor
        </p>
        <ul className="user__info-details">
          <li>USA, Port Orchard</li>
          <li>
            <a className="link" href="https://www.instagram.com/madelame/">
              Instagram
            </a>
          </li>
          <li>
            <br />
          </li>
        </ul>
      </div>
      <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
        <Tab label="Дописи" />
        <Tab label="Запити" />
        <Tab label="Завершені реклами" />
      </Tabs>
      <div className="user__blurs">
        {isLoading ? (
          <div className={classes.blursCentred}>
            <CircularProgress />
          </div>
        ) : (
          blurs.map((blur: any) => (
            <Blur key={blur._id} classes={classes} images={blur.images} {...blur} />
          ))
        )}
      </div>
    </Paper>
  );
};
