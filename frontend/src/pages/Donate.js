import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import "../pages-styles/Donate.css";

const Donate = () => {
  const [showModal, setShowModal] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [isIndividual, setIsIndividual] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [userDetails, setUserDetails] = useState({ phone: "", address: "" });
  const [foodImage, setFoodImage] = useState(null);
  const [donatedItems, setDonatedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoodImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodName || !quantity || !cuisine || !expirationDate || !pickupTime || !userDetails.phone || !userDetails.address || !foodImage || (!isIndividual && !isRestaurant)) {
      alert("Please fill in all fields.");
      return;
    }

    const donorType = isIndividual ? "Individual" : "Local Restaurant";

    const donationData = {
      name: foodName,
      groupId:1,
      category: cuisine,
      quantity: quantity,
      expiration: expirationDate,
      pickupTime: pickupTime,
      imageUrl: foodImage,
      donorType: donorType,
      phone: userDetails.phone,
      location: userDetails.address, 
    };

    try {
      const url = selectedItem
        ? `http://localhost:3000/donate/${selectedItem.id}`
        : "http://localhost:3000/donate";

      const method = selectedItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) throw new Error("Failed to save donation");

      alert(selectedItem ? "Donation updated!" : "Donation submitted!");

      const newFoodItem = {
        id: selectedItem ? selectedItem.id : donatedItems.length + 1,
        name: foodName,
        quantity,
        cuisine,
        expiration: expirationDate,
        pickupTime,
        phone: userDetails.phone,
        location: userDetails.address, 
        donorType,
        image: foodImage,
        date: new Date().toLocaleString(),
      };

      if (selectedItem) {
        const updatedItems = donatedItems.map((item) =>
          item.id === selectedItem.id ? { ...item, ...newFoodItem } : item
        );
        setDonatedItems(updatedItems);
        setSelectedItem(null);
      } else {
        setDonatedItems((prev) => [...prev, newFoodItem]);
      }

      setShowModal(false);
      setFoodName("");
      setQuantity("");
      setCuisine("");
      setExpirationDate("");
      setPickupTime("");
      setIsIndividual(false);
      setIsRestaurant(false);
      setUserDetails({ phone: "", address: "" }); 
      setFoodImage(null);
    } catch (err) {
      console.error(err);
      alert("There was an error submitting the donation.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/donate/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      const updatedItems = donatedItems.filter((item) => item.id !== id);
      setDonatedItems(updatedItems);
    } catch (err) {
      console.error(err);
      alert("Failed to delete item.");
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFoodName(item.name);
    setQuantity(item.quantity);
    setCuisine(item.cuisine);
    setExpirationDate(item.expiration || "");
    setPickupTime(item.pickupTime);
    setIsIndividual(item.donorType === "Individual");
    setIsRestaurant(item.donorType === "Local Restaurant");
    setUserDetails({ phone: item.phone, address: item.location }); 
    setFoodImage(item.image);
    setShowModal(true);
  };

  useEffect(() => {
    fetch("http://localhost:3000/donate")
      .then((res) => res.json())
      .then((data) => {
        setDonatedItems(data);
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

                <label>Expiration Date:</label>
                <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />

                <label>Pickup Time:</label>
                <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />

                <label>Phone Number:</label>
                <input type="tel" name="phone" value={userDetails.phone} onChange={handleChange} required />

                <label>Address:</label> 
                <input type="text" name="address" value={userDetails.address} onChange={handleChange} required /> 

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
                    <p><strong>Address:</strong> {item.location}</p>
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

