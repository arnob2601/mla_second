import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle, Button, Label } from "reactstrap";
import "./App.css";

const Public = ({ state, setState, stateFirst, setStateFirst, ...props }) => {
  //Mapping from state variable of picked apps
  const icons = Object.keys(state).map((key) => state[key]);

  //Handling function on this page
  const handleShareUserChange = (idx) => (e) => {
    const newShareUsers = stateFirst.shareUsers.map((shareUser, sidx) => {
      if (idx !== sidx) return shareUser;
      return { ...shareUser, name: e.target.value };
    });
    setStateFirst({ ...stateFirst, shareUsers: newShareUsers });
  };

  const handleAddShareUser = () => {
    setStateFirst({
      ...stateFirst,
      shareUsers: stateFirst.shareUsers.concat([{ name: "" }]),
    });
  };

  const handleRemoveShareUser = (idx) => () => {
    setStateFirst({
      ...stateFirst,
      shareUsers: stateFirst.shareUsers.filter((s, sidx) => idx !== sidx),
    });
  };

  const handlePassChange = (e) => {
    setStateFirst({ ...stateFirst, password: e.target.value.slice(0, 4) });
  };

  const handlePassCheckChange = (e) => {
    setStateFirst({ ...stateFirst, checkpass: e.target.value.slice(0, 4) });
  };

  const handlePassword = () => {
    if (stateFirst.password.length > 3)
      alert(
        `Your password is set. Please correctly retype password and check ${
          3 - stateFirst.counter
        } times in the field below to continue.`
      );
    else alert("Your password has to be 4 characters long.");
  };

  const ComparePass = () => {
    if (
      stateFirst.password === stateFirst.checkpass &&
      stateFirst.password.length === 4
    ) {
      setStateFirst({
        ...stateFirst,
        counter: stateFirst.counter + 1,
        checkpass: "",
      });
      if (stateFirst.counter < 2)
      alert(
        `Passwords matched! Please retype and check password ${
          2 - stateFirst.counter
        } more times to continue.`
      );
    else alert(`Your password training is complete. You may continue`);
    } else {
      setStateFirst({ ...stateFirst, counter: 0, checkpass: "" });
      alert(`Passwords did not match! Please try again.`);
    }
  };

  //Rendering fragment of iconcards in checked/unchecked states
  const iconCards = icons.map((icon) => {
    return (
      <Col key={icon.id}>
        <Card>
          <Label>
            <input
              type="checkbox"
              id={icon.id}
              checked={Boolean(stateFirst[icon.id])}
              onChange={(e) => {
                if (e.target.checked) {
                  setStateFirst({
                    ...stateFirst,
                    [icon.id]: icon,
                  });
                } else {
                  const nextState = stateFirst;
                  delete nextState[icon.id];
                  setStateFirst({
                    ...nextState,
                  });
                }
              }}
            />
            <CardImg src={icon.src} alt={icon.title} />
            <CardTitle className="text-center">{icon.title}</CardTitle>
          </Label>
        </Card>
      </Col>
    );
  });

  //main page render
  return (
    <div>
      <Container fluid>
        <h4
          style={{
            marginTop: 1.5 + "em",
            marginBottom: 1.5 + "em",
            textAlign: "center",
            background: "blue",
            color: "white",
            display: "block",
          }}
        >
          First Layer
        </h4>
        <p className="para">
          While sharing digital devices users may want to share different amount
          of information to different people. Here you can create different
          layers of information exposure for different people you share your
          digital device with. You can create as many layers as you like but for
          each layer you will be adding 4 new characters as password with the
          previous one while starting with only 4 characters.
        </p>
      </Container>

      <Container fluid>
        <p className="para">
          Please select the apps that you want to make available in this layer.
        </p>
        <Row xs="5">{iconCards}</Row>
      </Container>

      <Container
        fluid
        style={{
          marginBottom: 3 + "em",
          marginTop: 3 + "em",
        }}
      >
        <p className="para">
          Please type in the name of the relations with whom you will be
          comfortable sharing this layer(Apps selected above). E.g. parents,
          colleauge, siblings, spouse, children, cousins, parents, friends etc.
          You can also be specific while enlisting your relation, whichever
          helps you.
        </p>
        <Row xs="2">
          <Col>
            {stateFirst.shareUsers.map((shareUser, idx) => (
              <div key={idx}>
                <input
                  style={{ width: 250 }}
                  type="text"
                  placeholder="Type user name here.."
                  value={shareUser.name}
                  onChange={handleShareUserChange(idx)}
                />
                <button
                  onClick={handleRemoveShareUser(idx)}
                  style={{ width: 75, background: "red", color: "white" }}
                >
                  Remove
                </button>
              </div>
            ))}
          </Col>
          <Col>
            <button
              style={{ background: "blue", color: "white" }}
              onClick={handleAddShareUser}
            >
              Add more
            </button>
          </Col>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          marginBottom: 0.5 + "em",
          marginTop: 3 + "em",
        }}
      >
        <p className="para">
          Please type in the 4 character password that you want to set for this
          layer. Do keep in mind that for the next layer your password will be
          these 4 characters with additional 4 characters in total 8 characters.
        </p>
        <input
          style={{ width: 250 }}
          type="password"
          placeholder="Type password here.."
          value={stateFirst.password}
          onChange={handlePassChange}
        />
        <button
          onClick={handlePassword}
          style={{ width: 75, background: "green", color: "white" }}
        >
          Set
        </button>
      </Container>

      <Container
        fluid
        style={{
          marginBottom: 0.5 + "em",
          marginTop: 0.5 + "em",
        }}
      >
        <input
          style={{ width: 250 }}
          type="password"
          placeholder="Retype password to check.."
          value={stateFirst.checkpass}
          onChange={handlePassCheckChange}
        />
        <button
          onClick={ComparePass}
          style={{ width: 75, background: "yellow", color: "blue" }}
        >
          Check
        </button>
      </Container>

      <div
        className="text-center"
        style={{
          marginBottom: 3 + "em",
          marginTop: 3 + "em",
        }}
      >
        <Link to="/apppicker">
          <Button color="danger">Back</Button>
        </Link>
        <Link to="/friends">
          <Button color="primary" disabled={stateFirst.counter !== 3}>
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Public;
