import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./nav.css";
const TopNav = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <nav className="top-nav">
            <ul>
                <li>
                    <NavLink to="/tweets" exact={true}>
                        <a className="list-item-label">All</a>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/users/${sessionUser.id}/following`}
                        exact={true}
                    >
                        <a className="list-item-label">Follow</a>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default TopNav;
