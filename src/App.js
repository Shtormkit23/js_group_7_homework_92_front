import React from 'react';
import {Route, Switch} from "react-router-dom";
import Container from "@material-ui/core/Container";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useSelector} from "react-redux";

const App = () => {
    const user = useSelector(state => state.users.user);
    return(
        <>
            <CssBaseline />
            <AppToolbar user={user} />
            <main>
                <Container>
                    <Switch>
                        <Route path="/" exact component={AppToolbar} />
                    </Switch>
                </Container>
            </main>
        </>
    )};

export default App;
