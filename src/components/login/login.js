import React from "react";
import sendData from "../../until/sendData";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styleLogin";
import Notification from "../notification/notification";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
const options = [
  "@gmail.com",
  "@outlook.com",
  "@yahoo.com",
  "@aol.com",
  "@hotmail.com",
  "@gmx.com",
  "@yandex.com",
  "@mail.com",
  "@lycos.com",
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginMaterial(props) {
  const
  [user, setUser] = React.useState(null),
  [password, setPassword] = React.useState(false),
    [redirect, setRedirect] = React.useState("login"),
    [name, setName] = React.useState(false),
    [lastName, setLastName] = React.useState(false),
    [email, setEmail] = React.useState(false),
    [firstPassword, setFirstPassword] = React.useState(false),
    [secondPassword, setSecondPassword] = React.useState(false),
    [phone, setPhone] = React.useState(false),
    [statusAu, setStatusAu] = React.useState(true),
    [alreadyRegister, setAlreadyRegister] = React.useState(false),
    [lowLevelSecurePass, setLowLevelSecurePass] = React.useState(false),
    [openN, setOpenN] = React.useState('Creado exitosamente');
    const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleChangeEmail = async (event) => {
    let data;
    const url = '/findEmail'
    data = JSON.stringify({
      correo: event.target.value,
    });
    if (event.target.value.length === 0) {
      setEmail("");
    } else {
      setEmail(event.target.value);
    }

    await sendData(data, url).then((data) => {
      if (data) {
        console.log('usuario registrado')
        setAlreadyRegister(true);
      } else {
        console.log('usuario no registrado')
        setAlreadyRegister(false);
      }
    });
  };
  const handleChangeFisrtPassword = (event) => {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (event.target.value.match(passw)) {
      setLowLevelSecurePass(false);
    } else {
      setLowLevelSecurePass(true);
    }
    setFirstPassword(event.target.value);
  };
  const handleChangeSecondPassword = (event) => {
    setSecondPassword(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handlechangelogin = (value) => {
    setRedirect(value);
  };
  const setLocal = async () => {
    const url = '/login'
    const data = JSON.stringify({
      correo: user,
      contra: password,
    });
    await sendData(data, url).then((response) => {
  
        if (!response) {
          setStatusAu(false);
        } else {
            localStorage.setItem("id", response.datos["_id"]);
            localStorage.setItem("user", String(response.datos["nombre"]));
            
            window.location.reload();
        }
      
    });
  };

  const setLocalRegister = () => {
    
    let data;
    const url = '/createUser'
    data = JSON.stringify({
        nombre: name,
        apellido: lastName,
        telefono: phone,
        correo: email,
        contra: firstPassword,
      });
    sendData(data, url).then((data) => {
        console.log(data)
      if (data) {
          console.log(data)
        setRedirect("login");
        
        setOpenN("Creado exitosamente");
        setTimeout(() => {
            setOpenN(false)
        }, 2000);
      } else {
        setOpenN("error servidor");
      }
    });
  };
  const loginForm =
    redirect === "login" ? (
      <div className={classes.paper}>
        <Typography
          onClick={() => window.location.reload()}
          style={{ cursor: "pointer" }}
          className="Logo2"
          component="h1"
          variant="h5"
        >
          SM
        </Typography>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className="Logo2" component="h1" variant="h5">
          Login
        </Typography>

        <form>
          <div>
            <TextField
              error={!statusAu}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              error={!statusAu}
              className="Pass"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={
                !statusAu ? "Usuario o Contraseña Incorrectos" : false
              }
              onChange={handleChangePassword}
            />
          </div>

    
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setLocal()}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item>
              <Link
                onClick={() => handlechangelogin("register")}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                {"No tienes una cuenta, registrate aquí..."}
              </Link>
            </Grid>
          </Grid>

          <Box mt={5}></Box>
        </form>
      </div>
    ) : null;
  const registerForm =
    redirect === "register" ? (
      <div className={classes.paper}>
        <Typography
          onClick={() => window.location.reload()}
          style={{ cursor: "pointer" }}
          className="Logo2"
          component="h1"
          variant="h5"
        >
          SM
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className="Logo2" component="h1" variant="h5">
          Registro
        </Typography>
        <form>
          <TextField
            error={name.length >= 25 || name.length === 0 ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombres"
            name="name"
            autoComplete="name"
            onChange={handleChangeName}
            inputProps={{ maxLength: 25 }}
            helperText={
              name.length >= 25 ? "Tienes un máximo de 25 letras" : null
            }
          />
          <TextField
            error={
              lastName.length >= 25 || lastName.length === 0 ? true : false
            }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Apellidos"
            name="lastName"
            autoComplete="additional-name"
            onChange={handleChangeLastName}
            inputProps={{ maxLength: 25 }}
            helperText={
              lastName.length >= 25 ? "Tienes un máximo de 25 letras" : null
            }
          />
          <TextField
            error={phone.length >= 10 || phone.length === 0 ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Teléfono"
            name="phone"
            autoComplete="tel"
            onChange={handleChangePhone}
            inputProps={{ maxLength: 10 }}
            helperText={
              phone.length >= 10 ? "Tienes un máximo de 10 numeros" : null
            }
          />
          
         
              <TextField
                fullWidth
                variant="outlined"
                error={
                  alreadyRegister || email.length >= 30 || email.length === 0
                }
                helperText={
                  alreadyRegister ? "El correo ya ha sido registrado." : null
                }
                label="Correo"
                
                
                id="outlined-adornment-weight"
                inputProps={{ maxLength: 80 }}
                onChange={handleChangeEmail}
               
                // aria-describedby="outlined-weight-helper-text"
              />
     
          <TextField
            error={
              lowLevelSecurePass ||
              firstPassword.length >= 30 ||
              firstPassword.length === 0
            }
            className="Pass"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangeFisrtPassword}
            helperText={
              lowLevelSecurePass
                ? "La contraseña debe tener entre 7 y 15 caracteres que contengan al menos un dígito numérico y un carácter especial"
                : null
            }
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            error={
              secondPassword.length >= 30 ||
              secondPassword.length === 0 ||
              (secondPassword && firstPassword !== secondPassword)
            }
            className="Pass"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Repite la contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={
              secondPassword && firstPassword !== secondPassword
                ? "Las contraseñas no coinciden"
                : null
            }
            onChange={handleChangeSecondPassword}
            inputProps={{ maxLength: 30 }}
          />
          {!name ||
    
          !lastName ||
          !phone ||
          !email ||
          !firstPassword ||
          !secondPassword ||
          alreadyRegister ||
          name.length === 0 ||
          lastName.length === 0 ||
          phone.length === 0 ||
          email.length === 0 ||
          lowLevelSecurePass ||
          firstPassword.length === 0 ||
          secondPassword.length === 0 ||
          (secondPassword && firstPassword !== secondPassword) ? null : (
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => setLocalRegister()}
            >
              Registrarse
            </Button>
          )}

          <Grid container>
            <Grid item>
              <Link onClick={() => handlechangelogin("login")} variant="body2">
                {"Ya tienes una cuenta?"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}></Box>
        </form>
      </div>
    ) : null;
  return (
    <>
      <Grid fullscreen container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {loginForm}
          {registerForm}
       
        </Grid>
      </Grid>
       {openN?(<Notification status={openN}/>):null}
    </>
  );
}
