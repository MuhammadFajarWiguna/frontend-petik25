import React from "react";

const Card = ({ children }) => {
  return (
    <div
      style={{ border: "1px solid gray", padding: "16px", borderRadius: "8px" }}
    >
        <h2>Ini Judul dari Komponen Card</h2>
      {children}
    </div>
  );
};

export default Card;
