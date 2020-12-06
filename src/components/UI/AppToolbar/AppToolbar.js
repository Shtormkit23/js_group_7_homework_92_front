import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import Container from "@material-ui/core/Container";
import AnonymousMenu from "../../Menu/AnonymousMenu";
import UserMenu from "../../Menu/UserMenu";
import image from "../../../assets/images/logo.png";

const useStyles = makeStyles(theme => ({
    mainLink: {
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
            color: "inherit"
        },
        marginTop: 10
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        display: "flex"
    },
    container: {
        display: "flex"
    },
    background: {
        background: "#4C1E51",
        height: 75,
        fontFamily: 'Open Sans',
        textTransform: "uppercase"
    },
    logo: {
        width: 60
    }
}));


const AppToolbar = ({user}) => {
    const classes = useStyles();
    return (
        <>
            <AppBar className={classes.background}>
                <Toolbar>
                    <Container className={classes.container}>
                        <Typography variant="h6" className={classes.title}>
                            <img src={image} className={classes.logo} alt={"img"}/>
                            <NavLink to="/" className={classes.mainLink}>Elven chat</NavLink>
                        </Typography>
                        {user ?
                            <UserMenu user={user}/>
                            : <AnonymousMenu/>
                        }
                    </Container>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;