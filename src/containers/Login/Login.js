import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormElement from "../../components/UI/Form/FormElement";
import Alert from '@material-ui/lab/Alert';
import {loginUser} from "../../store/actions/usersActions";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#4C1E51",
        opacity: 0.9
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#4C1E51",
        color: "white"
    },
    alert: {
        marginTop: theme.spacing(3),
        width: "100%"
    },
    main: {
        backgroundColor: "white",
        borderRadius: 15
    },
    link: {
        color: "#4C1E51",
        textTransform: "uppercase"
    }
}));

const Login = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const error = useSelector(state => state.users.loginError);
    const dispatch = useDispatch();

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const formSubmitHandler = e => {
        e.preventDefault();
        dispatch(loginUser({...state}));
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.main}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={formSubmitHandler}
                >
                    <Grid container spacing={2}>
                        <FormElement
                            name="username"
                            label="Enter username or email"
                            required={true}
                            value={state.username}
                            onChange={inputChangeHandler}
                        />
                        <FormElement
                            name="password"
                            label="Password"
                            type="password"
                            required={true}
                            value={state.password}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <FacebookLogin/>
                    {
                        error && <Alert
                            severity="error"
                            className={classes.alert}
                        >
                            {error.error}
                        </Alert>
                    }
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2" className={classes.link}>
                                Or sign up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;