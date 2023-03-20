import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTwitter, faTelegram} from '@fortawesome/free-brands-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';


function Footer() {
//   const [showButton, setShowButton] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className='footer'>
        <div className='container-xl'>
            <div className='footer__inner'>
                <div className='row d-flex align-items-center gy-4'>
                    <div className='col-md-4 footer__left'>
                        <span className='copyright'>
                            Designed and developed by <a href='https://eesydev.kz'>ESSYDEV</a>
                        </span>
                    </div>
                    <div className='col-md-4 text-center'>
                    <ul className="social">
                            <li className="list-inline-item">
                                <a href="">
                                    <i>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="">
                                    <i>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="">
                                    <i>
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="">
                                    <i>
                                        <FontAwesomeIcon icon={faTelegram} />
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-4 footer__right'>
                        <a href="#" id="back_to_top" onClick={handleBackToTop}>
                            <i>
                                <FontAwesomeIcon icon={faAngleUp} />
                            </i>
                            Back to top
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer