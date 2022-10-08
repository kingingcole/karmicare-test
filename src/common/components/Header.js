import React from "react";

const Header = () => {
  return (
    <header style={styles.wrapper}>
      <h3 style={styles.text}>URL Shortener</h3>
    </header>
  );
};

const styles = {
  wrapper: {
    backgroundColor: "#00baba",
    color: "white",
    justifyContent: "center",
    fontSize: 20,
    height: 70,
    display: "flex",
    alignItems: "center",
  },
  text: {
    margin: 0,
    padding: 0,
  },
};

export default Header;
