import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/layout/Header';
import { PATH } from '../constants/routerPath';
import Home from '../pages/Home';
import JobDetail from '../pages/JobDetail';
import JobListPage from '../pages/JobListPage';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import ResumeCreate from '../pages/ResumeCreate';
import ResumeDetail from '../pages/ResumeDetail';
import ResumeListPage from '../pages/ResumeListPage';
import Signup from '../pages/Signup';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGNUP} element={<Signup />} />
        <Route path={PATH.JOB_LIST} element={<JobListPage />} />
        <Route path={`${PATH.JOB_DETAIL}/:id`} element={<JobDetail />} />
        <Route path={PATH.MY_PAGE} element={<MyPage />} />
        <Route path={PATH.RESUME_LIST} element={<ResumeListPage />} />
        <Route path={`${PATH.RESUME_DETAIL}/:id`} element={<ResumeDetail />} />
        <Route path={PATH.RESUME_CREATE} element={<ResumeCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
