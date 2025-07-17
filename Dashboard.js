import React, { useState } from 'react'; 
import './Dashboard.css';
import Sidebar from './Sidebar';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


function Dashboard({ onLogout, userRole }) {
  const [menuVisible, setMenuVisible] = useState(false);
  
  const images = ["/carrusel1.png", "/carrusel2.jpg", "/image3.jpeg", "/carrusel4.jpg"];


  return (
    <div className="dashboard">
      <div className="header">
        <button className="menu-toggle" onClick={() => setMenuVisible(!menuVisible)}><FaBars /></button>
        <img src="/logo-csa.png" alt="CSA" className="logo-small" />
        <div className="profile-section">
          <FiUser className="profile-icon" />
          <button className="logout-btn" onClick={onLogout}><FaSignOutAlt /></button>
        </div>
      </div>
      
      <Sidebar visible={menuVisible} />
      
      <div className="content">
        <h2>¡Hola, Usuario01!</h2>
        
      </div>

        <div className="points">
          <div className="card">Puntos ganados <br /> 🏅 1500</div>
          <div className="card">Puntos Canjeados <br /> 0</div>
        </div>

        <Swiper
  effect="coverflow"
  grabCursor={true}
  centeredSlides={true}
  breakpoints={{
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }}
  coverflowEffect={{
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 1500,
    disableOnInteraction: false,
  }}
  modules={[Autoplay, EffectCoverflow, Pagination]}
  className="mySwiper"
>

  {images.map((src, i) => (
    <SwiperSlide key={i}>
      <img src={src} alt={`slide-${i}`} />
    </SwiperSlide>
  ))}
</Swiper>
      
    </div>
  );
}

export default Dashboard;
