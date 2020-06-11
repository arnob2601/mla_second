import React, {useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle, Button, Label } from "reactstrap";

const address = [
  "/family",
  "/friend",
  "/colleague",
  "/acquaintance",
  "/stranger",
  "/pass",
];
let next = "";
let pressed = "false";

const AppPicker = ({
  state,
  setState,
  app,
  setApp,
  stateFirst,
  setStateFirst,
  ...props
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  if (stateFirst.isFamily) next = address[0];
  else if (stateFirst.isFriend) next = address[1];
  else if (stateFirst.isColleague) next = address[2];
  else if (stateFirst.isAcquaintance) next = address[3];
  else if (stateFirst.isStranger) next = address[4];

  const item = Object.keys(state).map((key) => app[key]);

  const handleName = (e) => {
    setStateFirst({ ...stateFirst, name: e.target.value });
  };

  const addApp = () => {
    if (stateFirst.name.length > 0) {
      const id = app.length + 1;
      const src = require("./Images/Demo.png");
      const title = stateFirst.name;
      const newApp = { id, src, title };
      setApp([...app, newApp]);
      setStateFirst({ ...stateFirst, name: "" });
      pressed = true;
    }
  };

  const iconCards = app.map((icon) => {
    return (
      <Col
        key={icon.id}
        style={{ marginBottom: 0.5 + "em", marginTop: 0.5 + "em" }}
      >
        <Card>
          <Label>
            <input
              type="checkbox"
              id={icon.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setState({
                    ...state,
                    [icon.id]: icon,
                  });
                } else {
                  const nextState = state;
                  delete nextState[icon.id];
                  setState({
                    ...nextState,
                  });
                }
              }}
              checked={Boolean(state[icon.id])}
            />
            <CardImg src={icon.src} alt={icon.title} />
            <CardTitle className="text-center" style={{ fontSize: "12px" }}>
              {icon.title}
            </CardTitle>
          </Label>
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <Container fluid>
        <p
          style={{
            marginTop: 3 + "em",
            marginBottom: 3 + "em",
            textAlign: "justify",
          }}
        >
          Please select the apps that you use on your phone. By using the ‘Add
          App’ feature at the bottom of the page, please add those apps that you
          use on your phone, but not listed in here. Remember to{" "}
          <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
            select
          </span>{" "}
          a new app after you add it. <br />
          <br />
          Only the apps that you select in this page will be in effect for the
          rest of the study. So, please select all of the apps that you use in
          real life.
        </p>
        <Row xs="6">{iconCards}</Row>
        <div style={{ marginTop: 2 + "em" }}>
          <input
            style={{ width: 250 }}
            type="text"
            onChange={handleName}
            value={stateFirst.name}
            placeholder="Type app name here to add.."
          />
          <button
            style={{ background: "#007bff", color: "white" }}
            onClick={addApp}
          >
            Add App
          </button>
          {pressed === true && (
            <p style={{ marginTop: 1 + "em" }}>
              Remember to{" "}
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                select
              </span>{" "}
              the new app after you add it, to have it in effect for the rest of
              the study.
            </p>
          )}
        </div>
      </Container>

      <div
        style={{ marginTop: 3 + "em", marginBottom: 3 + "em" }}
        className="text-center"
      >
        <Link to="/sharing">
          <Button style={{ marginRight: 8 + "em" }} color="primary">
            Back
          </Button>
        </Link>

        <Link to={next}>
          <Button
            disabled={item.length === 0}
            style={{ marginLeft: 8 + "em" }}
            color="primary"
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AppPicker;
