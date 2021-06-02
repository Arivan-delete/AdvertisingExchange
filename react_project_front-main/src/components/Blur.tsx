import React from 'react';
import classNames from 'classnames';
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepostIcon from '@material-ui/icons/RepeatOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/ReplyOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Avatar, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core';
import { useHomeStyles } from '../pages/theme';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { ImageList } from './ImageList';
import { removeBlur } from '../store/ducks/blurs/actionCreators';
import { useDispatch } from 'react-redux';
import { User } from '../store/ducks/user/contracts/state';

interface BlurProps {
  _id: string;
  text: string;
  classes: ReturnType<typeof useHomeStyles>;
  createdAt: string;
  images?: string[];
  user: Pick<User, '_id' | 'fullname' | 'username'>;
}

export const Blur: React.FC<BlurProps> = ({
  _id,
  text,
  user,
  classes,
  images,
  createdAt,
}: BlurProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClickBlur = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    history.push(`/home/blur/${_id}`);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
    handleClose(event);
    if (window.confirm('Ви дійсно хочете видалити допис?')) {
      dispatch(removeBlur(_id));
    }
  };

  return (
    <a onClick={handleClickBlur} className={classes.blurWrapper} href={`/home/blur/${_id}`}>
      <Paper className={classNames(classes.blur, classes.blursHeader)} variant="outlined">
        <Avatar className={classes.blurAvatar} alt={`Аватарка користувача ${user.fullname}`} />
        <div className={classes.blurContent}>
          <div className={classes.blurHeader}>
              <div>
                <b>{user.fullname}</b>&nbsp;
                <span className={classes.blurUserName}>@{user.username}</span>&nbsp;
                <span className={classes.blurUserName}>·</span>&nbsp;
                <span className={classes.blurUserName}>{formatDate(new Date(createdAt))}</span>
              </div>
            <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Редагувати</MenuItem>
                <MenuItem onClick={handleRemove}>Видалити допис</MenuItem>
              </Menu>
            </div>
          </div>
          <Typography variant="body1" gutterBottom>
            {text}
            {images && <ImageList classes={classes} images={images} />}
          </Typography>
          <div className={classes.blurFooter}>
            <div>
              <IconButton>
                <CommentIcon style={{ fontSize: 20 }} />
              </IconButton>
              <span>1</span>
            </div>
            <div>
              <IconButton>
                <RepostIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
            <div>
              <IconButton>
                <LikeIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
            <div>
              <IconButton>
                <ShareIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
    </a>
  );
};
