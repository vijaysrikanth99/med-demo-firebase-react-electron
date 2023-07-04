import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropzone from "./Dropzone";
import OffcanvasExample from "./sideNav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function FillExample() {
  const [folders, setFolders] = useState([
    "ClincAlbum",
    "LabReports",
    "Prescription",
    "Cardiology",
    "Orthopaedics",
  ]);
  const [show, setShow] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelCreatFloder = () => {
    console.log(newFolderName);
    if (!newFolderName.length == 0) {
      setFolders((oldArray) => [...oldArray, newFolderName]);
      setShow(false);
    }
  };
  useEffect(() => {
    setNewFolderName("");
  }, [folders]);

  return (
    <>
      <OffcanvasExample handleShow={handleShow} />
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
        style={{ backgroundColor: " LightGray",marginTop:"-15px" }}
        
      >
        {folders.map((name) => (
          <Tab eventKey={name} title={name} variant="primary">
            <Dropzone folderName={name} />
          </Tab>
        ))}
        {/* <Tab eventKey="clincAlbum" title="Clinc Album" variant="primary">
          <Dropzone folderName={"clincAlbum"} />
        </Tab> */}
        {/* <Tab eventKey="labReports" title="Lab Reports" variant="primary">
          <Dropzone folderName={"labReports"} />
        </Tab>
        <Tab eventKey="prescription" title="Prescription" variant="primary">
          <Dropzone folderName={"prescription"} />
        </Tab>
        <Tab eventKey="cardiology" title="Cardiology" variant="primary">
          <Dropzone folderName={"cardiology"} />
        </Tab>
        <Tab eventKey="orthopaedics" title="Orthopaedics" variant="primary">
          <Dropzone folderName={"orthopaedics"} />
        </Tab> */}
      </Tabs>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Folder</Form.Label>
              <Form.Control
                type="text"
                placeholder="Folder Name"
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <Form.Text className="text-muted">
                Please do create unique name
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handelCreatFloder}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FillExample;
