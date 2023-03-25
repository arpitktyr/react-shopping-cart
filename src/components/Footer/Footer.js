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
      <p style={footerStyle}>
        {" "}
        Copyright © 2012 The Grocery Company. Call us on +91 9900000011
      </p>
    </footer>
  );
};
export default Footer;
