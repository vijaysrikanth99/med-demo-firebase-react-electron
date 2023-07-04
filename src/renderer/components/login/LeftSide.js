import React from "react";
import { Form, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const LeftSide = () => {
  const navigate = useNavigate();
  return (
    <div>
      <br />
      <br />
      <br />
      <Form style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }}>
        <Form.Group>
          <Form.Label>Enter your email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter your password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" />
        </Form.Group>
        <Button onClick={() => navigate("Dropzone")}>Login</Button>
      </Form>
    </div>
  );
};

export default LeftSide;
