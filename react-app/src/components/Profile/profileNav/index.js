import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";

import LogOutModal from "../../Modals/Logout/LogoutModal";
import AboutModal from "../../Modals/AboutModal/AboutModal";

const ProfileNav = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <nav className="left-nav">
                <div className="nav-items">
                    <i className="fa-brands fa-twitter nav-icon fa-3x"></i>
                    <h1>Twidder</h1>
                    <ul>
                        <li className="list-item">
                            <NavLink to="/" exact={true}>
                                <i className="fa-solid fa-house"> Home</i>
                            </NavLink>
                        </li>
                        <li className="list-item">
                            <i className="fa-solid fa-hashtag"> Explore</i>{" "}
                        </li>
                        <li className="list-item">
                            <NavLink to={`//${sessionUser.id}`} exact={true}>
                                <i className="fa-solid fa-user"> Profile</i>
                            </NavLink>
                        </li>
                        <li className="list-item">
                            <AboutModal />
                        </li>
                    </ul>
                    <li>
                        <LogOutModal user={sessionUser} />
                    </li>
                </div>
            </nav>
        </>
    );
};

export default ProfileNav;
