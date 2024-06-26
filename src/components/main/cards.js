import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import Add1 from '../main_adds/add1';

import './cards.css';

function Cards() {

  const navigate = useNavigate();


  const [room, setRoom] = useState([]);
  const [main_data,setdata]=useState({});
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch('http://localhost:5000/main_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Response from server:', jsonResponse);
        setdata(jsonResponse);
      } else {
        console.error('Server error:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  function route(a,b)
  {
    navigate('/sub_main', { state: { category: `${a}`, brand: b } });
  }
  return (
    <div>

{Object.keys(main_data).map((roomData, index) => (
    <div id="container">
      <h2>{roomData}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        loop={true}
        spaceBetween={50}
        slidesPerView={4}
        slidesPerGroup={4}
        navigation
        pagination={{ clickable: true }}
      >
        {main_data[roomData].map((card) => (
          <SwiperSlide key={card.id}>
            <div id="card">
              <div id="img_cont">
                <img src={`${process.env.PUBLIC_URL}/${roomData}/${card.img}`} className='img' alt={card.name} onClick={(e)=>route(roomData,card.id)} />
              </div>
              <div id="card_det">
                <p>{card.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      ))}
      <Add1 />
    </div>
  );
}

export default Cards;
