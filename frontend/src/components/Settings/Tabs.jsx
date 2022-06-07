import { useState } from 'react';
import { TabUser, TabAuth, TabDanger } from '.';

function Tabs() {
  const [ tabUser, setTabUser ] = useState(true)
  const [ tabAuth, setTabAuth ] = useState(false)
  const [ tabDanger, setTabDanger ] = useState(false)

  const handleToggleTab = e => {
    if (e.target.id === "edit-profile") {
      setTabUser(true);
      setTabAuth(false);
      setTabDanger(false);
    } else if (e.target.id === "auth") {
      setTabUser(false);
      setTabAuth(true);
      setTabDanger(false);
    } else if (e.target.id === "danger") {
      setTabUser(false);
      setTabAuth(false);
      setTabDanger(true);
    }
  };

  return (
    <>
    <nav className="ToggleNav">
      <ul className="ToggleList">
        <li id="edit-profile" className={"ToggleItem" + (tabUser ? " active" : "")} onClick={ handleToggleTab }>Profile</li>
        <li id="auth" className={"ToggleItem" + (tabAuth ? " active" : "")} onClick={ handleToggleTab }>Password</li>
        <li id="danger" className={"ToggleItem" + (tabDanger ? " active" : "")} onClick={ handleToggleTab }>Danger</li>
      </ul>
    </nav>

    { tabUser && <TabUser /> }
    { tabAuth && <TabAuth /> }
    { tabDanger && <TabDanger /> }
    </>
  );
}

export default Tabs;
