import React, { useState } from 'react';
import '../pages-styles/Contact.css'

// only missing access key

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

    return(
      <div className='contact'>
        <form onSubmit={onSubmit}>
          <h1>Let's Chat!</h1>
          <div className='input-section'>
            <label>Name</label>
            <input type='text' name='name' className='name' placeholder='John Doe'></input>
          </div>
          <div className='input-section'>
            <label>Email</label>
            <input type='email' name='email' className='email' placeholder='YourEmail@Example.com' required></input>
          </div>
          <div className='text-area'>
            <label>Message</label>
            <textarea name="message" className='message' placeholder='Type your message here'></textarea>
          </div>
          <button className='submit-btn' type='submit'>Submit</button>
        </form>
      </div>
    )
  };
  
  export default Contact;
