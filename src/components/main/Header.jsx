import classes from './header.module.css';
import decoristLogo from "../../assets/images/decorist-logo.png";
import toggleIcon from "../../assets/icons/menu.svg";

import {useState} from "react";

export default function Header () {
    const [navStyle, setNavStyle] = useState({})

    const toggleMenu = () => {
        let style;
        if(navStyle.transform === 'translateY(0%)'){
            style = {display: 'flex', transform: 'translateY(-130%)', transition: 'all 0.5s ease-out'}
        } else {
            style = {display: 'flex', transform: 'translateY(0%)', transition: 'all 0.5s ease-out'}
        }
        setNavStyle(style);
    };

    const changeContentTo = (path) => {
        // changeSelected(path);
        if(window.innerWidth <= 640){
            setTimeout(()=>{
                setNavStyle({display: 'flex', transform: 'translateY(-130%)', transition: 'all 0.5s ease-out'});
            }, 100);
        }
    };
    return (
        <>
            <div className={classes.toggler}>
                <img onClick={toggleMenu} src={toggleIcon} width={35} height={35} alt="menu icon"/>
            </div>
            <nav className={classes.header_nav} style={navStyle}>
                <div className={classes.logo}>
                    <div style={{height: '50px', width: '200px', overflow: 'hidden'}}>
                        <img src={decoristLogo} width="200px" style={{transform: "translateY(-72px)"}}/>
                    </div>
                </div>
                <ul>
                    {/*className={selected === 'home' ? classes.active : ""}*/}
                    <li onClick={()=> changeContentTo('home')}>
                        <span>Home</span>
                    </li>
                    <li  onClick={()=> changeContentTo('about')}>
                        <span>About</span>
                    </li>
                    <li  onClick={()=> changeContentTo('experience')}>
                        <span>Experience</span>
                    </li>
                    <li onClick={()=> changeContentTo('portfolio')}>
                        <span>Portfolio</span>
                    </li>
                    <li onClick={()=> changeContentTo('contact')}>
                        <span>Contact</span>
                    </li>
                </ul>
            </nav>
        </>

    )
}
