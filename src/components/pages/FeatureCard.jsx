// src/components/FeatureCard.js
import React from "react";

const FeatureCard = ({ icon: Icon, title, children }) => {
  return (
    <div className="feature-card">
      <div className="icon-wrapper">
        <Icon className="icon" />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{children}</p>
    </div>
  );
};

export default FeatureCard;
