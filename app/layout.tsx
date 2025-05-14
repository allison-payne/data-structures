import { Outlet } from 'react-router';
import Header from './components/header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center pt-16 pb-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
