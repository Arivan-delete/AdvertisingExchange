import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import mediumZoom from 'medium-zoom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepostIcon from '@material-ui/icons/RepeatOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/ReplyOutlined';
import { Divider, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';
import { fetchBlurData, setBlurData } from '../../../store/ducks/blur/actionCreators';
import { selectIsBlurLoading, selectBlurData } from '../../../store/ducks/blur/selectors';
import { useHomeStyles } from '../../theme';
import { Blur } from '../../../components/Blur';
import { ImageList } from '../../../components/ImageList';
import { store } from '../../../store/store';

export const FullBlur: React.FC = (): React.ReactElement | null => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const blurData = useSelector(selectBlurData);
  const isLoading = useSelector(selectIsBlurLoading);
  const params: { id?: string } = useParams();
  const id = params.id;

  React.useEffect(() => {
    if (id) {
      dispatch(fetchBlurData(id));
    }
    return () => {
      dispatch(setBlurData(undefined));
    };
  }, [dispatch, id]);

  React.useEffect(() => {
    if (!isLoading) {
      mediumZoom('.blur-images img');
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={classes.blursCentred}>
        <CircularProgress />
      </div>
    );
  }

  if (blurData) {
    return (
      <>
        <Paper className={classes.fullBlur}>
          <div className={classNames(classes.blursHeaderUser)}>
            <Avatar
              className={classes.blurAvatar}
              alt={`Аватарка користувача ${blurData.user.fullname}`}
            />
            <Typography>
              <Link to={`/user/${blurData.user._id}`}>
                <b>{blurData.user.fullname}</b>&nbsp;
              </Link>
              <div>
                <span className={classes.blurUserName}>@{blurData.user.username}</span>&nbsp;
              </div>
            </Typography>
          </div>
          <Typography className={classes.fullBlurText} gutterBottom>
            {blurData.text}
            <div className="blur-images">
              {blurData.images && <ImageList classes={classes} images={blurData.images} />}
            </div>
          </Typography>
          <Typography>
            <span className={classes.blurUserName}>
              {format(new Date(blurData.createdAt), 'H:mm', { locale: ruLang })} ·{' '}
            </span>
            <span className={classes.blurUserName}>
              {format(new Date(blurData.createdAt), 'dd MMM. yyyy г.', { locale: ruLang })}
            </span>
          </Typography>
          <div className={classNames(classes.blurFooter, classes.fullBlurFooter)}>
            <IconButton>
              <CommentIcon style={{ fontSize: 25 }} />
            </IconButton>
            <IconButton>
              <RepostIcon style={{ fontSize: 25 }} />
            </IconButton>
            <IconButton>
              <LikeIcon style={{ fontSize: 25 }} />
            </IconButton>
            <IconButton>
              <ShareIcon style={{ fontSize: 25 }} />
            </IconButton>
          </div>
        </Paper>
        <Divider />
        {/* <Blur
          _id="1"
          text="Any more to move? You might need to adjust your stretching routines!"
          createdAt={new Date().toString()}
          user={{
            fullname: 'Arlene Andrews',
            username: 'ArleneAndrews_1',
          }}
          classes={classes}
        />
        <Blur
          _id="1"
          text="Any more to move? You might need to adjust your stretching routines!"
          createdAt={new Date().toString()}
          user={{
            fullname: 'Arlene Andrews',
            username: 'ArleneAndrews_1',
          }}
          classes={classes}
        />
        <Blur
          _id="1"
          text="Any more to move? You might need to adjust your stretching routines!"
          createdAt={new Date().toString()}
          user={{
            fullname: 'Arlene Andrews',
            username: 'ArleneAndrews_1',
          }}
          classes={classes}
        /> */}
      </>
    );
  }

  return null;
};
