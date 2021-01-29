import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DrawerNav from "./drawer";
import ZipDecode from "../zipDecode/zipDecode";
import Login from "../login/login";
import getData from "../../until/get";
import ListOrders from "../list/list";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  rootInput: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Nav() {
  const [open, setOpen] = React.useState(false),
    [zip1, setZip1] = React.useState(""),
    [zip2, setZip2] = React.useState(""),
    [city, setCity] = React.useState(""),
    [city2, setCity2] = React.useState(""),
    [state, setState] = React.useState(""),
    [state2, setState2] = React.useState(""),
    [openZip2Text, setOpenZip2Text] = React.useState(false),
    [openZipText, setOpenZipText] = React.useState(false),
    [redirect, setRedirect] = React.useState("zipcode");
  const classes = useStyles();

  const listEvent = (item) => {
    setRedirect(item);
  };

  const onChangeZip1 = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");

    setZip1(onlyNums);
  };
  const onChangeZip2 = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");

    setZip2(onlyNums);
  };
  const handleChangedataCity = (e) => {
    setCity(e.target.value);
  };
  const handleChangedataCity2 = (e) => {
    setCity2(e.target.value);
  };
  const handleChangedataState = (e) => {
    setState(e.target.value);
  };
  const handleChangedataState2 = (e) => {
    setState2(e.target.value);
  };
  const ZipDecodeComponent = () => {
    if (zip1.length === 0 || zip2.length === 0) {
      return null;
    } else {
      return <ZipDecode zip1={zip1} zip2={zip2} />;
    }
  };
  const getZipCodes = () => {
    const url = `/city-zips.json/${city}/${state}`;
    const url2 = `/city-zips.json/${city2}/${state2}`;
    getData(url).then((response) => {
      if (response.zip_codes.length !== 0) {
        setZip1(response.zip_codes[0]);
        setOpenZipText(true);
      } else {
        setZip1("no found city");
      }
    });
    getData(url2).then((response) => {
      if (response.zip_codes.length !== 0) {
        setZip2(response.zip_codes[0]);
        setOpenZip2Text(true);
      } else {
        setZip2("no found city");
      }
    });
  };
  const logOut = ()=>{
    localStorage.removeItem('id')
    localStorage.removeItem('user')
    window.location.reload()
  }
  if (!localStorage.getItem("id")) {
    return <Login />;
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <DrawerNav item={listEvent} />
            </IconButton>
            <Typography letiant="h6" className={classes.title}>
              APP ZIPCODES
            </Typography>
            <Button color="inherit" onClick={logOut}>Cerrar sesión</Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ minHeight: "70vh", marginTop: 8 }}
        >
          {redirect === "zipcode" ? (
            <div>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item>
                    <TextField
                      id="outlined-basic"
                      label="Código postal 1"
                      variant="outlined"
                      onChange={onChangeZip1}
                      value={zip1}
                      inputProps={{ maxLength: 15 }}
                      className={classes.rootInput}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-basic"
                      label="Código postal 1"
                      variant="outlined"
                      onChange={onChangeZip2}
                      value={zip2}
                      className={classes.rootInput}
                      inputProps={{ maxLength: 15 }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <ZipDecodeComponent zip1={zip1} zip2={zip2} />
              </Grid>
            </div>
          ) : redirect === "bystate" ? (
            <div>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item>
                    <TextField
                      error={zip1 === "no found city"}
                      helperText={
                        zip1 === "no found city"
                          ? "ingresa una ciudad válida"
                          : null
                      }
                      id="outlined-basic"
                      label="Cuidad salida"
                      variant="outlined"
                      onChange={handleChangedataCity}
                      value={city}
                      inputProps={{ maxLength: 15 }}
                      className={classes.rootInput}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      error={zip1 === "no found city"}
                      helperText={
                        zip1 === "no found city"
                          ? "ingresa un código de estado válido"
                          : null
                      }
                      id="outlined-basic"
                      label="Estado"
                      variant="outlined"
                      onChange={handleChangedataState}
                      value={state}
                      inputProps={{ maxLength: 15 }}
                      className={classes.rootInput}
                    />
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid item>
                    <TextField
                      error={zip2 === "no found city"}
                      helperText={
                        zip2 === "no found city"
                          ? "ingresa una ciudad válida"
                          : null
                      }
                      id="outlined-basic"
                      label="Cuidad Destino"
                      variant="outlined"
                      onChange={handleChangedataCity2}
                      value={city2}
                      inputProps={{ maxLength: 15 }}
                      className={classes.rootInput}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      error={zip2 === "no found city"}
                      helperText={
                        zip2 === "no found city"
                          ? "ingresa un código de estado válido"
                          : null
                      }
                      id="outlined-basic"
                      label="Estado Destino"
                      variant="outlined"
                      onChange={handleChangedataState2}
                      value={state2}
                      inputProps={{ maxLength: 2 }}
                      className={classes.rootInput}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Typography>
                {zip1 && city && state && openZipText
                  ? `Código postal de ${city}: ${zip1}`
                  : null}
              </Typography>
              <Typography>
                {zip2 && city2 && state2 && openZip2Text
                  ? `Código postal de ${city2}: ${zip2}`
                  : null}
              </Typography>
              {city && city2 && state && state2 ? (
                <div style={{ marginBlock: 5 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={getZipCodes}
                  >
                    Consultar codigos postales
                  </Button>
                </div>
              ) : null}
              {zip1 && zip2 && city && city2 && state && state2 ? (
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <ZipDecodeComponent />
                </Grid>
              ) : null}
            </div>
          ) : redirect==='list'?(<ListOrders/>):null}
        </Grid>
      </div>
    );
  }
}
