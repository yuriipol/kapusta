import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logInGoogle } from '../../redux/auth/auth-operations';
import Header from '../../components/Header/Header';
import Balance from 'components/Balance/Balance';
import Calendar from 'components/Calendar/Calendar';
import Accordion from 'components/Accordion/Accordion';
import Product from 'components/Product/Product';
import Modal from 'components/Modal/Modal';
import TableForMobile from '../../components/Table/TableForMobile';

import useResizeScreen from 'shared/hooks/useResizeScreen';

import Chart from '../../shared/images/HomePage/chart.svg';
import s from './HomePage.module.scss';

const HomePage = ({ startDate, setStartDate }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const mediaSize = useResizeScreen();
  const { isMobile } = mediaSize;

  useEffect(() => {
    if (token) {
      dispatch(logInGoogle({ email, token }));
    }
  }, [token, email, dispatch]);

  const onClickToggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  if (isMobile) {
    return (
      <>
        <Header />
        <div className={s.background}>
          <div className="container">
            <div className={s.wrapper}>
              <Link to="/reports" className={s.text}>
                Reports
              </Link>
              <img className={s.chart} src={Chart} alt="Chart" />
            </div>
            <Balance />
            <Calendar startDate={startDate} setStartDate={setStartDate} />
          </div>
        </div>
        <TableForMobile />
        <div className={s.btn}>
          <button
            className={s.button}
            type="button"
            onClick={onClickToggleModal}
          >
            Expenses
          </button>
          <button
            className={s.button}
            type="button"
            onClick={onClickToggleModal}
          >
            Income
          </button>
        </div>
        {isOpenModal && (
          <Modal close={onClickToggleModal}>
            <Product />
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={s.background}>
        <div className={s.HomeContainer}>
          <Balance />
          <div className={s.wrapper}>
            <Link to="/reports" className={s.text}>
              Reports
            </Link>
            <img className={s.chart} src={Chart} alt="Chart" />
          </div>
        </div>
        <Accordion startDate={startDate} setStartDate={setStartDate} />
      </div>
      <div className={s.kapusta}></div>
    </>
  );
};

export default HomePage;
