import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
//import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useStylesSignIn } from '../index';
import { ModalBlock } from '../../../components/ModalBlock';
import { Color } from '@material-ui/lab/Alert';
import { fetchSignIn } from '../../../store/ducks/user/actionCreators';
import { selectUserStatus } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import ReactDatePicker from 'react-datepicker';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

const LoginFormSchema = yup.object().shape({
  email: yup.string().email('Неправильно вказано пошту').required('Введіть пошту'),
  password: yup.string().min(6, '​Мінімальна довжина пароля 6 символів').required(),
});

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }): React.ReactElement => {
  const classes = useStylesSignIn();
  const dispatch = useDispatch();
  const openNotificationRef = React.useRef<(text: string, type: Color) => void>(() => {});
  const loadingStatus = useSelector(selectUserStatus);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormProps>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginFormProps) => {
    dispatch(fetchSignIn(data));
  };

  React.useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      openNotificationRef.current('Авторизація пройшла успішно!', 'success');
      onClose();
    } else if (loadingStatus === LoadingStatus.ERROR) {
      openNotificationRef.current('Неправильний логін або пароль', 'error');
    }
  }, [loadingStatus, onClose]);

  return (
    <ModalBlock visible={open} onClose={onClose} classes={classes} title="Увійти в акаунт">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
          <FormGroup aria-label="position" row>
          <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <ReactDatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                />)}
            />
            <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
              />)}
          />
            {/* <Controller
              as={TextField}
              control={control}
              name="email"
              className={classes.loginSideField}
              id="email"
              label="E-Mail"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="email"
              defaultValue=""
              helperText={errors.email?.message}
              error={!!errors.email}
              fullWidth
              autoFocus
              
            /> */}
            {/* <Controller
              as={TextField}
              control={control}
              name="password"
              className={classes.loginSideField}
              id="password"
              label="Пароль"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="password"
              defaultValue=""
              helperText={errors.password?.message}
              error={!!errors.password}
              fullWidth
            /> */}
            
            <Button
              disabled={loadingStatus === LoadingStatus.LOADING}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth>
              Войти sdfgyhujioihug
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </ModalBlock>
  );
};
