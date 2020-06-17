import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";

let duplicate;

const Sensitivity = ({
  stateFirst,
  setStateFirst,
  family,
  friend,
  colleague,
  acquaintance,
  stranger,
  sensitivity,
  setSensitivity,
  ...props
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const famApp = Object.keys(family).map((key) => family[key]);
  const friApp = Object.keys(friend).map((key) => friend[key]);
  const colApp = Object.keys(colleague).map((key) => colleague[key]);
  const acqApp = Object.keys(acquaintance).map((key) => acquaintance[key]);
  const strApp = Object.keys(stranger).map((key) => stranger[key]);

  let arrApp = [];
  let arrName = [];
  let arrPassfields = [];
  let check = new Array(5).fill(0).map(() => new Array(5).fill(0));
  if (stateFirst.isFamily) {
    arrApp = [...arrApp, [...famApp]];
    if (stateFirst.family.length === 1 && stateFirst.family[0].name === "")
      arrName = [...arrName, [{ name: "Family Members" }]];
    else arrName = [...arrName, [...stateFirst.family]];
  }
  if (stateFirst.isFriend) {
    arrApp = [...arrApp, [...friApp]];
    if (stateFirst.friends.length === 1 && stateFirst.friends[0].name === "")
      arrName = [...arrName, [{ name: "Friends" }]];
    else arrName = [...arrName, [...stateFirst.friends]];
  }
  if (stateFirst.isColleague) {
    arrApp = [...arrApp, [...colApp]];
    if (
      stateFirst.colleague.length === 1 &&
      stateFirst.colleague[0].name === ""
    )
      arrName = [...arrName, [{ name: "Colleagues" }]];
    else arrName = [...arrName, [...stateFirst.colleague]];
  }
  if (stateFirst.isAcquaintance) {
    arrApp = [...arrApp, [...acqApp]];
    if (
      stateFirst.acquaintance.length === 1 &&
      stateFirst.acquaintance[0].name === ""
    )
      arrName = [...arrName, [{ name: "Acquaintances" }]];
    else arrName = [...arrName, [...stateFirst.acquaintance]];
  }
  if (stateFirst.isStranger) {
    arrApp = [...arrApp, [...strApp]];
    if (stateFirst.stranger.length === 1 && stateFirst.stranger[0].name === "")
      arrName = [...arrName, [{ name: "Strangers" }]];
    else arrName = [...arrName, [...stateFirst.stranger]];
  }
  let temp = [];
  duplicate = false;
  for (let i = 0; i < arrApp.length; i++) {
    for (let j = 0; j < arrApp[i].length; j++) {
      if (check[i][j] === 1) continue;
      check[i][j] = 1;
      //console.log(arrName[i][j].name);
      temp = [...temp, arrName[i][j]];
      for (let k = 0; k < arrApp.length; k++) {
        for (let l = 0; l < arrApp[k].length; l++) {
          if (i === k && j === l) continue;
          if (JSON.stringify(arrApp[i][j]) === JSON.stringify(arrApp[k][l])) {
            check[k][l] = 1;
            duplicate = true;
            //console.log(arrName[k][l].name); //Prints the matching entity names
            temp = [...temp, arrName[k][l]];
          }
        }
      }
      arrPassfields = [...arrPassfields, temp];
      temp = [];
    }
  }
  //console.log(arrPassfields);

  const validity = () => {
    let check = false;
    for (let i = 0; i < arrPassfields.length; i++) {
      if (
        sensitivity[i] === undefined ||
        sensitivity[i] === "Not Selected" ||
        sensitivity[i] > sensitivity["me"]
      ) {
        check = true;
        break;
      }
    }
    if (
      stateFirst.choice === "yes" &&
      (sensitivity["me"] === undefined || sensitivity["me"] === "Not Selected")
    ) {
      check = true;
    }
    return check;
  };

  const getSharee = (rel) => {
    let text = "";
    for (let i = 0; i < rel.length; i++) {
      if (i === 0) text += rel[i].name;
      else text += ", " + rel[i].name;
    }
    return text;
  };

  const getShareeMessage = () => {
    let text = "";
    for (let i = 0; i < arrPassfields.length; i++) {
      if (arrPassfields[i].length > 1) {
        for (let j = 0; j < arrPassfields[i].length; j++) {
          if (j === 0) text += `'${arrPassfields[i][j].name}'`;
          else if (j === arrPassfields[i].length - 1)
            text += ` and '${arrPassfields[i][j].name}'`;
          else text += `, '${arrPassfields[i][j].name}'`;
        }
        break;
      }
    }
    return text;
  };

  /*const getValue = (id) => {
    let val;
    if (sensitivity[id] === undefined) val = "1";
    else val = sensitivity[id];
    return val;
  };*/

  const handleChoice = (id) => (e) => {
    setSensitivity({ ...sensitivity, [id]: e.target.value });
  };

  //Show Sensitivity fields
  const showPass = arrPassfields.map((rel, idx) => {
    let text = getSharee(rel);
    return (
      <Row key={idx} style={{ marginTop: 1 + "em" }}>
        <Col>
          Sensitivity of information for {text + ": "}
          <select value={sensitivity[idx]} onChange={handleChoice(idx)}>
            <option defaultValue="0"> Not Selected</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </Col>
      </Row>
    );
  });

  const onlyMePass = () => {
    let text = "Only Me";
    return (
      <Row style={{ marginTop: 1 + "em" }}>
        <Col>
          Sensitivity of Apps and Information Accessible to {text + ": "}
          <select value={sensitivity["me"]} onChange={handleChoice("me")}>
            <option defaultValue="0">Not Selected</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </Col>
      </Row>
    );
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
          Now, you will assign a sensitivity level to each entity based on the
          information and apps that you are comfortable to share with them
          (recall your selection of apps in the previous step). Here,{" "}
          <span style={{ fontWeight: "bold" }}>1 </span>
          represents the lowest sensitivity level.
          {duplicate && (
            <span>
              <br />
              <br /> Multiple entities (e.g., {getShareeMessage()}) are combined
              for your sensitivity assignment, since the groups of apps that you
              are comfortable to share with them are exactly the same.
            </span>
          )}
          {stateFirst.choice === "yes" && (
            <span>
              <br />
              <br />
              The sensitivity level of apps and information accessible to only
              you (‘Only Me’ below) should{" "}
              <span style={{ fontWeight: "bold" }}>not</span> be lower than that
              of any other entities.
            </span>
          )}
          <br />
          <br />
          In the next step, you will create passwords to protect your apps from
          unauthorized access. The strength of your password would be related to
          the sensitivity level you assign to an entity.
        </p>

        {showPass}
        {stateFirst.choice === "yes" && onlyMePass()}
      </Container>
      <div
        style={{ marginTop: 3 + "em", marginBottom: 3 + "em" }}
        className="text-center"
      >
        <Link to="/summary">
          <Button style={{ marginRight: 8 + "em" }} color="primary">
            Back
          </Button>
        </Link>

        <Link to="/pass">
          <Button
            style={{ marginLeft: 8 + "em" }}
            color="primary"
            disabled={validity()}
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sensitivity;
