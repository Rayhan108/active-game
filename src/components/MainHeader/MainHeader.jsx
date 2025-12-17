import logo from '../../assets/logo.png'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';





const MainHeader = ({ toggleSidebar }) => {
  return (
    <header className="h-20 bg-[#0d0d1a] border-b border-gray-800 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="logo"
          className="w-auto h-auto max-w-[100px] object-contain"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xl text-white font-poppins ">Cole Salle</span>
        <Link to={'/profile'}>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center overflow-hidden">
          <img
            src={avatar}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        </Link>
        {/* <ChevronDown className="w-4 h-4 text-gray-400" /> */}
      </div>
    </header>
  );
};

export default MainHeader;
