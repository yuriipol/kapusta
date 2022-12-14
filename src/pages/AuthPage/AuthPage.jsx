import { useDispatch } from 'react-redux';

import AuthForm from '../../components/AuthForm/AuthForm';
import { logInUser } from '../../redux/auth/auth-operations';
import s from './AuthPage.module.scss';

const AuthPage = () => {
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(logInUser(data));
  };
  return (
    <>
      <div className={s.section}>
        <div className={s.wrapper}>
          <div className={s.titleGroup}>
            <h1 className={s.title}>
              Kapu<span className={s.titleSpan}>$</span>ta
            </h1>
            <p className={s.titleText}>Smart Finance</p>
          </div>
        </div>
        <div className={s.helper}></div>

        <AuthForm onSubmit={onSubmit} />
      </div>
    </>
  );
};
export default AuthPage;
