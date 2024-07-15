import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import Swal from 'sweetalert2';
import photoURL from '../assets/home/girl.jpg';
import { AuthContext } from '../utilities/providers/AuthProviders';

const navLinks = [
  { name: 'Home', route: '/' },
  { name: 'Create-Form', route: '/createform' },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#00ff00',
    },
  },
});

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState('bg-[#15151580]');
  
  const { logout, user } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
  };

  useEffect(() => {
    const darkClass = 'dark';
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === '/');
    setIsLogin(location.pathname === '/login');
    setIsFixed(location.pathname === '/register' || location.pathname === '/login');
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavBg('bg-white backdrop-filter blackdrop-blur-xl bg-opacity-0 dark:text-white text-black');
      } else {
        setNavBg('bg-white dark:bg-black dark:text-white text-black');
      }
    } else {
      setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'} dark:text-white text-white`);
    }
  }, [scrollPosition]);

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!',
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              title: 'Logged Out!',
              text: 'Your have been logged out!',
              icon: 'success',
            });
          })
          .catch((err) => {
            Swal.fire('Error!', err.message, 'error');
          });
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      
    >
      <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6  bg-yellow-100 text-black dark:text-white'>
        <div className='px-4 py-4 flex items-center justify-between'>
          {/* hamburger Menu Icon */}
          <div className='md:hidden flex items-center text-black darK:text-white'>
            <button type='button' onClick={toggleMobileMenu} className='text-gray-300 hover:text-white  focus:outline-none style={{ order: -1 }}'>
              <FaBars className='h-6  w-6 hover:text-primary' />
            </button>
          </div>
          {/* Logo and Brand Name */}
          <div onClick={() => navigate('/')} className='flex-shrink-0 cursor-pointer pl-2 md:p-0 flex items-center'>
            <div className='footer-img flex gap-2 items-center'>
              <div>
                <h1 className='text-2xl inline-flex gap-3 items-center font-bold'>Form Wizard </h1>
                <p className='font-bold text-[13px] tracking-[3px]'>Forms at the speed of thought</p>
              </div>
            </div>
          </div>

          

          {/* Navigation Links */}
          <div className='hidden md:block text-black dark:text-white'>
            <div className='flex'>
              <ul className='ml-10 flex items-center space-x-4 pr-4'>
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      style={{ whiteSpace: 'nowrap' }}
                      className={({ isActive }) =>
                        `font-bold ${isActive ? 'text-secondary' : navBg.includes('bg-transparent') ? 'text-black dark:text-white' : 'text-black  dark:text-white'} hover:text-secondary duration-30`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}

                {/* Login/Register Links */}
                {user ? null : isLogin ? (
                  <li>
                    <NavLink
                      to='/register'
                      className={({ isActive }) =>
                        `font-bold ${isActive ? 'text-secondary' : navBg.includes('bg-transparent') ? 'text-black' : 'text-black dark:text-white'} hover:text-secondary duration-30`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to='/login'
                      className={({ isActive }) =>
                        `font-bold ${isActive ? 'text-secondary' : navBg.includes('bg-transparent') ? 'text-black' : 'text-black dark:text-white'} hover:text-secondary duration-30`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                )}

                {/* Dashboard and User Links */}
                {user && (
                  <>
                    <li>
                      <NavLink
                        to='/dashboard'
                        className={({ isActive }) =>
                          `font-bold ${isActive ? 'text-secondary' : navBg.includes('bg-transparent') ? 'text-black dark:text-white' : 'text-black dark:text-white'} hover:text-secondary duration-30`
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <img src={photoURL} alt='' className='h-[40px] rounded-full w-[40px]' />
                    </li>
                    <li>
                      <NavLink onClick={handleLogout} className='font-bold px-3 py-2 bg-secondary text-white rounded-x1'>
                        Logout
                      </NavLink>
                    </li>
                  </>
                )}

                
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white dark:bg-black backdrop-blur-2xl fixed top-0 left-0 w-[33.33%] h-[80.33%] z-50'>
          <ul className='pt-20 text-center'>
            {navLinks.map((link) => (
              <li key={link.route} className='mb-6'>
                <NavLink
                  to={link.route}
                  onClick={toggleMobileMenu}
                  className={`font-bold ${location.pathname === link.route ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-30`}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {!user && (
              <>
                <li className='mb-6'>
                  <NavLink to='/register' onClick={toggleMobileMenu} className='font-bold text-black dark:text-white hover:text-secondary duration-30'>
                    Register
                  </NavLink>
                </li>
                <li className='mb-6'>
                  <NavLink to='/login' onClick={toggleMobileMenu} className='font-bold text-black dark:text-white hover:text-secondary duration-30'>
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li className='mb-6'>
                  <NavLink to='/dashboard' onClick={toggleMobileMenu} className='font-bold text-black dark:text-white hover:text-secondary duration-30'>
                    Dashboard
                  </NavLink>
                </li>
                <li className='mb-6'>
                  <NavLink onClick={(e) => { handleLogout(e); toggleMobileMenu(); }} className='font-bold px-3 py-2 bg-secondary text-white rounded-x1'>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <ThemeProvider theme={theme}>
                <div className='flex flex-col justify-center items-center'>
                  <Switch onChange={() => { setIsDarkMode(!isDarkMode); toggleMobileMenu(); }} />
                  <h1 className='text-[8px]'>Light/Dark</h1>
                </div>
              </ThemeProvider>
            </li>
          </ul>
        </div>
      )}
    </motion.nav>
  );
};

export default NavBar;

