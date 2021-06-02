import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import './index.css';
import 'material-react-toastify/dist/ReactToastify.css';

import App from './App';
import theme from './theme';
import { store } from './store/store';
import ReduxToastr from 'react-redux-toastr'

// TODO:
// 1. настроить саги
// 2. добавить чат, уведомление, рейтинг, и статус поста
// 3. Сделать получение информации о пользователе (простой объект. имитация авторизации)
// 4. Попытаться сделать поиск и просмотро актуального из БД
// 5. Сделать linkify для поста и <br /> при переходе на новую строчку
// 6. Поправить открытие меню для постов (происходит переходи в пост, которого не должно быть)


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Provider store={store}>
        <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        // getState={(state: any):any => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick/>
        <App />
      </Provider>
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
