import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
  } from 'reactstrap';

import {NavLink} from "react-router-dom";
import {useState} from "react";
import "./Navbar.css";

/**
 * 
 * @param {links} param0  [link1,link2,link3] ... ["companies","jobs",etc...]
 * @returns 
 */
const NavBar = ({username}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const linkOptions = {
      loggedOut: ["Register","Login"],
      loggedIn: ["About The Site","Create Trip","Travel Journal","Profile","Logout"]
    }
    
    let links = username ? linkOptions.loggedIn : linkOptions.loggedOut
    
    return (
      <div className="Navbar-navbar">
        <Navbar expand="md">
          <NavLink to="/" className="navbar-brand">DTRI</NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse className="justify-content-end" isOpen={isOpen} navbar>
            <Nav className="ml-auto float-end mt-1" navbar>
                {links.map((l,i) => {
                    return (<NavItem
                              key={i}
                            >
                        <NavLink to={`/${l.toString().toLowerCase()}`}>{l}</NavLink>
                    </NavItem>)
                })}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  export default NavBar;
  