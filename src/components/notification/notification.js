import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import MuiAlert from '@material-ui/lab/Alert';
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function GrowTransition(props) {
  return <Grow {...props} />;
}

export default function Notification(props) {
  const [state, setState] = React.useState({
    open: true,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
if(props.status==="Creado exitosamente"){
    return (
        <div>
    
          <Snackbar
            open={props.status}
          
            TransitionComponent={state.Transition}
           
            key={state.Transition.name}
          >
                 <Alert onClose={handleClose} severity="success">
              Generado ecitosamente
            </Alert>
          </Snackbar>
        </div>
      );
}else if(props.status==='error servidor'){
    return (
        <div>
          <Snackbar
            open={props.status}
      
            TransitionComponent={state.Transition}
           
            key={state.Transition.name}
          >
                 <Alert severity="error">Error</Alert>
          </Snackbar>
        </div>
      );
}else{
    return null
}

}
