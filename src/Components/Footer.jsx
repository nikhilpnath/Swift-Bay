import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="Footer-background">
       

       <div className="icons">
        <p><span className="bi bi-twitter-x"></span></p>
        <p><span className="bi bi-linkedin"></span></p>
        <p><span className="bi bi-whatsapp"></span></p>
        <p><span className="bi bi-facebook"></span></p>
       </div>

       <div className="links">
     <p>Home</p>
    <p>About Us</p>
    <p>FeedBack</p>
    <p>Privacy & Policy</p>
    <p>Contact</p>
       </div>


       <p className="footer-rights"> ©2024 - SwiftBay | All Rights Reserved</p>

      </div>
    </React.Fragment>
  );
};

export default Footer;
