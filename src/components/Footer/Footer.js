import React from "react";
const Footer = () => {
  let footerStyle = {
    color: "#fff",
    textAlign: "center",
    backgroundColor: "rgb(0 0 0 / 73%)",
    margin: "10px 0 0",
    padding: "10px",
    fontWeight: "600",
  };
  return (
    <footer>
      <p style={footerStyle}>Design and developed by Arpit.</p>
    </footer>
  );
};
export default Footer;
