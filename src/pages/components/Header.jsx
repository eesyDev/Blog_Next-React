import React, {useState, useEffect} from "react";
import axios from 'axios';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTwitter, faTelegram} from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SearchPopup from "./SearchPopup";
import BurgerMenu from "./BurgerMenu";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



function Header() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/category/');
            setData(response.data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
    }, []);
    return (
        <header className="header">
            <div className="container-xl header__top">
                <div className="row align-items-center">
                    <div className="col-4 d-none d-md-block d-lg-block">
                        <ul className="social">
                            <li className="list-inline-item" key="instagram">
                                <a href="">
                                    <i>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </i>
                                </a>
                            </li>
                            <li className="list-inline-item" key="facebook">
                                <a href="">
                                    <i>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </i>
                                </a>
                            </li>
                            <li className="list-inline-item" key="twitter">
                                <a href="">
                                    <i>
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </i>
                                </a>
                            </li>
                            <li className="list-inline-item" key="telegram">
                                <a href="">
                                    <i>
                                        <FontAwesomeIcon icon={faTelegram} />
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 header__middle">
                        <a href="" className="logo" key="logo">
                            <img src="/images/logopic.png" alt="dollars"/>
                        </a>
                        <a href="" className="logo-text" key="logo-text">
                            <img src="/images/logo.svg"/>
                        </a>
                        <p className="motto d-block" key='motto'>C дипломом можно заработать на жизнь. Самообразование сделает Вам состояние. Джим Рон ©</p>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <div className="header__buttons">                            
                            <SearchPopup />
                            <BurgerMenu />
                        </div>
                    </div>
                    <Navbar expand="lg">
                        <div className="container-xl">
                            <Navbar.Collapse id="basic-navbar-nav" className="show justify-content-center header__nav">
                            <Nav>
                                <Link href="/" key="main" className="nav-link">Главная</Link>
                                {
                                    data.map((item, index) => {
                                    
                                        return (    
                                            item.subcategories.length > 0 ?               
                                            <NavDropdown
                                                key={item.id}
                                                title={item.title}
                                                id={`category-${index}`}
                                            >
                                                {
                                                    item.subcategories.map((sub) => (
                                                        <Link href={`/subcategories/${sub.slug}`}key={sub.name}>{sub.name}</Link>
                                                    ))
                                                }
                                            </NavDropdown> : <Link className="nav-link" key={item.id} href={`/categories/${item.slug}`}>{item.title}</Link>
                                        ) 
                                    })
                                }
                            </Nav>
                            </Navbar.Collapse>
                        </div>
                    </Navbar>
                </div>
            </div>
        </header>
    )
}

export default Header;