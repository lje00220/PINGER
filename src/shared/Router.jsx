import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { PATH } from '../constants/RouterPathConstants';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import JobListPage from '../pages/JobListPage';
import JobDetail from '../pages/JobDetail';
import MyPage from '../pages/MyPage';
import ResumeListPage from '../pages/ResumeListPage';
import ResumeCreate from '../pages/ResumeCreate';
import ResumeDetail from '../pages/ResumeDetail';
import Header from '../components/layout/Header';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGNUP} element={<Signup />} />
        <Route path={PATH.JOB_LIST} element={<JobListPage />} />
        <Route path={PATH.JOB_DETAIL} element={<JobDetail />} />
        <Route path={PATH.MY_PAGE} element={<MyPage />} />
        <Route path={PATH.RESUME_LIST} element={<ResumeListPage />} />
        <Route path={`${PATH.RESUME_DETAIL}/:id`} element={<ResumeDetail />} />
        <Route path={PATH.RESUME_CREATE} element={<ResumeCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
