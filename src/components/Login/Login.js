import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import Register from '../Register/Register';
import { Link, Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://assets.topdev.vn/images/2020/12/21/MonstarLab-8U0us.png)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function loginUser(dataUser) {
  const response = fetch('https://mvn-task-manager.work/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataUser)
  })
    .then(data => data.json())
    // console.log(response);
    return response;
 }

export default function Login() {
  const classes = useStyles();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    // const tokenGot = response.token;
    if ("token" in response) {
        console.log(response)
      swal("Sign in successful!", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('token', response['token']);
        localStorage.setItem('username', JSON.stringify(response['username']));
        window.location.href = "/profile";
      });
    } else {
        // console.log(response);
      swal("Failed", response.message, "error");
    }
  }

  return (
    <div>
        <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={e => setUserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* <Link to="/" component={Register}>Register</Link> */}
          </form>
        </div>
      </Grid>
    </Grid>
    {/* <Link to="./Register">Register</Link> */}
    {/* <Redirect to="/register">Register</Redirect> */}
    {/* Fix link to sign up */}
    </div>
    
  );
}