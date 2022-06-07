import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, AuthRoute } from '.';
import { Home, Profile, Users, Login, Signup, NotFound } from '../pages';
import { EditPost } from '../components/Post';

function Router() {
  return (
    <Routes>
      <Route element={ <PrivateRoute /> }>
        <Route path="/" element={ <Home /> } />

        <Route path="users" element={ <Users /> } />
        <Route path="profile/:userId" element={ <Profile /> } />

        <Route path='compose' element={ <EditPost /> } />

        <Route path="*" element={ <NotFound /> } />
      </Route>

      <Route element={ <AuthRoute /> }>
        <Route path="login" element={ <Login /> } />
        <Route path="signup" element={ <Signup /> } />
      </Route>
    </Routes>
  );
}

export default Router;
