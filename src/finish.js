import React from "react";
import "./App.css";

const Finish = () => {
  return (
    <div className="welcome">
      <p
        style={{
          marginTop: 10 + "em",
          marginBottom: 10 + "em",
          textAlign: "center",
        }}
      >
        Thank you! Your responses have been successfully recorded. You can now
        close your browser.
      </p>
    </div>
  );
};

export default Finish;
