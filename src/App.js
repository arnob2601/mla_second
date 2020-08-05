import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { icons } from "./icons";
import Welcome from "./welcome";
import Relation from "./relations";
import AppPicker from "./appPicker";
import Family from "./family";
import Friends from "./friend";
import Colleagues from "./colleague";
import Acquaintance from "./acquaintance";
import Stranger from "./stranger";
import Summary from "./summary";
import Sensitivity from "./sensitivity";
import Password from "./pass";
import Finish from "./finish";
import "./App.css";

const App = () => {
  const [state, setState] = useState({});
  const [app, setApp] = useState(icons);
  const [stateFirst, setStateFirst] = useState({
    name: "",
    user: "HP1",
    ipAddress: "73.65.252.244",
    choice: "yes",
    family: [{ name: "" }],
    friends: [{ name: "" }],
    colleague: [{ name: "" }],
    acquaintance: [{ name: "" }],
    stranger: [{ name: "" }],
    isFamily: false,
    isFriend: false,
    isColleague: false,
    isAcquaintance: false,
    isStranger: false,
  });
  const [family, setFamily] = useState({});
  const [friend, setFriend] = useState({});
  const [colleague, setColleague] = useState({});
  const [acquaintance, setAcquaintance] = useState({});
  const [stranger, setStranger] = useState({});
  const [sensitivity, setSensitivity] = useState({});
  const [password, setPassword] = useState({});
  const [checkPassword, setCheckPassword] = useState({});
  const [time, setTime] = useState({ start: 0, end: 0 });
  return (
    <div>
      <Container fluid>
        <div style={{ textAlign: "center" }}>
          <img
            className="phone"
            src={require("./Images/top.jpg")}
            alt="phone_top"
          />
        </div>

        <Row>
          <Col className="app" sm="12" md={{ size: 6, offset: 3 }}>
            <Router>
              <Switch>
                {/*<Route path="/" exact component={Welcome} />
                <Route path="/trailer" component={Trailer} />*/}
                <Route
                  path="/"
                  exact
                  render={(props) => <Welcome time={time} setTime={setTime} />}
                />
                <Route
                  path="/sharing"
                  render={(props) => (
                    <Relation
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      family={family}
                      setFamily={setFamily}
                      friend={friend}
                      setFriend={setFriend}
                      colleague={colleague}
                      setColleague={setColleague}
                      acquaintance={acquaintance}
                      setAcquaintance={setAcquaintance}
                      stranger={stranger}
                      setStranger={setStranger}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/apppicker"
                  render={(props) => (
                    <AppPicker
                      state={state}
                      setState={setState}
                      app={app}
                      setApp={setApp}
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/family"
                  render={(props) => (
                    <Family
                      state={state}
                      setState={setState}
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      family={family}
                      setFamily={setFamily}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/friend"
                  render={(props) => (
                    <Friends
                      state={state}
                      setState={setState}
                      app={app}
                      setApp={setApp}
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      friend={friend}
                      setFriend={setFriend}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/colleague"
                  render={(props) => (
                    <Colleagues
                      state={state}
                      setState={setState}
                      app={app}
                      setApp={setApp}
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      colleague={colleague}
                      setColleague={setColleague}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/acquaintance"
                  render={(props) => (
                    <Acquaintance
                      state={state}
                      setState={setState}
                      app={app}
                      setApp={setApp}
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      acquaintance={acquaintance}
                      setAcquaintance={setAcquaintance}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/stranger"
                  render={(props) => (
                    <Stranger
                      state={state}
                      setState={setState}
                      app={app}
                      setApp={setApp}
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      stranger={stranger}
                      setStranger={setStranger}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/summary"
                  render={(props) => (
                    <Summary
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      family={family}
                      friend={friend}
                      colleague={colleague}
                      acquaintance={acquaintance}
                      stranger={stranger}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/sensitivity"
                  render={(props) => (
                    <Sensitivity
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      family={family}
                      friend={friend}
                      colleague={colleague}
                      acquaintance={acquaintance}
                      stranger={stranger}
                      sensitivity={sensitivity}
                      setSensitivity={setSensitivity}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/pass"
                  render={(props) => (
                    <Password
                      stateFirst={stateFirst}
                      setStateFirst={setStateFirst}
                      password={password}
                      setPassword={setPassword}
                      checkPassword={checkPassword}
                      setCheckPassword={setCheckPassword}
                      family={family}
                      friend={friend}
                      colleague={colleague}
                      acquaintance={acquaintance}
                      stranger={stranger}
                      sensitivity={sensitivity}
                      time={time}
                      setTime={setTime}
                      {...props}
                    />
                  )}
                />
                <Route path="/finish" component={Finish} />
              </Switch>
            </Router>
          </Col>
        </Row>
        <div style={{ textAlign: "center" }}>
          <img
            className="phone"
            src={require("./Images/bot.jpg")}
            alt="phone_bot"
          />
        </div>
      </Container>
    </div>
  );
};

export default App;
