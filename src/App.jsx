import { ToastContainer } from 'react-toastify';
import Router from './shared/Router';
import { Bounce } from 'react-toastify';
import useAuthListener from './hooks/useAuthListener';

function App() {
  useAuthListener();
  return (
    <>
      <Router />
      <ToastContainer
        className="mt-[70px]"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
