import React, { useState } from "react";
import { hot } from "react-hot-loader/root";

import Header from "../components/Header";
import cls from "./App.css";

export function App() {
  const [text, setText] = useState("");
  const [submitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState(
    JSON.parse(localStorage.getItem("shortenedUrls")) || [],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      setError("Please put in a link to shorten!");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const url = "https://api.shrtco.de/v2/shorten?url=" + text;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          const allShortenedUrls = [...shortenedUrls, res.result];
          setShortenedUrls(allShortenedUrls);
          localStorage.setItem("shortenedUrls", JSON.stringify(allShortenedUrls));
          setText("");
          return;
        }

        setError(res.error);
      });

    setIsSubmitting(false);
  };

  const getBtnStyle = () => {
    let style = styles.submitBtn;
    if (submitting) {
      style = {
        ...style,
        backgroundColor: "#c3c3c3",
      };
    }

    return style;
  };

  const onClickLinkItem = (value) => {
    navigator?.clipboard?.writeText(value).then(() => {
      alert("Copied to clipboard.");
    });
  };

  return (
    <div className={cls.body}>
      <Header />
      <div style={styles.mainWrapper}>
        <form onSubmit={handleSubmit}>
          <label htmlFor={"urlInput"}>Insert a URL to shorten</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            id={"urlInput"}
            style={styles.input}
            type="text"
            placeholder="https://example.org"
          />
          {error && <p style={styles.error}>{error}</p>}
          <input disabled={submitting} style={getBtnStyle()} type="submit" value="Shorten!" />
        </form>

        <br />

        {shortenedUrls.length > 0 ? (
          <div>
            <h4>Your shortened URLs (click to copy shortened url)</h4>
            <div>
              {shortenedUrls.map((url, index) => {
                return (
                  <div
                    style={styles.linkItem}
                    key={index}
                    onClick={() => onClickLinkItem(url.short_link)}
                  >
                    <strong>{url.original_link}</strong>
                    <p style={{ margin: "5px 0" }}>{url.short_link}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h4>Your shortened URLs will be appear here.</h4>
        )}
      </div>
    </div>
  );
}

const styles = {
  mainWrapper: {
    padding: "30px",
    maxWidth: "750px",
    margin: "auto",
    marginTop: "70px",
    backgroundColor: "white",
  },
  input: {
    padding: "15px 10px",
    border: "1px solid black",
    width: "100%",
    marginTop: "9px",
  },
  submitBtn: {
    padding: "9px",
    backgroundColor: "#00baba",
    color: "white",
    border: 0,
    width: "20%",
    marginTop: "9px",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
  linkItem: {
    border: "1px solid black",
    padding: "9px",
    margin: "9px 0",
    cursor: "pointer",
  },
};

export default hot(App);
