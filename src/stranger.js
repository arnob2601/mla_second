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
  "/summary",
  "/apppicker",
];
let back = "";

const Stranger = ({
  state,
  setState,
  app,
  setApp,
  stateFirst,
  setStateFirst,
  stranger,
  setStranger,
  ...props
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  if (stateFirst.isAcquaintance) back = address[3];
  else if (stateFirst.isColleague) back = address[2];
  else if (stateFirst.isFriend) back = address[1];
  else if (stateFirst.isFamily) back = address[0];
  else back = address[6];

  const pushData = async () => {
    if (stateFirst.isStranger) {
      for (let i = 0; i < Apps.length; i++) {
        let text = "Strangers";
        if (stateFirst.stranger[i].name !== "") text = stateFirst.stranger[i].name;
        for (let j = 0; j < Apps[i].length; j++) {
          //console.log(stateFirst.family[i].name, Apps[i][j].title)
          await fetch(
            `http://${stateFirst.ipAddress}:4000/stranger/add?user=${stateFirst.user}&sharee=${text}&app=${Apps[i][j].title}`
          ).catch((err) => console.error(err));
        }
      }
    }
  };

  const remove = (pid, id) => (e) => {
    //console.log(pid, id);
    setStranger({
      ...stranger,
      ["stranger" + pid]: stranger["stranger" + pid].filter(
        (s, sidx) => id !== sidx
      ),
    });
  };

  const Apps = Object.keys(stranger).map((key) => stranger[key]);
  for(let i=0;i<Apps.length;i++) {
    Apps[i].sort((a,b) => a.id-b.id)
  }
  const selectedApps = Apps.map((x, pid) =>
    x.map((icon, idx) => {
      return (
        <Card key={idx}>
          <Label>
            <CardImg src={icon.src} alt={icon.title} draggable="false" />
            <CardTitle className="text-center" style={{ fontSize: "12px" }}>
              <button
                style={{ background: "red", color: "white" }}
                onClick={remove(pid, idx)}
              >
                X
              </button>{" "}
              {icon.title}
            </CardTitle>
          </Label>
        </Card>
      );
    })
  );

  const drop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("card"));
    const idx = e.currentTarget.id;
    setStranger({
      ...stranger,
      [idx]: [
        ...new Map(
          stranger[idx].concat([data]).map((item) => [item.id, item])
        ).values(),
      ], //Setting only unique values to a shared entity
    });
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const strangerCards = stateFirst.stranger.map((rel, idx) => {
    let text = "Strangers";
    if (rel.name !== "") {
      text = rel.name;
    }
    return (
      <div
        onDrop={drop}
        onDragOver={dragOver}
        className="box"
        key={idx}
        id={"stranger" + idx}
      >
        <p className="text-center">{text}</p>
        <Row xs="5">{selectedApps[idx]}</Row>
      </div>
    );
  });

  const icons = Object.keys(state).map((key) => state[key]);
  const iconCards = icons.map((icon) => {
    return (
      <div
        key={icon.id}
        style={{ marginBottom: 0.5 + "em", marginTop: 0.5 + "em" }}
      >
        <Card
          onDragStart={(e) => {
            e.dataTransfer.setData("card", JSON.stringify(icon));
          }}
          onDragOver={(e) => {
            e.stopPropagation();
          }}
          id={icon}
          draggable="true"
        >
          <Label>
            <CardImg src={icon.src} alt={icon.title} />
            <CardTitle className="text-center" style={{ fontSize: "12px" }}>
              {icon.title}
            </CardTitle>
          </Label>
        </Card>
      </div>
    );
  });

  return (
    <div>
      <Container fluid>
        <p
          style={{
            marginTop: 3 + "em",
            //marginBottom: 3 + "em",
            textAlign: "justify",
          }}
        >
          We are comfortable with sharing different apps with different
          entities. From the following list of apps that you have selected in
          the previous step, please select (drag and drop) the apps that you are
          comfortable to share with the{" "}
          <span style={{ fontWeight: "bold", color: "blue" }}>strangers</span>.
        </p>

        <Row>
          <Col>
            <Row xs="5">{iconCards}</Row>
          </Col>
          {stateFirst.isStranger && <Col>{strangerCards}</Col>}
        </Row>
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

        <Link to="/summary">
          <Button
            style={{ marginLeft: 8 + "em" }}
            color="primary"
            onClick={pushData}
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Stranger;
