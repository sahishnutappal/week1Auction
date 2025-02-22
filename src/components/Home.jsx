import React from "react";
import { Link } from "react-router-dom"; // Import for navigation
import { FaArrowRight } from "react-icons/fa";
import J from "../imgs/j.png";

export default function Home() {
  return (
    <div className="home_cont">
      <div className="home_txt">
        <h1>Elevate your auction experience like never before.</h1>
        <h3>BID. WIN. ENJOY!</h3>

        <div className="btns_cont">
          <Link to="/bid" className="explore-btn">
            Explore
          </Link>
          <p>Go to Bidding Arena!</p>
          <FaArrowRight className="arrow" />
        </div>
      </div>

      <div className="home_img">
        <img src={J} alt="Auction Experience" />
      </div>
    </div>
  );
}
