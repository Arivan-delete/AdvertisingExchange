import React from 'react';
import LAIcon from '@material-ui/icons/LocalActivityTwoTone';
import SearchIcon from '@material-ui/icons/Search';
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MessageIcon from '@material-ui/icons/EmailOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import UserIcon from '@material-ui/icons/PermIdentityOutlined';
import CreateIcon from '@material-ui/icons/Create';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useHomeStyles } from '../pages/theme';
import { ModalBlock } from './ModalBlock';
import { AddBlurForm } from './AddBlurForm';
import { Link } from 'react-router-dom';
import { UserSideProfile } from './UserSideProfile';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/ducks/user/selectors';

interface SideMenuProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  classes,
}: SideMenuProps): React.ReactElement => {
  const [visibleAddBlur, setSetVisibleAddBlur] = React.useState<boolean>(false);
  const userData = useSelector(selectUserData);

  const handleClickOpenAddBlur = () => {
    setSetVisibleAddBlur(true);
  };

  const onCloseAddBlur = () => {
    setSetVisibleAddBlur(false);
  };

  return (
    <>
      <ul className={classes.sideMenuList}>
        <li className={classes.sideMenuListItem}>
          <Link to="/home">
            <IconButton className={classes.logo} aria-label="" color="primary">
              <LAIcon className={classes.logoIcon} />
            </IconButton>
          </Link>
        </li>
        <li className={classes.sideMenuListItem}>
          <Link to="/home">
            <div>
              <HomeIcon className={classes.sideMenuListItemIcon} />
              <Hidden smDown>
                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                  Головна
                </Typography>
              </Hidden>
            </div>
          </Link>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <SearchIcon className={classes.sideMenuListItemIcon} />
            <Hidden smDown>
              <Typography className={classes.sideMenuListItemLabel} variant="h6">
                Пошук
              </Typography>
            </Hidden>
          </div>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <NotificationIcon className={classes.sideMenuListItemIcon} />
            <Hidden smDown>
              <Typography className={classes.sideMenuListItemLabel} variant="h6">
                Запити
              </Typography>
            </Hidden>
          </div>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <MessageIcon className={classes.sideMenuListItemIcon} />

            <Hidden smDown>
              <Typography className={classes.sideMenuListItemLabel} variant="h6">
                Повідомлення
              </Typography>
            </Hidden>
          </div>
        </li>
        
        <li className={classes.sideMenuListItem}>
          <Link to={`/user/${userData.user?._id}`}>
            <div>
              <UserIcon className={classes.sideMenuListItemIcon} />

              <Hidden smDown>
                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                  Профіль
                </Typography>
              </Hidden>
            </div>
          </Link>
        </li>
        <li className={classes.sideMenuListItem}>
          <Button
            onClick={handleClickOpenAddBlur}
            className={classes.sideMenuBlurButton}
            variant="contained"
            color="primary"
            fullWidth>
            <Hidden smDown>Створити</Hidden>
            <Hidden mdUp>
              <CreateIcon />
            </Hidden>
          </Button>
          <ModalBlock onClose={onCloseAddBlur} visible={visibleAddBlur}>
            <div style={{ width: 550 }}>
              <AddBlurForm maxRows={15} classes={classes} />
            </div>
          </ModalBlock>
        </li>
      </ul>
      <UserSideProfile classes={classes} />
    </>
  );
};
