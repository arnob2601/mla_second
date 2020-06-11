import React, {useEffect} from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";

const Welcome = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
