import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setPhoto } from '../redux/actions/auth.js';
import { api, apiUrl, endpoints } from '../utils/api';
import Swal from 'sweetalert2';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import { LS } from '../utils/localStorageUtils.js';

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const photo = useSelector((state) => state.auth.photo);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  let token = LS.get('token')

  const isLoggedIn = () => {
    return token && user;
  };

  const signout = async () => {
    try {
      await api.post(apiUrl + endpoints.logout, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logout successful!',
        showConfirmButton: false,
        timer: 1500,
      });

      LS.remove('token');
      dispatch(setUser(null));
      dispatch(setPhoto(null));

      setDisplay(false);
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to sign out!',
        timer: 1500,
      });
    }
  };

    const fetchUserData = async () => {
      try {
        const response = await api.get(apiUrl + endpoints.login, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response)
        const { user, photo } = response.data.response;

        dispatch(setUser(user));
        dispatch(setPhoto(photo));
      } catch (error) {
        console.log(error);
      }
    };
  

  useEffect(() => {

    if (!user) fetchUserData();
  }, []);

  return (
    <nav className="w-full text-white absolute flex flex-col items-center bg-orange-400 justify-around">
      <div className="flex w-[90%] justify-between items-center p-6">
        <img src="/Menu.svg" onClick={() => setDisplay(!display)} alt="Menu" />
        {display && (
          <div className="drawer sm:flex text-start min-w-[300px] sm:min-w-[410px] h-[100vh] flex-col sm:items-start gap-[147px] p-6 bg-purple-600 fixed top-0 left-0 shadow-2xl">
            <div className="flex h-[525px] flex-col items-center sm:items-start gap-8 self-stretch">
              {isLoggedIn() ? (
                <div className="flex flex-row items-center text-center lg:justify-between sm:w-[400px] w-full">
                  <img src={photo} className="w-[35px] sm:w-[50px] mb-2 sm:m-0 rounded-full" alt="User" />
                  <div className="flex flex-col ms-3">
                    <p className="text-[14px] sm:text-[16px]">{user.email}</p>
                  </div>
                  <img src="/filled.png" onClick={() => setDisplay(!display)} className="block ms-[20%] w-[24px] h-[24px]" alt="Close" />
                </div>
              ) : (
                <div className="w-11/12 flex justify-end items-center" onClick={() => setDisplay(!display)}>
                  <svg className="w-12 p-1 text-white border-white border-2 hover:bg-purple-600 rounded-lg" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}

              <div className="lg:text-lg flex flex-col">
                <Anchor to={'/'} className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">Home</Anchor>
                {isLoggedIn() ? null : (<Anchor to={'/login'} className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">Log In</Anchor>)}
                {isLoggedIn() ? null : (<Anchor to={'/register'} className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">Register</Anchor>)}
                {isLoggedIn() ? (<Anchor to={"/cart-page"} className="p-3 hover:bg-white hover:text-purple-600 rounded-md w-[300px]">{" "}Cart{" "}</Anchor>) : null}
                {isLoggedIn() ? (<Anchor to={'/mangas'} className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">Mangas</Anchor>) : null}
                {isLoggedIn() ? (<Anchor className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">My Comics</Anchor>) : null}
                {isLoggedIn() ? (<Anchor className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">Favorites</Anchor>) : null}
                {isLoggedIn() ? (<Anchor to={'/new-role'} className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">New Role</Anchor>) : null}
                {isLoggedIn() ? (<Anchor to={'/dashboard/admin'} className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">Admin Panel</Anchor>) : null}
                {isLoggedIn() ? (<Anchor to={'/dashboard/user'} className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">User Panel</Anchor>) : null}
                {isLoggedIn() ? (<Anchor onClick={signout} className="p-3 text-lg hover:bg-white hover:text-purple-600 rounded-md w-[300px]">Log Out</Anchor>) : null}
              </div>
            </div>
          </div>
        )}
        <img src="/LogoFastCommerce.png" className="hidden md:block w-[110px] h-[110px] shrink-0" alt="Logo" />
        <img src="/LogoFastCommerce.png" className="md:hidden w-[35px] h-[35px] shrink-0" alt="Logo" />
      </div>
    </nav>
  );
}

export default NavBar;
