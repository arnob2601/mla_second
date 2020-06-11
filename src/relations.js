import React, {useEffect} from "react";
import { Container, Row, Col, Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";

const entity = ["Family", "Friend", "Colleague", "Acquaintance", "Stranger"];
const isChanged = [false, false, false, false, false];

const Relation = ({
  stateFirst,
  setStateFirst,
  family,
  setFamily,
  friend,
  setFriend,
  colleague,
  setColleague,
  acquaintance,
  setAcquaintance,
  stranger,
  setStranger,
  ...props
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /*Relations insertion to database*/
  const pushFamilyData = async (x) => {
    await fetch(
      `http://${stateFirst.ipAddress}:4000/relation/add?user=${stateFirst.user}&entity=${entity[0]}&sharee=${x}`
    ).catch((err) => console.error(err));
  };

  const pushFriendData = async (x) => {
    await fetch(
      `http://${stateFirst.ipAddress}:4000/relation/add?user=${stateFirst.user}&entity=${entity[1]}&sharee=${x}`
    ).catch((err) => console.error(err));
  };

  const pushColleagueData = async (x) => {
    await fetch(
      `http://${stateFirst.ipAddress}:4000/relation/add?user=${stateFirst.user}&entity=${entity[2]}&sharee=${x}`
    ).catch((err) => console.error(err));
  };

  const pushAcquaintanceData = async (x) => {
    await fetch(
      `http://${stateFirst.ipAddress}:4000/relation/add?user=${stateFirst.user}&entity=${entity[3]}&sharee=${x}`
    ).catch((err) => console.error(err));
  };

  const pushStrangerData = async (x) => {
    await fetch(
      `http://${stateFirst.ipAddress}:4000/relation/add?user=${stateFirst.user}&entity=${entity[4]}&sharee=${x}`
    ).catch((err) => console.error(err));
  };

  const pushData = () => {
    if (stateFirst.isFamily) {
      stateFirst.family.map((f, idx) => {
        if (f.name !== "") pushFamilyData(f.name);
        else pushFamilyData(entity[0]);
        return 0;
      });
    }

    if (stateFirst.isFriend) {
      stateFirst.friends.map((f, idx) => {
        if (f.name !== "") pushFriendData(f.name);
        else pushFriendData(entity[1]);
        return 0;
      });
    }

    if (stateFirst.isColleague) {
      stateFirst.colleague.map((f, idx) => {
        if (f.name !== "") pushColleagueData(f.name);
        else pushColleagueData(entity[2]);
        return 0;
      });
    }

    if (stateFirst.isAcquaintance) {
      stateFirst.acquaintance.map((f, idx) => {
        if (f.name !== "") pushAcquaintanceData(f.name);
        else pushAcquaintanceData(entity[3]);
        return 0;
      });
    }

    if (stateFirst.isStranger) {
      stateFirst.stranger.map((f, idx) => {
        if (f.name !== "") pushStrangerData(f.name);
        else pushStrangerData(entity[4]);
        return 0;
      });
    }
    for (let i = 0; i < 5; i++) isChanged[i] = false;
  };

  /*Submit Button Method*/
  const addRelation = () => {
    if (isChanged[0]) {
      let x1 = {};
      stateFirst.family.map((f, idx) => {
        x1["family" + idx] = [];
        return 0;
      });
      setFamily({ ...family, ...x1 });
    }
    if (isChanged[1]) {
      let x2 = {};
      stateFirst.friends.map((f, idx) => {
        x2["friend" + idx] = [];
        return 0;
      });
      setFriend({ ...friend, ...x2 });
    }
    if (isChanged[2]) {
      let x3 = {};
      stateFirst.colleague.map((f, idx) => {
        x3["colleague" + idx] = [];
        return 0;
      });
      setColleague({ ...colleague, ...x3 });
    }
    if (isChanged[3]) {
      let x4 = {};
      stateFirst.acquaintance.map((f, idx) => {
        x4["acquaintance" + idx] = [];
        return 0;
      });
      setAcquaintance({ ...acquaintance, ...x4 });
    }
    if (isChanged[4]) {
      let x5 = {};
      stateFirst.stranger.map((f, idx) => {
        x5["stranger" + idx] = [];
        return 0;
      });
      setStranger({ ...stranger, ...x5 });
    }

    pushData();
  };

  const handleFamilyChange = (idx) => (e) => {
    const newShareUsers = stateFirst.family.map((shareUser, sidx) => {
      if (idx !== sidx) return shareUser;
      return { ...shareUser, name: e.target.value };
    });
    setStateFirst({ ...stateFirst, family: newShareUsers });
  };

  const handleRemoveFamily = (idx) => () => {
    isChanged[0] = true;
    setStateFirst({
      ...stateFirst,
      family: stateFirst.family.filter((s, sidx) => idx !== sidx),
    });
  };

  const handleAddFamily = () => {
    isChanged[0] = true;
    setStateFirst({
      ...stateFirst,
      family: stateFirst.family.concat([{ name: "" }]),
    });
  };

  const handleFriendChange = (idx) => (e) => {
    const newShareUsers = stateFirst.friends.map((shareUser, sidx) => {
      if (idx !== sidx) return shareUser;
      return { ...shareUser, name: e.target.value };
    });
    setStateFirst({ ...stateFirst, friends: newShareUsers });
  };

  const handleRemoveFriend = (idx) => () => {
    isChanged[1] = true;
    setStateFirst({
      ...stateFirst,
      friends: stateFirst.friends.filter((s, sidx) => idx !== sidx),
    });
  };

  const handleAddFriend = () => {
    isChanged[1] = true;
    setStateFirst({
      ...stateFirst,
      friends: stateFirst.friends.concat([{ name: "" }]),
    });
  };

  const handleColleagueChange = (idx) => (e) => {
    const newShareUsers = stateFirst.colleague.map((shareUser, sidx) => {
      if (idx !== sidx) return shareUser;
      return { ...shareUser, name: e.target.value };
    });
    setStateFirst({ ...stateFirst, colleague: newShareUsers });
  };

  const handleRemoveColleague = (idx) => () => {
    isChanged[2] = true;
    setStateFirst({
      ...stateFirst,
      colleague: stateFirst.colleague.filter((s, sidx) => idx !== sidx),
    });
  };

  const handleAddColleague = () => {
    isChanged[2] = true;
    setStateFirst({
      ...stateFirst,
      colleague: stateFirst.colleague.concat([{ name: "" }]),
    });
  };

  const handleAcquaintanceChange = (idx) => (e) => {
    const newShareUsers = stateFirst.acquaintance.map((shareUser, sidx) => {
      if (idx !== sidx) return shareUser;
      return { ...shareUser, name: e.target.value };
    });
    setStateFirst({ ...stateFirst, acquaintance: newShareUsers });
  };

  const handleRemoveAcquaintance = (idx) => () => {
    isChanged[3] = true;
    setStateFirst({
      ...stateFirst,
      acquaintance: stateFirst.acquaintance.filter((s, sidx) => idx !== sidx),
    });
  };

  const handleAddAcquaintance = () => {
    isChanged[3] = true;
    setStateFirst({
      ...stateFirst,
      acquaintance: stateFirst.acquaintance.concat([{ name: "" }]),
    });
  };

  const handleStrangerChange = (idx) => (e) => {
    const newShareUsers = stateFirst.stranger.map((shareUser, sidx) => {
      if (idx !== sidx) return shareUser;
      return { ...shareUser, name: e.target.value };
    });
    setStateFirst({ ...stateFirst, stranger: newShareUsers });
  };

  const handleRemoveStranger = (idx) => () => {
    isChanged[4] = true;
    setStateFirst({
      ...stateFirst,
      stranger: stateFirst.stranger.filter((s, sidx) => idx !== sidx),
    });
  };

  const handleAddStranger = () => {
    isChanged[4] = true;
    setStateFirst({
      ...stateFirst,
      stranger: stateFirst.stranger.concat([{ name: "" }]),
    });
  };

  return (
    <div
      style={{
        marginTop: 2 + "em",
      }}
    >
      <Container fluid>
        <p style={{ textAlign: "justify"}}>
          We share our smartphone with different entities for various reasons.
          From the following list of entities, please select with whom you
          share, or ever shared your smartphone before.
        </p>
        {(stateFirst.isFamily ||
          stateFirst.isFriend ||
          stateFirst.isColleague ||
          stateFirst.isAcquaintance ||
          stateFirst.isStranger) && (
          <p style={{ color: "blue", textAlign: "justify" }}>
            You can add more specific relation(s) for each entity if your
            sharing preferences are different for them. For example, parents,
            spouse, siblings are few examples of specific relations for the
            entity: ‘Family Members’. In other words, if you are comfortable
            with sharing the same apps on your smartphone with all of your
            family members, you do not need to add ‘more relations’ for this
            entity. The same rule is applicable to other entities in here, like
            Friends, Colleagues, Acquaintances, and Strangers.
          </p>
        )}

        <Row style={{ marginTop: 3 + "em" }}>
          <Col>
            <Label>
              <input
                type="checkbox"
                checked={stateFirst.isFamily}
                onChange={(e) => {
                  isChanged[0] = true;
                  if (e.target.checked) {
                    setStateFirst({
                      ...stateFirst,
                      isFamily: true,
                    });
                  } else {
                    setStateFirst({
                      ...stateFirst,
                      isFamily: false,
                      family: [{ name: "" }],
                    });
                  }
                }}
              />
              Family Members
            </Label>
            {stateFirst.isFamily === true && (
              <div>
                {stateFirst.family.map((shareUser, idx) => (
                  <div key={idx}>
                    <input
                      style={{ width: 250 }}
                      type="text"
                      placeholder="Type to add specific relation.."
                      value={shareUser.name}
                      onChange={handleFamilyChange(idx)}
                    />
                    {stateFirst.family.length !== 1 && (
                      <button
                        className="myButton"
                        onClick={handleRemoveFamily(idx)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  style={{ background: "#007bff", color: "white" }}
                  onClick={handleAddFamily}
                >
                  Add more relation
                </button>
              </div>
            )}
          </Col>
          <Col>
            <Label>
              <input
                type="checkbox"
                checked={stateFirst.isFriend}
                onChange={(e) => {
                  isChanged[1] = true;
                  if (e.target.checked) {
                    setStateFirst({
                      ...stateFirst,
                      isFriend: true,
                    });
                  } else {
                    setStateFirst({
                      ...stateFirst,
                      isFriend: false,
                      friends: [{ name: "" }],
                    });
                  }
                }}
              />
              Friends
            </Label>
            {stateFirst.isFriend === true && (
              <div>
                {stateFirst.friends.map((shareUser, idx) => (
                  <div key={idx}>
                    <input
                      style={{ width: 250 }}
                      type="text"
                      placeholder="Type to add specific relation.."
                      value={shareUser.name}
                      onChange={handleFriendChange(idx)}
                    />
                    {stateFirst.friends.length !== 1 && (
                    <button
                      onClick={handleRemoveFriend(idx)}
                      style={{ width: 75, background: "red", color: "white" }}
                    >
                      Remove
                    </button>
                    )}
                  </div>
                ))}
                <button
                  style={{ background: "#007bff", color: "white" }}
                  onClick={handleAddFriend}
                >
                  Add more relation
                </button>
              </div>
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: 1 + "em", marginBottom: 1 + "em" }}></Row>
        <Row>
          <Col>
            <Label>
              <input
                type="checkbox"
                checked={stateFirst.isColleague}
                onChange={(e) => {
                  isChanged[2] = true;
                  if (e.target.checked) {
                    setStateFirst({
                      ...stateFirst,
                      isColleague: true,
                    });
                  } else {
                    setStateFirst({
                      ...stateFirst,
                      isColleague: false,
                      colleague: [{ name: "" }],
                    });
                  }
                }}
              />
              Colleagues
            </Label>
            {stateFirst.isColleague === true && (
              <div>
                {stateFirst.colleague.map((shareUser, idx) => (
                  <div key={idx}>
                    <input
                      style={{ width: 250 }}
                      type="text"
                      placeholder="Type to add specific relation.."
                      value={shareUser.name}
                      onChange={handleColleagueChange(idx)}
                    />
                    {stateFirst.colleague.length !== 1 && (
                    <button
                      onClick={handleRemoveColleague(idx)}
                      style={{ width: 75, background: "red", color: "white" }}
                    >
                      Remove
                    </button>
                    )}
                  </div>
                ))}
                <button
                  style={{ background: "#007bff", color: "white" }}
                  onClick={handleAddColleague}
                >
                  Add more relation
                </button>
              </div>
            )}
          </Col>
          <Col>
            <Label>
              <input
                type="checkbox"
                checked={stateFirst.isAcquaintance}
                onChange={(e) => {
                  isChanged[3] = true;
                  if (e.target.checked) {
                    setStateFirst({
                      ...stateFirst,
                      isAcquaintance: true,
                    });
                  } else {
                    setStateFirst({
                      ...stateFirst,
                      isAcquaintance: false,
                      acquaintance: [{ name: "" }],
                    });
                  }
                }}
              />
              Acquaintances
            </Label>
            {stateFirst.isAcquaintance === true && (
              <div>
                {stateFirst.acquaintance.map((shareUser, idx) => (
                  <div key={idx}>
                    <input
                      style={{ width: 250 }}
                      type="text"
                      placeholder="Type to add specific relation.."
                      value={shareUser.name}
                      onChange={handleAcquaintanceChange(idx)}
                    />
                    {stateFirst.acquaintance.length !== 1 && (
                    <button
                      onClick={handleRemoveAcquaintance(idx)}
                      style={{ width: 75, background: "red", color: "white" }}
                    >
                      Remove
                    </button>
                    )}
                  </div>
                ))}
                <button
                  style={{ background: "#007bff", color: "white" }}
                  onClick={handleAddAcquaintance}
                >
                  Add more relation
                </button>
              </div>
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: 1 + "em", marginBottom: 1 + "em" }}></Row>
        <Row>
          <Col>
            <Label>
              <input
                type="checkbox"
                checked={stateFirst.isStranger}
                onChange={(e) => {
                  isChanged[4] = true;
                  if (e.target.checked) {
                    setStateFirst({
                      ...stateFirst,
                      isStranger: true,
                    });
                  } else {
                    setStateFirst({
                      ...stateFirst,
                      isStranger: false,
                      stranger: [{ name: "" }],
                    });
                  }
                }}
              />
              Strangers
            </Label>
            {stateFirst.isStranger === true && (
              <div>
                {stateFirst.stranger.map((shareUser, idx) => (
                  <div key={idx}>
                    <input
                      style={{ width: 250 }}
                      type="text"
                      placeholder="Type to add specific relation.."
                      value={shareUser.name}
                      onChange={handleStrangerChange(idx)}
                    />
                    {stateFirst.stranger.length !== 1 && (
                    <button
                      onClick={handleRemoveStranger(idx)}
                      style={{ width: 75, background: "red", color: "white" }}
                    >
                      Remove
                    </button>
                    )}
                  </div>
                ))}
                <button
                  style={{ background: "#007bff", color: "white" }}
                  onClick={handleAddStranger}
                >
                  Add more relation
                </button>
              </div>
            )}
          </Col>
          <Col></Col>
        </Row>
        <div
          style={{ marginTop: 3 + "em", marginBottom: 3 + "em" }}
          className="text-center"
        >
          <Link to="/">
            <Button style={{ marginRight: 8 + "em" }} color="primary">
              Back
            </Button>
          </Link>

          <Link to="/apppicker" onClick={addRelation}>
            <Button
              disabled={
                !stateFirst.isFamily &&
                !stateFirst.isFriend &&
                !stateFirst.isColleague &&
                !stateFirst.isAcquaintance &&
                !stateFirst.isStranger
              }
              style={{ marginLeft: 8 + "em" }}
              color="primary"
            >
              Next
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Relation;
