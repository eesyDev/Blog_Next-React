import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategoriesData } from '@/redux/slices/allCategoriesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTwitter, faTelegram} from '@fortawesome/free-brands-svg-icons';
import SearchPopup from "./SearchPopup";
import { fetchNasdaqData } from "@/redux/slices/nasdaqSlice";
import BurgerMenu from "./BurgerMenu";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "./Logo";
import Loading from "./Loading";


function Header() { 
    const dispatch = useDispatch();
    const { allCategoriesData, loading, error } = useSelector((state) => state.allCategories);


    useEffect(() => {
        dispatch(fetchAllCategoriesData());
      }, [dispatch]);

    const { nasdaqData } = useSelector((state) => state.nasdaq);

    useEffect(() => {
            dispatch(fetchNasdaqData());
    }, [dispatch]);

    // if (loading) {
    //     return <Loading/>
    //   }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
    //   if (!allCategoriesData) {
    //     return <div>No category found</div>;
    //   }


  const nasdaqList = nasdaqData && Object.entries(nasdaqData).map(([key, value]) => {
    return { key, value };
  });

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
                        <Logo/>  
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
                                    allCategoriesData && allCategoriesData.map((item, index) => {
                                    
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
                <div className="nasdaq-indexes">
                {/* {
                    nasdaqList && nasdaqList.map(curr => {
                        let convOpen = +curr.value.values[0].open
                        let convClose = +curr.value.values[0].close
                        let open = parseFloat(convOpen.toFixed(2));
                        let close = parseFloat(convClose.toFixed(2));
                        let diff = open - close;
                        let color;
                        let icon;
                        if (diff < 0) {
                            color = 'red'
                            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1.1875 1.59375L4 4.40625L6.8125 1.59375" stroke="#F32B19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                        } else if (diff > 0) {
                            color = 'green';
                            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1.1875 4.40625L4 1.59375L6.8125 4.40625" stroke="#12A560" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                        } else {
                            color = 'grey';
                            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="6" height="8" viewBox="0 0 6 8" fill="none"><path d="M1.59375 6.625L4.40625 3.8125L1.59375 1" stroke="#969CB4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                        }
                        return(
                            <div className="wrapper">
                                <div className="title">{curr.key}</div>
                                <div className="diff">{diff}</div>
                                <div className="icon">{icon}</div>
    
                            </div>
    
                        )
                    })
                } */}
                </div>
            </div>
        </header>
    )
}

export default Header;