import React from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Divider from '@material-ui/core/Divider/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import List from '@material-ui/core/List/List';
import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useHomeStyles } from '../pages/theme';
import { useSelector } from 'react-redux';
import { selectUsersItems } from '../store/ducks/users/selectors';
import { useState } from 'react'
import { usersApi } from '../services/api/userApi'

export const Users = () => {

  const classes = useHomeStyles();
  const items = useSelector(selectUsersItems);
  const [users, setTopUsers] = useState<any[]>([])

  let mounted = false

  React.useEffect((): any => {
    mounted = true
    usersApi.getTopusers().then(data => {
      if(mounted) {
        setTopUsers(data.data)
      }
    })
    return () => mounted = false;
  }, [])

  return (
    <Paper className={classes.rightSideBlock}>
      <Paper className={classes.rightSideBlockHeader} variant="outlined">
                <b>Кого подивитись {users.length}</b>
              </Paper>
              <List>
                {
                  users.map(el => {
                    return (
                      <ListItem className={classes.rightSideBlockItem}>
                      <ListItemAvatar>
                        <Avatar
                          alt='image'
                          src="https://jarvis.net.ua/persons/orig/5161375159818c0c37fd1f1693445faedcce.jpg"
                        />
                      </ListItemAvatar>
                      <a href={`/user/${el._id}`}>
                        <ListItemText
                          primary={el.username}
                          secondary={
                            <Typography component="span" variant="body2" color="textSecondary">
                              @{el.username}
                            </Typography>
                          }
                        />
                      </a>
                      <Button color="primary">
                        <PersonAddIcon />
                      </Button>
                      </ListItem>
                    )
                  })
                }

                <Divider component="li" />
              </List>
      <List>
        {/* {
          items.map(obj => (
            <ListItem className={classes.rightSideBlockItem}>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://jarvis.net.ua/persons/orig/5161375159818c0c37fd1f1693445faedcce.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Dock Of Shame"
                secondary={
                  <Typography component="span" variant="body2" color="textSecondary">
                    @FavDockOfShame
                  </Typography>
                }
              />
              <Button color="primary">
                <PersonAddIcon />
              </Button>
            </ListItem>
          ))
        } */}
        <Divider component="li" />
      </List>
    </Paper>
  )
}
