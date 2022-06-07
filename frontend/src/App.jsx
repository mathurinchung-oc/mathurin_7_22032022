import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers, getOneUser } from './store/actions/user.actions';
import { getAllPosts } from './store/actions/post.actions';
import { Router } from './Routes';

function App() {
  const dispatch = useDispatch();
  const { success, payload } = JSON.parse(localStorage.getItem("auth") || "{}") || false;

  useEffect(() => {
    if (success) {
      const { userId } = payload;
      dispatch(getOneUser(userId));
      dispatch(getAllUsers());
      dispatch(getAllPosts());
    }
  }, [ success, dispatch, payload ]);

  return (
    <Router />
  );
}

export default App;
