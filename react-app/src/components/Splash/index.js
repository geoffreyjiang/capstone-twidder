import React from "react";
import LoginModal from "../Modals/Login/LoginModal";
import SignUpModal from "../Modals/SignUpModal/SignUpModal";
import { login } from "../../store/session";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
const SplashPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    if (user) {
        return <Redirect to="/tweets" />;
    }
    return (
        <>
            <div className="splash-container">
                <div className="splash-img-container">
                    {/* <div className="splash-img">
                        <img
                            src="https://images.unsplash.com/photo-1617653017137-7f8ceffe96af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJsdWUlMjBiaXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="img"
                        ></img>
                    </div> */}
                </div>
                <div className="splash-things">
                    <i className="fa-brands fa-twitter fa-3x"></i>

                    <h1>Welcome to Twidder!</h1>
                    <h2>Whats Goin On?</h2>
                </div>
                <div className="splash-buttons">
                    <LoginModal />
                    <SignUpModal />
                    <button
                        onClick={async (e) => {
                            const credential = "demo@aa.io";
                            const password = "password";
                            // history.push("/");
                            const data = await dispatch(
                                login(credential, password)
                            );
                            // if (data) history.push("/tweets");
                        }}
                    >
                        Demo Login
                    </button>
                </div>
            </div>
        </>
    );
};

export default SplashPage;
