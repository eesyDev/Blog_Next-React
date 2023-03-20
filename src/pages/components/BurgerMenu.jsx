import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTagsData } from '@/redux/slices/allTagsSlice';
import { fetchAllCategoriesData } from '@/redux/slices/allCategoriesSlice';
import { CurlLine } from './icons';
import ModeToggle from "./ModeToggle";
import Logo from './Logo';

function BurgerMenu() {
  const [show, setShow] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { allCategoriesData } = useSelector((state) => state.allCategories);
  const { allTagsData, loading, error } = useSelector((state) => state.allTags);

  useEffect(() => {
    dispatch(fetchAllCategoriesData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllTagsData());
  }, [dispatch]);

  const toggleSubmenu = (itemId) => {
    setSubmenuOpen(submenuOpen === itemId ? null : itemId);
  };

  return (
    <>
      <button className="burger-menu icon-button ms-2" onClick={handleShow}>
        <i>
            <FontAwesomeIcon icon={faBars}/>
        </i>
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end" className='burger'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <Logo/>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='burger-menu__part'>
          <div className='burger-menu__heading'>
            <div className='choose-mode'>
              <h4>День/Ночь</h4>
              <ModeToggle/>
            </div>
            </div>
            <div>
            
            </div>
          </div>
          <div className='burger-menu__part'>
            <div className='burger-menu__heading'>
              <h4>Теги</h4>
              <span><CurlLine/></span>
            </div>
            <div className='burger-menu__content  mt-3'>
              <div className='tags'>
              {
                  allTagsData && allTagsData.map(tag => (
                    <Link href={'/tags/' + tag.slug} className={tag.slug} key={tag.slug}>{tag.name}</Link>
                  ))
              }
              </div>
            </div>
          </div>
          <div className='burger-menu__part'>
            <div className='burger-menu__heading'>
              <h4>Категории</h4>
              <span><CurlLine/></span>
            </div>
            <div className='burger-menu__content  mt-3'>
            <ul className="menu justify-content-center">
                <nav>
                    <li><Link href="/" key="main" className="nav-link">Главная</Link></li>
                    {
                        allCategoriesData && allCategoriesData.map((item) => {
                        
                            return (    
                              <li key={item.id}>
                                <span>
                                <Link className="nav-link"  href={`/categories/${item.slug}`}>
                                  {item.title}
                                  
                                </Link>
                                  {item.subcategories.length > 0 ?
                                    <i className='menu-toggle'
                                    onClick={() => toggleSubmenu(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faAngleDown}/>
                                    </i> : ''
                                  }
                                  </span>
                                {item.subcategories.length > 0 ?   
                                <ul
                                className={`submenu ${submenuOpen === item.id ? 'show' : ''}`}
                                >
                                    {
                                        item.subcategories.map((sub) => (
                                            <li key={`sub-${sub.id}`}>
                                              <Link href={`/subcategories/${sub.slug}`}key={sub.name}>{sub.name}</Link>
                                            </li>
                                        ))
                                    }
                                </ul> : null}
                              </li>
                            ) 
                        })
                    }
                </nav>
            </ul>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default BurgerMenu;