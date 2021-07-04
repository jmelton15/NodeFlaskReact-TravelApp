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
const NavBar = ({user,userId}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const linkOptions = {
      loggedOut: [["Register","Register"],["Login","Login"]],
      loggedIn: [["About The Site","About"],["Create Trip",`users/${user.user_id}/trip`],
                ["Travel Journal",`users/${user.user_id}/traveljournal`],["Profile",`users/${user.user_id}/profile`],["Logout","Logout"]]
    }
    
    let links = user.username ? linkOptions.loggedIn : linkOptions.loggedOut
    
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
                        <NavLink to={`/${l[1].toString().toLowerCase()}`}>{l[0]}</NavLink>
                    </NavItem>)
                })}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  export default NavBar;
  