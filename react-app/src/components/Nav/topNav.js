import React from "react";
import "./nav.css";
const TopNav = () => {
    return (
        <nav className="top-nav">
            <ul>
                <li>
                    <a>All</a>
                </li>
                <li>
                    <a>Following</a>
                </li>
            </ul>
        </nav>
    );
};

export default TopNav;
