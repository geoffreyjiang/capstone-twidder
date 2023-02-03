import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Nav/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Tweets from "./components/Tweet";
import ViewTweet from "./components/ViewTweet";
import EditTweet from "./components/EditTweetModal/tweetForm";
import EditReply from "./components/Reply/editReply";
function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path="/users" exact={true}>
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute>
                <Route path="/" exact={true}>
                    <Tweets />
                </Route>
                <Route path="/tweets/:id" exact={true}>
                    <ViewTweet />
                </Route>
                <Route path="/tweets/:id/edit" exact={true}>
                    <EditTweet />
                </Route>
                <Route path="/reply/:id/" exact={true}>
                    <EditReply />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
