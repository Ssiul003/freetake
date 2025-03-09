import React from "react";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import appreciateDonation from "../images/appreciatedonationhero3.png";
import areYouHungry from "../images/areyouhundryhero1.png";
import grabSomeFood from "../images/grabsomefreefoodhero4.png";
import Donate from "../pages/Donate.js";
const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, 
  };

  return (
    <div className="home-page">
    <div className="home-container">
      <div className="slider-box">
        <Slider {...sliderSettings}>
          <div className="slide">
            <img src={appreciateDonation} alt="appreciateDonation"/>
            <Link to="/donate" className="donate-link">
              <p>Donate now</p>
            </Link>       
          </div>
          <div className="slide">
            <img src={areYouHungry}  alt="areYouHungry"/>
            <Link to="/donate" className="donate-link">
              <p>Donate now</p>
            </Link>     
          </div>
          <div className="slide">
          <img src={grabSomeFood}  alt="grabSomeFood"/>
          <Link to="/donate" className="donate-link">
              <p>Donate now</p>
            </Link>     
          </div>
        </Slider>
      </div>
      
      <div className="text-image-section">
        <div className="content-box left">
          <img
            src="https://media.istockphoto.com/id/1680302937/photo/donation-food-in-cans-in-box-and-hands-of-man-checking-stock-decision-and-volunteer-with-ngo.jpg?s=2048x2048&w=is&k=20&c=lQXMq-5m-mQyMaeWv_96Dmyn-oe5hdt-Srd-k_giLIo="
            alt="Food Donation Drive"
          />
          <p>
            We believe in reducing food waste and helping those in need.
            Join our mission to make a difference.
          </p>
        </div>
        <div className="content-box right">
          <p>
            Every donation helps us provide essential food supplies
            to communities in need. Learn more here!
          </p>
          <img
            src="https://media.istockphoto.com/id/1680302937/photo/donation-food-in-cans-in-box-and-hands-of-man-checking-stock-decision-and-volunteer-with-ngo.jpg?s=2048x2048&w=is&k=20&c=lQXMq-5m-mQyMaeWv_96Dmyn-oe5hdt-Srd-k_giLIo="
            alt="Helping Hands"
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;