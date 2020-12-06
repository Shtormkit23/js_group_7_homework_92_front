import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {fbAppId} from "../../constants";
import {facebookLogin} from "../../store/actions/usersActions";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(0, 0, 2),
        borderColor: "#4C1E51",
        color: "#4C1E51"
    }
}));

const FacebookLogin = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const facebookResponse = response => {
        if (response.id) {
            dispatch(facebookLogin(response));
        }
    };

    return <FacebookLoginButton
        appId={fbAppId}
        fields="name,email,picture"
        render={renderProps => (
            <Button
                onClick={renderProps.onClick}
                variant={"outlined"}
                className={classes.submit}
            >
                Enter with Facebook
            </Button>
        )}
        callback={facebookResponse}
    />
};

export default FacebookLogin;