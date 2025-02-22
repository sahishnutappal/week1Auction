import React from "react";
import { FaLaptop, FaLock, FaSearch } from "react-icons/fa";

export default function Features() {
  const featuresData = [
    {
      icon: <FaLaptop className="features_icon" />,
      title: "User-friendly Interface",
      description:
        "Our intuitive interface ensures a seamless and enjoyable auction experience for all users, from beginners to seasoned bidders.",
    },
    {
      icon: <FaLock className="features_icon" />,
      title: "Secure Payment Integration",
      description:
        "Bid with confidence knowing that our platform employs a robust payment system to safeguard your transactions.",
    },
    {
      icon: <FaSearch className="features_icon" />,
      title: "Item Discovery and Search",
      description:
        "Easily find your desired items with our efficient search and filtering tools, enabling effortless exploration of the auction inventory.",
    },
  ];

  return (
    <section className="features_wrapper">
      {featuresData.map((feature, index) => (
        <article key={index} className="features_box">
          {feature.icon}
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      ))}
    </section>
  );
}
