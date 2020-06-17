import React, { useEffect } from "react";
import {
  Container,
  Row,
  Button,
  Card,
  CardImg,
  CardTitle,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";

const address = [
  "/family",
  "/friend",
  "/colleague",
  "/acquaintance",
  "/stranger",
];
let back = "";

const Summary = ({
  stateFirst,
  setStateFirst,
  family,
  friend,
  colleague,
  acquaintance,
  stranger,
  ...props
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (stateFirst.isStranger) back = address[4];
  else if (stateFirst.isAcquaintance) back = address[3];
  else if (stateFirst.isColleague) back = address[2];
  else if (stateFirst.isFriend) back = address[1];
  else if (stateFirst.isFamily) back = address[0];

  const famApps = Object.keys(family).map((key) => family[key]);
  const familyApps = famApps.map((x, pid) =>
    x.map((icon, idx) => {
      return (
        <Card key={idx}>
          <Label>
            <CardImg src={icon.src} alt={icon.title} draggable="false" />
            <CardTitle className="text-center" style={{ fontSize: "12px" }}>
              {icon.title}
            </CardTitle>
          </Label>
        </Card>
      );
    })
  );

  const familyCards = stateFirst.family.map((rel, idx) => {
    let text = "Family Members";
    if (rel.name !== "") {
      text = rel.name;
    }
    return (
      <div className="box" key={idx} id={"family" + idx}>
        <p className="text-center">{text}</p>
        <Row xs="5">{familyApps[idx]}</Row>
      </div>
    );
  });

  const friApps = Object.keys(friend).map((key) => friend[key]);
  const friendApps = friApps.map((x, pid) =>
    x.map((icon, idx) => {
      return (
        <Card key={idx}>
          <Label>
            <CardImg src={icon.src} alt={icon.title} draggable="false" />
            <CardTitle className="text-center" style={{ fontSize: "12px" }}>
              {icon.title}
            </CardTitle>
          </Label>
        </Card>
      );
    })
  );

  const friendCards = stateFirst.friends.map((rel, idx) => {
    let text = "Friends";
    if (rel.name !== "") {
      text = rel.name;
    }
    return (
      <div className="box" key={idx} id={"friend" + idx}>
        <p className="text-center">{text}</p>
        <Row xs="5">{friendApps[idx]}</Row>
      </div>
    );
  });

  const colApps = Object.keys(colleague).map((key) => colleague[key]);
  const colleagueApps = colApps.map((x, pid) =>
    x.map((icon, idx) => {
      return (
        <Card key={idx}>
          <Label>
            <CardImg src={icon.src} alt={icon.title} draggable="false" />
            <CardTitle className="text-center" style={{ fontSize: "12px" }}>
              {icon.title}
            </CardTitle>
          </Label>
        </Card>
      );
    })
  );

  const colleagueCards = stateFirst.colleague.map((rel, idx) => {
    let text = "Colleagues";
    if (rel.name !== "") {
      text = rel.name;
    }
    return (
      <div className="box" key={idx} id={"colleague" + idx}>
        <p className="text-center">{text}</p>
        <Row xs="5">{colleagueApps[idx]}</Row>
      </div>
    );
  });

  const acqApps = Object.keys(acquaintance).map((key) => acquaintance[key]);
  const acquaintanceApps = acqApps.map((x, pid) =>
    x.map((icon, idx) => {
      return (
        <Card key={idx}>
          <Label>
            <CardImg src={icon.src} alt={icon.title} draggable="false" />
            <CardTitle className="text-center" style={{ fontSize: "12px" }}>
              {icon.title}
            </CardTitle>
          </Label>
        </Card>
      );
    })
  );

  const acquaintanceCards = stateFirst.acquaintance.map((rel, idx) => {
    let text = "Acquaintances";
    if (rel.name !== "") {
      text = rel.name;
    }
    return (
      <div className="box" key={idx} id={"acquaintance" + idx}>
        <p className="text-center">{text}</p>
        <Row xs="5">{acquaintanceApps[idx]}</Row>
      </div>
    );
  });

  const strApps = Object.keys(stranger).map((key) => stranger[key]);
  const strangerApps = strApps.map((x, pid) =>
    x.map((icon, idx) => {
      return (
        <Card key={idx}>
          <Label>
            <CardImg src={icon.src} alt={icon.title} draggable="false" />
            <CardTitle className="text-center" style={{ fontSize: "12px" }}>
              {icon.title}
            </CardTitle>
          </Label>
        </Card>
      );
    })
  );

  const strangerCards = stateFirst.stranger.map((rel, idx) => {
    let text = "Strangers";
    if (rel.name !== "") {
      text = rel.name;
    }
    return (
      <div className="box" key={idx} id={"stranger" + idx}>
        <p className="text-center">{text}</p>
        <Row xs="5">{strangerApps[idx]}</Row>
      </div>
    );
  });

  const handleChoice = (e) => {
    setStateFirst({ ...stateFirst, choice: e.target.value });
  };

  return (
    <div>
      <Container>
        <p
          style={{
            marginTop: 3 + "em",
            textAlign: "justify",
          }}
        >
          Here is an overview of the groups of apps, which you are comfortable
          to share with different entities. Please review your selections before
          moving forward to the next step. If needed, you can go back to a
          previous step and make changes in your selection. In the next step,
          you will assign information sensitivity level to each of the entities
          based on the app that you are sharing with them.
        </p>
        <Row xs="2">
          {stateFirst.isFamily && familyCards}
          {stateFirst.isFriend && friendCards}
          {stateFirst.isColleague && colleagueCards}
          {stateFirst.isAcquaintance && acquaintanceCards}
          {stateFirst.isStranger && strangerCards}
        </Row>
        <p className="para">
          We may have apps and information in our personal phone that we are not
          willing to share with others. Do you have such apps and information in
          your phone that you are not comfortable to share with anyone, in other
          words, only you will have access to them?
        </p>
        <Label>
          <input
            type="radio"
            name="choice"
            value="yes"
            checked={stateFirst.choice === "yes"}
            onChange={handleChoice}
          />{" "}
          Yes
        </Label>
        <br />
        <Label>
          <input
            type="radio"
            name="choice"
            value="no"
            checked={stateFirst.choice === "no"}
            onChange={handleChoice}
          />{" "}
          No
        </Label>
      </Container>
      <div
        style={{ marginTop: 3 + "em", marginBottom: 3 + "em" }}
        className="text-center"
      >
        <Link to={back}>
          <Button style={{ marginRight: 8 + "em" }} color="primary">
            Back
          </Button>
        </Link>

        <Link to="/sensitivity">
          <Button style={{ marginLeft: 8 + "em" }} color="primary">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Summary;
