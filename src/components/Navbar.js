// Home.jsx
import React from "react";
import { NavLink } from "react-router-dom";
export default function Navbar(){
    const navbarLinks = ['','Events','Leagues','Teams']
    const headerStyle = {
        padding:'20px',
        backgroundColor:'teal'
    }
    const navLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        margin: '0 15px', // Add space between nav links
      };

      return (
        <nav style={headerStyle}>
          <div>
            <div>
              {navbarLinks.map((link) => (
                <NavLink key={link} to={`/${link}`} style={navLinkStyle}>
                  {link === '' ? 'Home' : link}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      );

    
}
