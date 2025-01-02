import React, { useState } from "react";
import "../../CSS/About.css";
import mountainImage from "../../Assets/1.jpg"; // Importing the image

const About = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleStarClick = (star) => {
    setRating(star);
  };

  const submitReview = () => {
    setMessage("Thank you for your review!");
  };

  return (
    <div className="about-container">
      {/* Left Box */}
      <div className="about-box">
        <h1 className="section-title">Who We Are</h1>
        <p>
          We are a team of adventure enthusiasts committed to providing
          trekkers, hikers, and outdoor explorers with the best trekking and
          hiking gear. Based in Nepal, the gateway to the Himalayas, we
          understand the challenges of rugged terrains and the need for
          reliable equipment. Our mission is to empower adventurers with
          high-quality, durable, and affordable products, ensuring they are
          prepared for every journey.
        </p>
        <img src={mountainImage} alt="Mountain Adventure" />
      </div>

      {/* Right Box */}
      <div className="about-box">
        <h1 className="section-title">Why Us</h1>
        <p>
          As a locally rooted platform, we bring unmatched expertise in
          trekking and hiking in Nepal's unique terrains. We offer a wide range
          of premium-quality gear at competitive prices, carefully selected to
          meet the highest standards. With a focus on convenience,
          affordability, and a commitment to customer satisfaction, we aim to
          be your trusted partner in every adventure.
        </p>

        {/* Review Box Below */}
        <div className="review-box">
          <h2>Give us a Review</h2>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "selected" : ""}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <button className="submit-review-btn" onClick={submitReview}>
            Submit Review
          </button>
          {message && <p className="review-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default About;
