import React from 'react';
import {Route, Switch} from "react-router-dom";
import Container from "@material-ui/core/Container";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useSelector} from "react-redux";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import "./App.css";
import Chat from "./containers/Chat/Chat";


const App = () => {
    const user = useSelector(state => state.users.user);
    return(
        <>
            <CssBaseline />
            <AppToolbar user={user} />
            <main>
                <Container>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/chat" exact component={Chat} />
                        <Route path="/register" exact component={Register} />
                    </Switch>
                </Container>
            </main>
        </>
    )};

export default App;
