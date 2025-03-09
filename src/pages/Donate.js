import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Donate.css";

const Donate = () => {
  const [showForm, setShowForm] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", location: "" });
  const [foodImage, setFoodImage] = useState(null);
  const [donatedItems, setDonatedItems] = useState([]);

  const donationCenters = [
    { id: 1, name: "name", address: "address1" },
    { id: 2, name: "name", address: "address2" },
    { id: 3, name: "name", address: "address3" },
  ];

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFoodImage(URL.createObjectURL(file)); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName || !userDetails.name || !userDetails.phone || !userDetails.location || !foodImage) {
      alert("Please fill in all fields.");
      return;
    }

    const newFoodItem = {
      id: donatedItems.length + 1,
      name: foodName,
      donor: userDetails.name,
      phone: userDetails.phone,
      location: userDetails.location,
      image: foodImage,
    };

    setDonatedItems([...donatedItems, newFoodItem]);
    setShowForm(false);
    setFoodName("");
    setUserDetails({ name: "", phone: "", location: "" });
    setFoodImage(null);
  };


  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true, 
    focusOnSelect: true, 
  };
  


  return (
    <div className="donate-page">
    <div className="page-content">
      <h2>Donate Food</h2>
      <p>Help others by donating food items!</p>

  
      <button onClick={() => setShowForm(true)}>Donate Food</button>

      {showForm && (
        <div className="donation-form">
          <h3>Donate Food Item</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Food Name:</label>
              <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
            </div>

            <div>
              <label>Your Name:</label>
              <input type="text" name="name" value={userDetails.name} onChange={handleChange} required />
            </div>

            <div>
              <label>Phone Number:</label>
              <input type="tel" name="phone" value={userDetails.phone} onChange={handleChange} required />
            </div>

            <div>
              <label>Select Donation Center:</label>
              <select name="location" value={userDetails.location} onChange={handleChange} required>
                <option value="">-- Select a Location --</option>
                {donationCenters.map((center) => (
                  <option key={center.id} value={`${center.name}, ${center.address}`}>
                    {center.name} - {center.address}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} required />
            </div>

            <button type="submit">Submit Food Donation</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {donatedItems.length > 0 && (
        <div className="food-slider">
          <h3>Available Donated Food</h3>
          <Slider {...sliderSettings}>
            {donatedItems.map((item) => (
              <div key={item.id} className="food-item">
                <div className="image-container">
                  <img src={item.image} alt={item.name} />
                  <div className="overlay">
                    <h4>{item.name}</h4>
                    <p><strong>Donor:</strong> {item.donor}</p>
                    <p><strong>Phone:</strong> {item.phone}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  </div>
  );
};

export default Donate;
