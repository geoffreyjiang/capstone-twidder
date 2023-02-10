import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./signup.css";
const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [bio, setBio] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = dispatch(
                signUp(
                    username,
                    email,
                    password,
                    firstName,
                    lastName,
                    profilePic,
                    bio
                )
            );
            console.log(data);
            // if (data) {
            //     setErrors(data);
            // }
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };
    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const updateLastName = (e) => {
        setLastName(e.target.value);
    };
    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="signup-form">
            <form onSubmit={onSignUp}>
                {/* <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div> */}
                <div>
                    <label>User Name</label>
                    <input
                        type="text"
                        name="username"
                        onChange={updateUsername}
                        value={username}
                    ></input>
                </div>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first-name"
                        onChange={updateFirstName}
                        value={firstName}
                    ></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last-name"
                        onChange={updateLastName}
                        value={lastName}
                    ></input>
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={updateEmail}
                        value={email}
                    ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={updatePassword}
                        value={password}
                    ></input>
                </div>
                <div>
                    <label>Repeat Password</label>
                    <input
                        type="password"
                        name="repeat_password"
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                    ></input>
                </div>
                <div>
                    <label>Profile Image</label>
                    <input
                        type="text"
                        name="profilePic"
                        onChange={(e) => setProfilePic(e.target.value)}
                        value={profilePic}
                        placeholder="optional"
                    ></input>
                </div>
                <div>
                    <label>Biography</label>
                    <input
                        type="text"
                        name="bio"
                        placeholder="optional"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                    ></input>
                </div>
                <button className="signup-btn" type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
