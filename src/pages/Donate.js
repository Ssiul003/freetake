import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Donate.css";

const Donate = () => {
  const [showModal, setShowModal] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", location: "" });
  const [foodImage, setFoodImage] = useState(null);
  const [donatedItems, setDonatedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 

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
    
    if (selectedItem) {
      const updatedItems = donatedItems.map(item =>
        item.id === selectedItem.id ? { ...item, ...newFoodItem } : item
      );
      setDonatedItems(updatedItems);
      setSelectedItem(null); 
    } else {
      setDonatedItems((prevItems) => [...prevItems, newFoodItem]);
    }
    
    setShowModal(false);
    setFoodName("");
    setUserDetails({ name: "", phone: "", location: "" });
    setFoodImage(null);
  };

  const handleDelete = (id) => {
    const updatedItems = donatedItems.filter(item => item.id !== id);
    setDonatedItems(updatedItems);
  };


  const handleEdit = (item) => {
    setSelectedItem(item);
    setFoodName(item.name);
    setUserDetails({ name: item.donor, phone: item.phone, location: item.location });
    setFoodImage(item.image);
    setShowModal(true);
  };

  return (
    <div className="donate-page">
      <div className="page-content">
        <button className="donate-button" onClick={() => setShowModal(true)}>
          {selectedItem ? "Edit Food Donation" : "Donate Food"}
        </button>

        <p>Current Listings:</p>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <label>Food Name:</label>
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
                
                <label>Your Name:</label>
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleChange}
                  required
                />
                
                <label>Phone Number:</label>
                <input
                  type="tel"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleChange}
                  required
                />
                
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={userDetails.location}
                  onChange={handleChange}
                />
                
                <label>Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
                
                <div className="modal-buttons">
                  <button type="submit">{selectedItem ? "Update Food Donation" : "Submit Food Donation"}</button>
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {donatedItems.length > 0 && (
          <div className="food-grid">
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
                  <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>X</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
