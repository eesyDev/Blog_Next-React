import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { CurlLine } from './icons';



function BurgerMenu() {
  const [show, setShow] = useState(false);
  const [tagData, setTagData] = useState(null);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/tags`);
      const data = await response.json();
      setTagData(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <button className="burger-menu icon-button ms-2" onClick={handleShow}>
        <i>
            <FontAwesomeIcon icon={faBars}/>
        </i>
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <a href="" className="logo" key="logo">
              <img src="/images/logopic.png" alt="dollars"/>
          </a>
          <Link href="/" className="logo-text" key="logo-text">
              <img src="/images/logo.svg"/>
          </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='burger-menu__part'>
            <div className='burger-menu__heading'>
				<h4>Теги</h4>
				<span><CurlLine/></span>
            </div>
            <div className='burger-menu__content  mt-3'>
				<div className='tags'>
					{
						tagData && tagData.map(tag => (
							<Link href={'/tags/' + tag.slug} className={tag.slug} key={tag.slug}>{tag.name}</Link>
						))
					}
				</div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default BurgerMenu;