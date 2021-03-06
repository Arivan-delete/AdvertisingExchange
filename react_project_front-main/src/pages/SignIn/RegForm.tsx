import React from 'react';
import { makeStyles, Button, TextField } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import { useForm } from "react-hook-form";
import { AuthApi } from '../../services/api/authApi'
import { ToastContainer, toast } from 'material-react-toastify';
import {toastr} from 'react-redux-toastr'

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

interface Props {
    updateModal: any;
 }

export const RegForm: React.FC<Props> = (props): React.ReactElement => {

  const classes = useStylesSignIn();
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data: any) => {
    const resultReg = await AuthApi.signUp(data)
    if(resultReg._id) {
        props.updateModal()
        toastr.success('', '???? ?????????????? ??????????????????????????????')
    }
    if(resultReg.exist) {
      toastr.error('', '???????????????????? ?????? ??????????')
    }
  };

  return (
    <div>
        <ToastContainer/>
        <form  onSubmit={handleSubmit(onSubmit)} className={classes.loginFormControl}>
            <FormGroup aria-label="position" row>
                    <TextField
                    className={classes.registerField}
                    autoFocus
                    id="name"
                    label="????'??"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={errors.nameField}
                    helperText={errors.nameField && <span>????????'???????????? ????????</span>}
                    {...register("nameField", { required: true })}
                    variant="filled"
                    type="name"
                    fullWidth
                    />
                    <TextField
                    {...register("emailField", { required: true})}
                    className={classes.registerField}
                    error={errors.emailField}
                    helperText={errors.emailField && <span>????????'???????????? ????????</span>}
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
                    helperText={errors.passwordField && <span>????????'???????????? ????????</span>}
                    autoFocus
                    id="password"
                    label="????????????"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    type="password"
                    fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                    ??????????????????????????????
                    </Button>
                </FormGroup>
            </form>
    </div>
  )
};


