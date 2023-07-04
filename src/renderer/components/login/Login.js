import React from "react";
// import logo from './logo.svg';
import "../../";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from "react-bootstrap";
import LeftSide from "./LeftSide";
import Menu from "./Menu";
import RightSide from "./RightSide";
function Login() {
  return (
    <div className="App">
      {/* <Menu /> */}
      <h1 style={{ color: "white", marginLeft: "65px", marginTop: "40px" }}>
        Get Set Cube-Client
      </h1>
      <Row className="landing">
        <Col>
          <LeftSide />
        </Col>

        <Col>
          <RightSide />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
