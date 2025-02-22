import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ loggedInUser, setLoggedInUser }) {
  return (
    <React.Fragment>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
