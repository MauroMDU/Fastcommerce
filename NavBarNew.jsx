import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import { setUser, setPhoto } from '../redux/actions/auth.js';
import { api, apiUrl, endpoints } from '../utils/api';
import Swal from 'sweetalert2';
import { LS } from '../utils/localStorageUtils.js';
import productsActions from '../redux/actions/products.js';

const NavBar = () => {
  let [userMenuOpen, setUserMenuOpen] = useState(false);
  let [search, setSearch] = useState('');
  let [searchedProducts, setSearchedProducts] = useState([]);
  let dispatch = useDispatch();
  let navigate = useNavigate()
  let token = JSON.parse(localStorage.getItem("token"));
  let user = JSON.parse(localStorage.getItem("user"));
  //console.log(user)

  let products = useSelector((store) => store.products.products)
  console.log(products)

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return token && user;
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const signout = async () => {
    localStorage.clear()
    navigate("/")
  };

  let getSearchedProducts = async () => {
    dispatch(productsActions.searched_products({search}))
    navigate('/products/search-results')
  }
  
  return (
    <>
      <nav className="flex bg-[rgb(42,51,66)] items-center justify-around h-[9vh]">
        {/* Logo */}
        <Anchor to="/" className="flex items-center justify-center">
          <img src="/src/assets/images/logo1.png" alt="Ecommerce Logo" className="h-[7vh]" />
        </Anchor>

        {/* Search Bar */}
        <div className="flex relative w-[60vw]">
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search your product" className="w-full px-9 rounded-lg border border-[#ff5757]" />
            <button onClick={getSearchedProducts} className="absolute top-0 right-0 h-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-[#ff5757]" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
        </div>

        {/* Links */}
        <div className="flex items-center pe-8">
          {isLoggedIn() ? null :<Anchor to="/login" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
            Login
          </Anchor>}
          {isLoggedIn() ? null :<Anchor to="/register" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
            Register
          </Anchor>}
        </div>

        {/* User Avatar and Menu */}
        {isLoggedIn() && (
          <div className="relative">
            <img src={user?.photo} alt="User Avatar" className="w-[10vw] md:w-[3vw] hover:border-2 hover:border-white rounded-full cursor-pointer" onClick={handleUserMenuToggle} />
            {userMenuOpen && (
              <div className="absolute w-[25vw] z-20 content-start top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-md p-2">
                <p className="text-start block px-6 py-2 text-gray-800 text-bold">{user?.email}</p>
                <Anchor to="/cart-page" className="text-start block px-6 py-2 text-gray-800 hover:bg-[#ff5757] hover:text-white">
                  Cart
                </Anchor>
                <Anchor to="/dashboard/admin" className="text-start block px-6 py-2 text-gray-800 hover:bg-[#ff5757] hover:text-white">
                  Admin Panel
                </Anchor>
                <Anchor to={`/dashboard/user/:${user._id}`} className="text-start block px-6 py-2 text-gray-800 hover:bg-[#ff5757] hover:text-white">
                  User Panel
                </Anchor>
                <Anchor onClick={signout} className="text-start block px-6 py-2 text-gray-800 hover:bg-[#ff5757] hover:text-white">
                  Log Out
                </Anchor>
              </div>
            )}
          </div>
        )}
      </nav>
      <div className="flex h-[6vh] ps-6 justify-start items-center bg-[#ff5757]">
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/all" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          All
        </Anchor>
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/carpentry" >
          Carpentry
        </Anchor>
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/construction" >
          Construction
        </Anchor>
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/electricity" >
          Electricity
        </Anchor>
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/flooring" >
          Flooring
        </Anchor>
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/furniture" >
          Furniture
        </Anchor>
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/hardware" >
          Hardware
        </Anchor>
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/kitchen&bath" >
          Kitchen&Bath
        </Anchor>
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/painting" >
          Painting
        </Anchor>
        <Anchor className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border" to="/products/tools" >
          Tools
        </Anchor>
      </div>
    </>
  );
};

export default NavBar;

