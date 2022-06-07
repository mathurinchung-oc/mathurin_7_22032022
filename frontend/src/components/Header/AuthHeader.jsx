import logo from '../../images/icon-left-font-monochrome-black.svg'

function AuthHeader() {
  return (
    <header className="AuthHeader">
      <img className="AuthLogo" src={ logo } alt="logo groupomania" />
    </header>
  );
}

export default AuthHeader;
