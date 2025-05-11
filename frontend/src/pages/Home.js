import React, { useEffect, useState } from "react";
import { Link, resolvePath } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../pages-styles/Home.css';
import appreciateDonation from "../images/appreciatedonationhero3.png";
import areYouHungry from "../images/areyouhundryhero1.png";
import grabSomeFood from "../images/grabsomefreefoodhero4.png";
import howMuchFoodWasted from "../images/howmuchfoodwasted.jpg";
import whyFoodIsWasted from "../images/whyfoodiswasted.jpg";
import logo from '../images/logo.svg'
import leaf1 from "../images/leaf1.png";
import leaf2 from "../images/leaf2.png";
import leaf3 from "../images/leaf3.png";
import leaf4 from "../images/leaf4.png";
import leaf5 from "../images/leaf5.png";
import leaf6 from "../images/leaf6.png";
import leaf7 from "../images/leaf7.png";
import leaf8 from "../images/leaf8.png";

const leaves = [leaf1, leaf2, leaf3, leaf4, leaf5, leaf6, leaf7, leaf8];

const renderLeaves = () => {
  return Array.from({ length: 10 }).map((_, i) => {
    const leaf = leaves[i % leaves.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 5 + Math.random() * 5;

    return (
      <img
        key={i}
        src={leaf}
        className="falling-leaf"
        alt={`falling leaf ${i}`}
        style={{
          left: `${left}vw`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`
        }}
      />
    )
  })
}

const Home = ( {setLoading} ) => {
  const [leavesLoading, setLeavesLoading] = useState(true);
  const [leavesComponent, setLeavesComponent] = useState([]);

  console.log(leavesLoading);

  useEffect(() => {
    const rendered = renderLeaves();
    setLeavesComponent(rendered);
    setLeavesLoading(false);
    setLoading(false);
  }, []);

  const sliderSettings = {
    dots: true,
    dotsClass: "green-slider-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {
        leavesLoading ? <div className="loading-container"><img className="loading-logo" src={logo} alt="loading" /></div> :
          (
            <div className="home-page">
              {/* Leaf container */}
              <div className="leaf-container" style={{ display: leavesLoading ? 'none' : 'initial' }}>
                {leavesComponent}
              </div>

              <div className="home-container">
                <div className="slider-box">
                  <Slider {...sliderSettings}>
                    <div className="slide">
                      <img src={appreciateDonation} alt="appreciateDonation" />
                    </div>
                    <div className="slide">
                      <img src={areYouHungry} alt="areYouHungry" />
                    </div>
                    <div className="slide">
                      <img src={grabSomeFood} alt="grabSomeFood" />
                    </div>
                  </Slider>
                  <Link to='/receive' className="receive-link">
                    <h2>Get Food</h2>
                  </Link>
                </div>

                <div className='home-content'>
                  <div className="info-box section-one">
                    <img src={howMuchFoodWasted} alt="Image depicts many food goes to waste" />
                    <div className="section-text">
                      <h1>How Much Food Is Wasted In The U.S.?</h1>
                      <br />
                      <h3>
                        "While the world wastes about 2.5 billion tons of food every year, the United States discards more food than
                        any other country in the world: nearly 60 million tons - 120 billion pound - every year." - rts
                      </h3>
                      <br />
                      <a href="https://www.rts.com/resources/guides/food-waste-america/">Read More</a>
                    </div>
                  </div>
                  <div className="info-box section-two">
                    <div className="section-text">
                      <h1>Why Is So Much Food Wasted?</h1>
                      <br />
                      <h3>
                        "More than 80 percent of Americans discard perfectly good, consumable food simply because they misunderstand
                        expiration labels. Labels like "sell by", "use by", "expires on", "best before", or "best by" are confusing to
                        people - and in an effort to not risk the potential of a foodbourne illness, they'll toss it in the garbage." - rts
                      </h3>
                      <br />
                      <a href="https://www.rts.com/resources/guides/food-waste-america/">Read More</a>
                    </div>
                    <img src={whyFoodIsWasted} alt="Image depicts many food goes to waste" />
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </>
  );
};

export default Home;
