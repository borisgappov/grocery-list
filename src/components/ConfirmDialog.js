import { Button, Modal } from "react-bootstrap";


function ConfirmDialog(props) {

  const handleClick = (confirmed) => props.confirm && props.confirm(confirmed);

  return (
    <Modal show={props.show} onHide={() => handleClick(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body><p>{props.message}</p></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClick(false)}>No</Button>
        <Button variant="primary" onClick={() => handleClick(true)}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDialog;
