import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery, updateFilteredPosts, fetchSearchData } from '@/redux/slices/searchSlice';



function SearchPopup() {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const filteredPosts = useSelector(state => state.search.filteredPosts);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (query) {
      dispatch(fetchSearchData(query));
      dispatch(updateQuery(query));
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShow(false);
    }
  };
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };



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
        <form onSubmit={handleSubmit}>
          <div className="form-group d-flex search-form">
            <input className="form-control me-2"
              type="text"
              placeholder="Search posts..."
              value={query}
              onChange={handleInputChange}
            />
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

export default SearchPopup;
