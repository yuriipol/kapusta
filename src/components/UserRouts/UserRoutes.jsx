import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useState } from 'react';
import PrivateRoute from './PrivateRoute';

const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const ReportsPage = lazy(() => import('pages/ReportsPage/ReportsPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

const UserRoutes = () => {
  const [startDate, setStartDate] = useState(new Date());

  // const dateValue = startDate

  return (
    <Suspense fallback={<h3>Loading page...</h3>}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/home"
            element={
              <HomePage startDate={startDate} setStartDate={setStartDate} />
            }
          />
          <Route path="/reports" element={<ReportsPage startDate={startDate} />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
