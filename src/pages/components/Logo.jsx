import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useSelector } from "react-redux";


function Logo() {
    const [bodyClass, setBodyClass] = useState('light');
    useEffect(() => {
        document.body.addEventListener("click", () => {
          setBodyClass(document.body.className);
        });
      }, []);

      const mode = useSelector((state) => state.mode.mode);

  return (
    <>
        {mode === "light" ?
            <>
                <Link href="/" className="logo" key="logo">
                    <img src="/images/logopicNew.png" alt="dollars"/>
                </Link>
                <Link href="/" className="logo-text" key="logo-text">
                    <img src="/images/logoNew.svg"/>
                </Link>
                <p className="motto d-block" key='motto'>C дипломом можно заработать на жизнь. Самообразование сделает Вам состояние. Джим Рон ©</p>
            </> :
            <>
                <Link href="/" className="logo" key="logo">
                    <img src="/images/logopicNewWhite.png" alt="dollars"/>
                </Link>
                <Link href="/" className="logo-text" key="logo-text">
                    <img src="/images/lofoNewWhite.svg"/>
                </Link>
                <p className="motto d-block" key='motto'>C дипломом можно заработать на жизнь. Самообразование сделает Вам состояние. Джим Рон ©</p>
            </>
        }
    </>
  )
}

export default Logo