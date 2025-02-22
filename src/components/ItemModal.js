import React, { useState } from "react";

const ItemModal = ({ item, onClose, onPlaceBid }) => {
  const [bidAmount, setBidAmount] = useState("");

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handlePlaceBid = () => {
    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue) || bidValue <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    onPlaceBid(item._id, bidValue);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        
        <h1>{item.name}</h1>
        <img src={`http://localhost:5000/uploads/${item.imagePath}`} alt={item.name} className="item-image" />
        
        <h3>{item.description}</h3>
        <h4>Starting Price: <span>₹{item.startingPrice}</span></h4>
        <h4>End Date: {new Date(item.endDate).toLocaleDateString("en-GB")}</h4>
        <h4>Highest Bid: ₹{item.highestBid || "No bids yet"}</h4>
        <h4>Highest Bidder: {item.highestBidder || "No bidder yet"}</h4>

        {!item.itemSold && (
          <div className="bid-section">
            <input 
              type="number" 
              value={bidAmount} 
              onChange={handleBidChange} 
              placeholder="Enter bid amount"
              className="bid-input"
            />
            <button className="bid-button" onClick={handlePlaceBid}>
              Place Bid
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemModal;
