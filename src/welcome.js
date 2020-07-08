import React, { useEffect } from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";

const Welcome = ({ time, setTime }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pushData = async () => {
    let now = new Date().getTime();
    setTime({ ...time, start: now });
    /*await fetch(
      `http://${stateFirst.ipAddress}:4000/timing/add?user=${stateFirst.user}`
    ).catch((err) => console.error(err));*/
  };

  return (
    <div className="welcome">
      <Container fluid>
        <p
          style={{
            marginTop: 10 + "em",
            marginBottom: 10 + "em",
            textAlign: "justify",
          }}
        >
          Welcome to the study of sharing digital devices, like smartphones.
          Here, you will interact with a system that allows users to control
          access to apps while sharing a smartphone with others. We will be
          guiding you throughout the study and provide explanations and feedback
          whenever needed. While some explanations are embedded in the
          interface, feel free to ask for further explanations and assistance
          anytime you need.
        </p>
        <p className="para" style={{ textAlign: "center", color: "red" }}>
          **Please DO NOT refresh or close the browser until the “You can now
          close your browser” message is shown at the end**
        </p>
        <div className="text-center">
          <Link to="/sharing">
            <Button
              color="primary"
              style={{
                marginTop: 2 + "em",
                marginBottom: 10 + "em",
              }}
              onClick={pushData}
            >
              Start
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Welcome;
