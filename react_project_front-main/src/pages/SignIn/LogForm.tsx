import React from 'react';
import { makeStyles, Typography, Button, TextField } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { useForm } from "react-hook-form";
import { AuthApi } from '../../services/api/authApi';
import { ToastContainer, toast } from 'material-react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignIn } from '../../store/ducks/user/actionCreators';

export const useStylesSignIn = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
  },
  blueSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#660066 ',
    flex: '0 0 48%',
    overflow: 'hidden',
    position: 'relative',
  },
  blueSideBigIcon: {
    position: 'absolute',
    left: '50%',
    top: '53%',
    transform: 'translate(-50%, -50%)',
    width: '400%',
    height: '400%',
  },
  blueSideListInfo: {
    position: 'relative',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: 380,
    '& h6': {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      fontWeight: 700,
      fontSize: 20,
    },
  },
  blueSideListInfoItem: {
    marginBottom: 40,
  },
  blueSideListInfoIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  loginSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 50%',
  },
  loginSideLAIcon: {
    fontSize: 85,
  },
  loginSideWrapper: {
    width: 380,
  },
  loginSideTitle: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 60,
    marginTop: 20,
  },
  loginSideField: {
    marginBottom: 18,
  },
  registerField: {
    marginBottom: theme.spacing(5),
  },
  loginFormControl: {
    marginBottom: theme.spacing(2),
  },
}));

export const LoginForm: React.FC = (): React.ReactElement => {

  const dispatch = useDispatch();

  const classes = useStylesSignIn();
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data: any) => {
    dispatch(fetchSignIn(data))
  };

  return (
    <div>
        <ToastContainer/>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.loginFormControl}>
             <FormGroup aria-label="position" row>
                  <TextField
                    {...register("emailField", { required: true})}
                    className={classes.registerField}
                    error={errors.emailField}
                    helperText={errors.emailField && <span>Обов'язкове поле</span>}
                    autoFocus
                    id="email"
                    label="E-Mail"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    {...register("passwordField", { required: true })}
                    className={classes.registerField}
                    error={errors.passwordField}
                    helperText={errors.passwordField && <span>Обов'язкове поле</span>}
                    autoFocus
                    id="password"
                    label="Пароль"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    type="password"
                    fullWidth
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                      Увійти
                  </Button>
            </FormGroup>
        </form>
    </div>
  )
};