import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
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
import useAuthStore from '../zustand/useAuthStore';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { AUTHENTICATED_MESSAGES } from '../constants/toastMessages';

//로그인 필요
const PravitePage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error(AUTHENTICATED_MESSAGES.PRAVITE);
    }
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} replace />;
};

//로그인 필요 X
const PublicPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      toast.error(AUTHENTICATED_MESSAGES.PUBLIC);
    }
  }, []);

  return isAuthenticated ? <Navigate to={PATH.HOME} replace /> : <Outlet />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={PATH.HOME} element={<Home />} />
        {/* 로그인이 필요없는 페이지 : 로그인, 회원가입 */}
        <Route element={<PublicPage />}>
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.SIGNUP} element={<Signup />} />
        </Route>
        {/* 로그인이 필요한 페이지 : 마이페이지, 채용정보 리스트, 채용정보 디테일, 자소서 리스트, 자소서 디테일, 자소서 생성 */}
        <Route element={<PravitePage />}>
          <Route path={PATH.MY_PAGE} element={<MyPage />} />
          <Route path={PATH.JOB_LIST} element={<JobListPage />} />
          <Route path={`${PATH.JOB_DETAIL}/:id`} element={<JobDetail />} />
          <Route path={PATH.RESUME_LIST} element={<ResumeListPage />} />
          <Route
            path={`${PATH.RESUME_DETAIL}/:id`}
            element={<ResumeDetail />}
          />
          <Route
            path={`${PATH.RESUME_CREATE}/:id`}
            element={<ResumeCreate />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
