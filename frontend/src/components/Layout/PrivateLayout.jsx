import { Outlet } from 'react-router-dom';
import { PrivateHeader } from '../Header';
import { Navbar } from '../Navbar';
import { ButtonScrollToTop } from '../Buttons';

function PrivateLayout() {
  return (
    <div className="PrivateLayout">
      <PrivateHeader />
      <Navbar />

      <Outlet />

      <ButtonScrollToTop />
    </div>
  );
}

export default PrivateLayout;
