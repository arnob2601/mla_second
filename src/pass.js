import React, {useEffect} from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";

let invalid = true;
let duplicate;

const Password = ({
  stateFirst,
  setStateFirst,
  password,
  setPassword,
  checkPassword,
  setCheckPassword,
  family,
  friend,
  colleague,
  acquaintance,
  stranger,
  ...props
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
  console.log(arrPassfields);
  const pushData = async () => {
    await fetch(
      `http://${stateFirst.ipAddress}:4000/password/add?user=${stateFirst.user}&sharee=DUMMY&pass=DUMMY`
    ).catch((err) => console.error(err));
    arrPassfields.map(async (rel, idx) => {
      let text = getSharee(rel);
      await fetch(
        `http://${stateFirst.ipAddress}:4000/password/add?user=${stateFirst.user}&sharee=${text}&pass=${password[idx]}`
      ).catch((err) => console.error(err));
    });
    if (stateFirst.choice === "yes") {
      let text = "Only Me";
      await fetch(
        `http://${stateFirst.ipAddress}:4000/password/add?user=${stateFirst.user}&sharee=${text}&pass=${password["me"]}`
      ).catch((err) => console.error(err));
    }
  };

  const validity = () => {
    let Invalid = false;
    let meInvalid = false;
    let uniqueValid = false;
    for (let i = 0; i < arrPassfields.length; i++) {
      if (password[i] === undefined || checkPassword[i] === undefined) {
        Invalid = true;
        break;
      } else if (password[i] !== checkPassword[i] || password[i].length < 4) {
        Invalid = true;
        break;
      }
    }

    //Only me pass validity check
    if (stateFirst.choice === "yes") {
      if (password["me"] === undefined || checkPassword["me"] === undefined) {
        meInvalid = true;
      } else if (
        password["me"] !== checkPassword["me"] ||
        password["me"].length < 4
      ) {
        meInvalid = true;
      }
    }
    //Unique password validity check
    let index = Object.keys(password);
    for (let i = 0; i < index.length; i++) {
      for (let j = 0; j < index.length; j++) {
        if (i !== j && password[index[i]] === password[index[j]]) {
          uniqueValid = true;
          break;
        }
      }
    }

    if (Invalid || meInvalid || uniqueValid) {
      invalid = true;
    } else {
      invalid = false;
    }
    return invalid;
  };

  const showWarning = (idx) => {
    let index = Object.keys(password);
    let flag = false;
    for (let i = 0; i < index.length; i++) {
      if (
        password[idx] !== "" &&
        password[idx] !== undefined &&
        password[idx] === password[index[i]] &&
        idx !== index[i]
      )
        flag = true;
    }
    return (
      <div>
        <Row>
          <Col>
            {password[idx] && password[idx].length < 4 && (
              <span style={{ color: "red" }}>Password too short!</span>
            )}
            {flag && <span style={{ color: "red" }}>Not Unique!</span>}
          </Col>
          <Col>
            {password[idx] !== checkPassword[idx] && checkPassword[idx] && (
              <span style={{ color: "red" }}>Password does not match!</span>
            )}
            {password[idx] === checkPassword[idx] &&
              password[idx] !== undefined &&
              password[idx] !== "" && (
                <span style={{ color: "green" }}>Password matches!</span>
              )}
          </Col>
        </Row>
      </div>
    );
  };

  const handleEntityChange = (idx) => (e) => {
    setPassword({ ...password, [idx]: e.target.value });
  };
  const handleCheckEntityChange = (idx) => (e) => {
    setCheckPassword({ ...checkPassword, [idx]: e.target.value });
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

  //Show Passfields
  const showPass = arrPassfields.map((rel, idx) => {
    let text = getSharee(rel);
    return (
      <div key={idx} style={{ marginTop: 1 + "em" }}>
        <Col>
          <Row>
            <Col>Password for {text}</Col>
          </Row>
          <Row>
            <Col>
              <input
                style={{ width: "300px" }}
                placeholder={"Type the password"}
                type="password"
                onChange={handleEntityChange(idx)}
                value={password[idx]}
              />
            </Col>
            <Col>
              <input
                style={{ width: "300px" }}
                placeholder={"Retype the password to confirm"}
                type="password"
                onChange={handleCheckEntityChange(idx)}
                value={checkPassword[idx]}
                onPaste={(e) => e.preventDefault()}
              />
            </Col>
          </Row>
          {showWarning(idx.toString())}
        </Col>
      </div>
    );
  });

  //Only Me
  const onlyMePass = () => {
    let text = "Only Me";
    return (
      <div style={{ marginTop: 1 + "em" }}>
        <Col>
          Password for '{text}' (it will give you access to all of the apps
          including the ones that you are not comfortable to share with anyone
          else)
          <Row>
            <Col>
              <input
                style={{ width: "300px" }}
                placeholder={"Type the password"}
                type="password"
                onChange={handleEntityChange("me")}
                value={password["me"]}
              />
            </Col>
            <Col>
              <input
                style={{ width: "300px" }}
                placeholder={"Retype the password to confirm"}
                type="password"
                onChange={handleCheckEntityChange("me")}
                value={checkPassword["me"]}
                onPaste={(e) => e.preventDefault()}
              />
            </Col>
          </Row>
          {showWarning("me")}
        </Col>
      </div>
    );
  };
  return (
    <div>
      <Container fluid>
        <p className="para">
          In this step, you will create passwords to protect your apps from
          unauthorized access. Later in this study, you will be asked to log in
          using the passwords you create. Please carefully follow the
          instructions below before you create the passwords.
          <br />
          <br /> Do Not use any of your real-life passwords. Rather you should
          follow your general strategies of password creation.
          <br />
          <br /> You will create a unique password in each password-box for an
          entity. Here, as you share your phone with an entity you will use the
          password for that entity to unlock your phone, which will give access
          to only those apps that you are comfortable to share with that entity.
          {duplicate && (
            <span>
              <br />
              <br /> Multiple entities (e.g., {getShareeMessage()}) are combined
              for your password creation, since the groups of apps that you are
              comfortable to share with them are exactly the same.
            </span>
          )}
          <br />
          <br /> Your password must be minimum four characters long.
          <br />
          <br /> Create strong passwords. You can consider the sensitivity of
          apps shared with an entity, while creating a password for that entity
          to protect those apps from unauthorized access.
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

        <Link to="/finish">
          <Button
            style={{ marginLeft: 8 + "em" }}
            color="primary"
            onClick={pushData}
            disabled={validity()}
          >
            Finish
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Password;
