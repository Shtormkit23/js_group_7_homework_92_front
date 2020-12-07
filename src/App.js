import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Container from "@material-ui/core/Container";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useSelector} from "react-redux";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import "./App.css";
import Chat from "./containers/Chat/Chat";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props} /> :
        <Redirect to={redirectTo} />;
};

const App = () => {
    const user = useSelector(state => state.users.user);
    return(
        <>
            <CssBaseline />
            <AppToolbar user={user} />
            <main>
                <Container>
                    <Switch>
                        <ProtectedRoute
                            path="/"
                            exact
                            component={Login}
                            isAllowed={!user}
                            redirectTo="/chat"
                        />

                        <ProtectedRoute
                            path="/chat"
                            exact
                            component={Chat}
                            isAllowed={user}
                            redirectTo="/login"
                        />
                        <ProtectedRoute
                            path="/register"
                            exact
                            component={Register}
                            isAllowed={!user}
                            redirectTo="/"
                        />
                        <ProtectedRoute
                            path="/login"
                            exact
                            component={Login}
                            isAllowed={!user}
                            redirectTo="/"
                        />
                    </Switch>
                </Container>
            </main>
        </>
    )};

export default App;
