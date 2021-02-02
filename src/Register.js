import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import history from "./history";
const axios = require("axios");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://www.eelu.edu.eg/">
        National Egyptian E-Learning University
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                error={firstNameError}
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => {
                  if (e.target.value === "") {
                    setFirstNameError(true);
                  } else {
                    setFirstNameError(false);
                    setFirstName(e.target.value);
                  }
                }}
                onBlur={() => {
                  if (firstName === "") {
                    setFirstNameError(true);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={lastNameError}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setLastNameError(true);
                  } else {
                    setLastNameError(false);
                    setLastName(e.target.value);
                  }
                }}
                onBlur={() => {
                  if (lastName === "") {
                    setLastNameError(true);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={emailError}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setEmailError(true);
                  } else {
                    setEmailError(false);
                    setEmail(e.target.value);
                  }
                }}
                onBlur={() => {
                  if (email === "") {
                    setEmailError(true);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={passwordError}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setPasswordError(true);
                  } else {
                    setPasswordError(false);
                    setPassword(e.target.value);
                  }
                }}
                onBlur={() => {
                  if (password === "") {
                    setPasswordError(true);
                  }
                }}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (email && password && firstName && lastName) {
                  axios.create({ baseURL: window.location.origin });
                  axios
                    .post("/api/user/register", {
                      email,
                      password,
                      firstName,
                      lastName,
                    })
                    .then(function (response) {
                      console.log(response);
                      history.push("/dashboard");
                    })
                    .catch(function (error) {
                      console.log(error);
                    if (
                      error.message === "Request failed with status code 409"
                    ) {
                      setErrorMessage("Email already exists.");
                      setAuthError(true);
                      setEmailError(true);
                      setPassword(true);
                    } else {
                      setErrorMessage("An error occured. Please try again.");
                    }
                    });
                } else {
                  setErrorMessage("Please fill all required fields.");
                  setAuthError(true);
                }
              }}
            >
              Register
            </Button>
            <Dialog
            open={authError}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setAuthError(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Error"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {errorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAuthError(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => history.push("/login")}
                >
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
