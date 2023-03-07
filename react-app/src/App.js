import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/Modals/Login/LoginForm";
import SignUpForm from "./components/Modals/SignUpModal/SignUpForm";
import NavBar from "./components/Nav/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Tweets from "./components/Tweet";
import ViewTweet from "./components/ViewTweet";
// import EditTweet from "./components/EditTweetModal/tweetForm";
import EditReply from "./components/Reply/editReply";
import TopNav from "./components/Nav/topNav";
import SplashPage from "./components/Splash";
import UserProfile from "./components/Profile";
import FollowingTweets from "./components/Tweet/FollowingTweets/followingTweets";
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
                <Route path="/" exact={true}>
                    <SplashPage />
                </Route>
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
                <Route path="/tweets" exact={true}>
                    <Tweets />
                </Route>
                <Route path="/tweets/:id" exact={true}>
                    <ViewTweet />
                </Route>
                <Route path="/users/:id/following" exact={true}>
                    <FollowingTweets />
                </Route>
                <Route path="/reply/:id" exact={true}>
                    <EditReply />
                </Route>
                <Route path="/user/:id" exact={true}>
                    <UserProfile />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
