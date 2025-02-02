import { Logo } from "../utils/constants";
const LoginPageHeader = () => {
  return (
    <div className="flex justify-between items-center bg-gradient-to-b from-black relative w-full px-4 sm:px-8 md:px-16 lg:px-16">
      <img 
        className="w-[10rem] sm:w-[12rem] md:w-[10rem] brightness-100 contrast-150" 
        src= {Logo} 
        alt="Netflix Logo"/>
    </div>
  )
}

export default LoginPageHeader;