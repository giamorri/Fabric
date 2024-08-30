import React from "react";
import './Header.css';
import sampleLogo from './images/logoSample3.png';

function Header()
{
    return (
        <div className="App-header">
            <table>
                <thead>
                    <tr>
                        <td className="fabricSample">
                            <img src={sampleLogo}></img>
                        </td>
                        <td className="navLinks"> Home </td>
                        <td className="navLinks"> Profile </td>
                        <td className="navLinks"> Explore </td>
                        <td className="navLinks"> Logout </td>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default Header;