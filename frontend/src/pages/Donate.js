import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../pages-styles/Donate.css";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Donate = () => {
  const [showModal, setShowModal] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [isIndividual, setIsIndividual] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [userDetails, setUserDetails] = useState({ phone: "", location: "" });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodName || !quantity || !cuisine || !pickupTime || !userDetails.phone || !userDetails.location || !foodImage || (!isIndividual && !isRestaurant)) {
      alert("Please fill in all fields.");
      return;
    }

    const donorType = isIndividual ? "Individual" : isRestaurant ? "Local Restaurant" : "Unknown";
    const donationDate = new Date().toISOString();
    const imageUrl = foodImage;
    const options = { timeStyle: 'short', hour12: true };
    const formattedPickupTime = new Date(`1970-01-01T${pickupTime}:00`).toLocaleTimeString('en-US', options);
    


    const donationData = {
      foodName,
      quantity,
      cuisine,
      pickupTime:formattedPickupTime,
      phone: userDetails.phone,
      location: userDetails.location,
      imageUrl,
      donorType,
      donationDate,
    };

    try {
      const response = await fetch('http://localhost:3000/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) throw new Error("Failed to save donation");

      alert("Donation submitted!");
    } catch (err) {
      console.error(err);
      alert("There was an error submitting the donation.");
    }

    const newFoodItem = {
      id: donatedItems.length + 1,
      name: foodName,
      quantity,
      cuisine,
      pickupTime: formattedPickupTime,
      phone: userDetails.phone,
      location: userDetails.location,
      donorType,
      image: foodImage,
      date: new Date().toLocaleString(),
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
    setQuantity("");
    setCuisine("");
    setPickupTime("");
    setIsIndividual(false);
    setIsRestaurant(false);
    setUserDetails({ phone: "", location: "" });
    setFoodImage(null);
  };

  const handleDelete = (id) => {
    const updatedItems = donatedItems.filter(item => item.id !== id);
    setDonatedItems(updatedItems);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFoodName(item.name);
    setQuantity(item.quantity);
    setCuisine(item.cuisine);
    setPickupTime(item.pickupTime);
    setIsIndividual(item.donorType === "Individual");
    setIsRestaurant(item.donorType === "Local Restaurant");
    setUserDetails({ phone: item.phone, location: item.location });
    setFoodImage(item.image);
    setShowModal(true);
  };

  useEffect(() => {
    fetch("http://localhost:3000/donate")
      .then((res) => res.json())
      .then((data) => {
        const items = data.map((item) => ({
          id: item.id,
          name: item.foodName,
          quantity: item.quantity,
          cuisine: item.cuisine,
          pickupTime: item.pickupTime,
          phone: item.phone,
          location: item.location,
          donorType: item.donorType,
          image: item.imageUrl,
          date: new Date(item.donationDate).toLocaleString(),
        }));
        setDonatedItems(items);
      })
      .catch((err) => {
        console.error("Failed to fetch donations:", err);
      });
  }, []);

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
                <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />

                <label>Quantity:</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

                <label>Cuisine:</label>
                <input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} required />

                <label>Pickup Time:</label>
                <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />

                <label>Phone Number:</label>
                <input type="tel" name="phone" value={userDetails.phone} onChange={handleChange} required />

                <label>Location:</label>
                <input type="text" name="location" value={userDetails.location} onChange={handleChange} required />

                <label>Donor:</label>
                <div className="donor-type-options">
                  <label className="donor-label">
                    Individual
                    <input type="radio" name="donortype" checked={isIndividual} onChange={() => {
                      setIsIndividual(true);
                      setIsRestaurant(false);
                    }} />
                  </label>
                  <label className="donor-label">
                    Restaurant
                    <input type="radio" name="donortype" checked={isRestaurant} onChange={() => {
                      setIsIndividual(false);
                      setIsRestaurant(true);
                    }} />
                  </label>
                </div>

                <label>Upload Image:</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} required />

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
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Cuisine:</strong> {item.cuisine}</p>
                    <p><strong>Pickup Time:</strong> {item.pickupTime}</p>
                    <p><strong>Donor:</strong> {item.donorType}</p>
                    <p><strong>Phone:</strong> {item.phone}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Date:</strong> {item.date}</p>
                  </div>
                  <button className="edit-button" onClick={() => handleEdit(item)}><FaEdit /></button>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}><MdCancel /></button>
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
