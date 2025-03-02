import React from "react";
import "./Popup.css";

const Popup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h3>Invite Your Friends!</h3>
        <p>Click below to share this challenge:</p>

        {/* WhatsApp Share Button */}
        <button onClick={props.shareOnWhatsApp} className="share-button">
          Share on WhatsApp
        </button>

        <button className="close-btn" onClick={() => props.settrigger(false)}>Close</button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
