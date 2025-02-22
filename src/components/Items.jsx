import React, { useEffect, useState } from "react";
import { FaClock, FaHeart, FaSearch } from "react-icons/fa";
import Timer from "./Timer";
import ItemModal from "./ItemModal";

export default function Items() {
  const [items, setItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [itemSold, setItemSold] = useState({});
  const [addedItem, setAddedItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/get-items")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.items);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => console.error(err));
  }, [addedItem]); // Fetch items only when a new item is added

  const handleTimerFinish = (itemId) => {
    setItemSold((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  const handleSearchInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  const filteredItems = searchItem
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
      )
    : items;

  const handleNotificationClose = () => {
    setAddedItem(false);
  };

  const handleItemClick = (item) => {
    console.log("Item clicked:", item.name);
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handlePlaceBid = (itemId, amount) => {
    const bidValue = parseFloat(amount);
    if (isNaN(bidValue) || bidValue <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    fetch(`http://localhost:5000/place-bid/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: bidValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Bid placed successfully");
          alert("Your bid has been placed!");
        } else {
          console.error(data.error);
          alert(data.error);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="items_cont">
      <div className="items_text">
        <h2>Discover Hot Auction Picks</h2>
        <div className="search_bar">
          <input
            type="text"
            placeholder="Search here"
            value={searchItem}
            onChange={handleSearchInputChange}
          />
          <FaSearch />
        </div>
      </div>

      <div className="items_all_cont">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="items_akela_cont"
            onClick={() => handleItemClick(item)}
          >
            <div className="item_imgg">
              <img
                src={`http://localhost:5000/uploads/${item.imagePath}`}
                alt={item.name}
              />
            </div>
            <div className="item_des">
              <div className="samay">
                <p>
                  <FaClock /> Ends on:{" "}
                  {new Date(item.endDate).toLocaleDateString("en-GB")}
                </p>
                <FaHeart />
              </div>
              <hr />
              <div className="asli_info">
                <div className="naam">
                  <h5>{item.name}</h5>
                  <h4>₹ {item.startingPrice}</h4>
                </div>
                <button>Bid Now</button>
              </div>
            </div>
            <Timer
              endDate={item.endDate}
              onTimerFinish={() => handleTimerFinish(item._id)}
              itemSold={itemSold[item._id]}
            />
          </div>
        ))}
        {selectedItem && (
          <ItemModal
            item={selectedItem}
            onClose={handleCloseModal}
            onPlaceBid={handlePlaceBid}
          />
        )}
      </div>

      {addedItem && (
        <div className="notification-container">
          <div className="notification">
            Item Added
            <span className="notification-close" onClick={handleNotificationClose}>
              X
            </span>
          </div>
          <div className="notification-message">
            New item has been added to the auction.
          </div>
        </div>
      )}
    </div>
  );
}
