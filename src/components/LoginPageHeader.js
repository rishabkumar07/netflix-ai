import { Logo } from "../utils/constants";
const LoginPageHeader = () => {
  return (
    <div className="absolute px-24 py-4 z-10">
      <img className="w-44" src= {Logo} alt="Netflix Logo"/>
    </div>
  )
}

export default LoginPageHeader;