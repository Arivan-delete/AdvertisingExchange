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
import { fetchSignUp } from '../../../store/ducks/user/actionCreators';
import { selectUserStatus } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import ReactDatePicker from 'react-datepicker';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export interface RegisterFormProps {
  fullname?: string;
  username: string;
  email: string;
  password: string;
  password2?: string;
}

export interface RegisterProps {
  emailField: string;
  usernameField: string;
  passwordField: string;
}

const RegisterFormSchema = yup.object().shape({
  fullname: yup.string().required('Введіть своє ім`я'),
  email: yup.string().email('Неправильна пошта').required('Введіть пошту'),
  username: yup.string().required('Введіть логін'),
  password: yup.string().min(6, '​Мінімальна довжина пароля 6 символів').required(),
  password2: yup.string().oneOf([yup.ref('password')], 'Паролі не існують'),
});




export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
}): React.ReactElement => {
  const classes = useStylesSignIn();
  const dispatch = useDispatch();

  const openNotificationRef = React.useRef<(text: string, type: Color) => void>(() => {});
  const loadingStatus = useSelector(selectUserStatus);

  const { control, handleSubmit, formState: { errors }, } = useForm<RegisterFormProps>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: RegisterFormProps) => {
    dispatch(fetchSignUp(data));
  };

  React.useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      openNotificationRef.current('Реєстрація пройшла успішно!', 'success');
      onClose();
    } else if (loadingStatus === LoadingStatus.ERROR) {
      openNotificationRef.current('Помилка при реєстрації!', 'error');
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
          />
              )}
            />
                      
            
             {/* <Controller
              as={TextField}
              control={control}
              name="email"
              className={classes.registerField}
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
            />  */}
            <Controller
              control={control}
              name="username"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <ReactDatePicker
            onChange={onChange}
            onBlur={onBlur}
                />
              )}
            />
            <Controller
              control={control}
              name="fullname"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <ReactDatePicker
            onChange={onChange}
            onBlur={onBlur}
                />
              )}
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
                />
              )}
            /> 
            <Controller
              control={control}
              name="password2"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <ReactDatePicker
            onChange={onChange}
            onBlur={onBlur}
                />
              )}
            /> 
            {/* <Controller
              as={TextField}
              control={control}
              name="username"
              className={classes.registerField}
              id="username"
              label="Логин"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="text"
              defaultValue=""
              helperText={errors.username?.message}
              error={!!errors.username}
              fullWidth
            />
            <Controller
              as={TextField}
              control={control}
              name="fullname"
              className={classes.registerField}
              id="fullname"
              label="Ваше имя"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="text"
              defaultValue=""
              helperText={errors.fullname?.message}
              error={!!errors.fullname}
              fullWidth
            />
            <Controller
              as={TextField}
              control={control}
              name="password"
              className={classes.registerField}
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
            />
            <Controller
              as={TextField}
              control={control}
              name="password2"
              className={classes.registerField}
              id="password2"
              label="Пароль"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="password"
              defaultValue=""
              helperText={errors.password2?.message}
              error={!!errors.password2}
              fullWidth
            /> */}
            <Button
              disabled={loadingStatus === LoadingStatus.LOADING}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth>
              Реєстрація
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </ModalBlock>
  );
};
