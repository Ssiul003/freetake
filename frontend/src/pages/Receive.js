import React, { useState, useEffect } from "react";


const Receive = () => {
  const [donatedItems, setDonatedItems] = useState([]);

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

  const individualItems = donatedItems.filter(item => item.donorType === "Individual");
  const restaurantItems = donatedItems.filter(item => item.donorType === "Local Restaurant");

  return (
    <div className="receive-page">
      <h1 className="page-title">Available Food Donations</h1>

      {/* Individual Donations */}
      <div className="donation-category">
        <h2>Individual Donations</h2>
        {individualItems.length > 0 ? (
          <div className="food-grid">
            {individualItems.map((item) => (
              <div key={item.id} className="food-item">
                <div className="image-container">
                  <img src={item.image} alt={item.name} />
                  <div className="overlay">
                    <h4>{item.name}</h4>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Cuisine:</strong> {item.cuisine}</p>
                    <p><strong>Pickup Time:</strong> {item.pickupTime}</p>
                    <p><strong>Phone:</strong> {item.phone}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Date:</strong> {item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No individual donations available at this time.</p>
        )}
      </div>

      {/* Restaurant Donations */}
      <div className="donation-category">
        <h2>Restaurant Donations</h2>
        {restaurantItems.length > 0 ? (
          <div className="food-grid">
            {restaurantItems.map((item) => (
              <div key={item.id} className="food-item">
                <div className="image-container">
                  <img src={item.image} alt={item.name} />
                  <div className="overlay">
                    <h4>{item.name}</h4>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Cuisine:</strong> {item.cuisine}</p>
                    <p><strong>Pickup Time:</strong> {item.pickupTime}</p>
                    <p><strong>Phone:</strong> {item.phone}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Date:</strong> {item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No restaurant donations available at this time.</p>
        )}
      </div>
    </div>
  );
};

export default Receive;
