import React from "react";
import Slider from "react-slick";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/* images/text needs to be changed*/
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
    <div className="home-container">
      <div className="slider-box">
        <Slider {...sliderSettings}>
          <div className="slide">
            <img
              src="https://media.istockphoto.com/id/1680302937/photo/donation-food-in-cans-in-box-and-hands-of-man-checking-stock-decision-and-volunteer-with-ngo.jpg?s=2048x2048&w=is&k=20&c=lQXMq-5m-mQyMaeWv_96Dmyn-oe5hdt-Srd-k_giLIo="
              alt="Food Donation"
            />
            <p> Text</p>
          </div>
          <div className="slide">
            <img
              src="https://media.istockphoto.com/id/1680302937/photo/donation-food-in-cans-in-box-and-hands-of-man-checking-stock-decision-and-volunteer-with-ngo.jpg?s=2048x2048&w=is&k=20&c=lQXMq-5m-mQyMaeWv_96Dmyn-oe5hdt-Srd-k_giLIo="
              alt="Food Waste"
            />
            <p>Text.</p>
          </div>
          <div className="slide">
            <img
              src="https://media.istockphoto.com/id/1680302937/photo/donation-food-in-cans-in-box-and-hands-of-man-checking-stock-decision-and-volunteer-with-ngo.jpg?s=2048x2048&w=is&k=20&c=lQXMq-5m-mQyMaeWv_96Dmyn-oe5hdt-Srd-k_giLIo="
              alt="Reduce Hunger"
            />
            <p>Text</p>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Home;
