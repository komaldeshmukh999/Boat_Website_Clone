import React, { useState, useEffect, useContext } from 'react';
import "./Header.css";
import { TbSearch } from 'react-icons/tb';
import { MdShoppingCart } from "react-icons/md";
import { AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Search from './Search/Search';
import Cart from '../Cart/Cart';
import { Context } from '../utils/context';
import { IoPersonSharp } from "react-icons/io5";
import Login from '../Authentication/Login';
import ProfilePage from '../Authentication/ProfilePage';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const { cartCount, showCart, setShowCart,login,setLogin,profile,profilePage,setProfilePage} = useContext(Context);



  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className='left'>
            <li onClick={() => { navigate("/") }}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li>Categories</li>
          </ul>
          <div className="center" onClick={() => { navigate("/") }}>Boat</div>
          <div className="right">
            <TbSearch onClick={() => setSearchModal(true)} />
            <AiOutlineHeart />
            <span className='cart-icon' onClick={() => setShowCart(true)}>
              <MdShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
            <IoPersonSharp onClick={()=>{ profile ? setProfilePage(true) : setLogin(true)}}/>
          </div>
        </div>
      </header>
      {searchModal && <Search setSearchModal={setSearchModal} />}
      {showCart && <Cart />}
      {profilePage && <ProfilePage/>}
      {login && <Login/>}
    </>
  );
}
