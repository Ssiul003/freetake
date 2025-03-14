import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Donate.css";

const Donate = () => {
  const [showModal, setShowModal] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", location: "" });
  const [foodImage, setFoodImage] = useState(null);
  const [donatedItems, setDonatedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const donationCenters = [
    { id: 1, name: "Center 1", address: "Address 1" },
    { id: 2, name: "Center 2", address: "Address 2" },
    { id: 3, name: "Center 3", address: "Address 3" },
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
    
    // Prevent multiple submissions
    if (!foodName || !userDetails.name || !userDetails.phone || !userDetails.location || !foodImage) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Check if this food item already exists before adding to donatedItems
    const newFoodItem = {
      id: donatedItems.length + 1,
      name: foodName,
      donor: userDetails.name,
      phone: userDetails.phone,
      location: userDetails.location,
      image: foodImage,
    };
  
    // Add only if it doesn't already exist
    setDonatedItems((prevItems) => {
      const itemExists = prevItems.some((item) => item.name === newFoodItem.name && item.donor === newFoodItem.donor);
      if (!itemExists) {
        return [...prevItems, newFoodItem];
      }
      return prevItems;
    });
  
    // Reset form and close modal
    setShowModal(false);
    setFoodName("");
    setUserDetails({ name: "", phone: "", location: "" });
    setFoodImage(null);
  };
  

  const handleAcceptDonation = (item) => {
    alert(`You accepted the donation of ${item.name}`);
    setDonatedItems(donatedItems.filter((foodItem) => foodItem.id !== item.id));
  };

  const handleCancelDonation = () => {
    setSelectedItem(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: false,
    focusOnSelect: true,
    adaptiveHeight: false,
  };
  
  
  return (
    <div className="donate-page">
      <div className="page-content">
        <h2>Donate Food</h2>
        <p>Help others by donating food items!</p>

        <button onClick={() => setShowModal(true)}>Donate Food</button>

        {showModal && (
          <div className="model-overlay">
            <div className="model-content">
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

                <div className="model-buttons">
                  <button type="submit">Submit Food Donation</button>
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {donatedItems.length > 0 && (
          <div className="food-slider">
            <h3>Available Donated Food</h3>
            <Slider {...sliderSettings}>
              {donatedItems.map((item) => (
                <div key={item.id} className="food-item" onClick={() => setSelectedItem(item)}>
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

        {selectedItem && (
          <div className="model-overlay">
            <div className="modal-content">
              <h3>Donation Details</h3>
              <p><strong>Food Name:</strong> {selectedItem.name}</p>
              <p><strong>Donor:</strong> {selectedItem.donor}</p>
              <p><strong>Phone:</strong> {selectedItem.phone}</p>
              <p><strong>Location:</strong> {selectedItem.location}</p>
              <div className="modal-buttons">
                <button onClick={() => handleAcceptDonation(selectedItem)}>Accept Donation</button>
                <button onClick={handleCancelDonation}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
