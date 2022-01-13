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
import { Link, Route } from 'react-router-dom';
import validator from 'validator';

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

async function registerUser(dataUser) {
  return fetch('https://mvn-task-manager.work/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataUser)
  })
    .then(data => data.json())
}

export default function Register() {
  const classes = useStyles();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [disabledSignUp, setDisabledSignUp] = useState(false);

  // const validatePassword = (value) => {
  //   if(validator.isStrongPassword(value, {
  //     minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1
  //   })) {    
  //     return true;
  //   }
  //   else{
  //     return false;
  //     setDisabledSignUp(true);
  //   }
  // }

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await registerUser({
      username,
      password,
    });
    if ('role' in response) {
      swal("Registration successful!", {
        buttons: false,
        timer: 2000,
      })
      .then(() => {
        window.location.href = "/login";
      });
    } else {
      swal("Registration failed!", response.message, "error");
    }
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
            {/* {validatePassword(password) && (
              // setDisabledSignUp(true);
              <p>Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số</p>
            )} */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // disabled = {disabledSignUp}
            >
              Sign Up
            </Button>
          </form>
          {/* <Link to="/login">Sign In here!</Link> */}
        </div>
      </Grid>
    </Grid>
  );
}