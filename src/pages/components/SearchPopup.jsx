import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";


function SearchPopup() {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
    <button className="search icon-button" onClick={handleShow}>
        <i>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </i>
    </button>

    <Modal keyboard={true} show={show} onHide={handleClose} fullscreen={fullscreen} className="search">
        <Modal.Header closeButton>
        </Modal.Header>
      <Modal.Body className='search__content'>
        <div className='text-center'>
            <h3 className='mb-4 mt-0'>
                Search
            </h3>
        </div>
        <form>
          <div className="form-group d-flex search-form">
            <input type="text" className="form-control me-2" id="searchInput" />
            <button className='btn btn-lg btn-main' type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  </>
  )
}

export default SearchPopup