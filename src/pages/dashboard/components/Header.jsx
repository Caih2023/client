import { Link } from "react-router-dom";
import Logo from "../../../assets/logo2.png";
import DropdownUser from "./DropdownUser";

const Header = (props) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-boxdark drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className=" flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="text-black w-9 z-99999 block rounded-sm border p-1.5 shadow-sm border-strokedark bg-boxdark lg:hidden"
          >
            <span className="du-block">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-[0] duration-200 ease-in-out bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-150 duration-200 ease-in-out bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-200 duration-200 ease-in-out bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="flex items-center text-black gap-3 2xsm:gap-7 ml-auto">
          {/* <!-- User Area --> */}
          {/* <DropdownUser /> */}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
