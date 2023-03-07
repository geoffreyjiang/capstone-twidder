import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import "./nav.css";
const TopNav = () => {
    return (
        <nav className="top-nav">
            <ul>
                <li>
                    <NavLink to="/tweets" exact={true}>
                        <a className="list-item-label">All</a>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/following" exact={true}>
                        <a className="list-item-label">Follow</a>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default TopNav;
