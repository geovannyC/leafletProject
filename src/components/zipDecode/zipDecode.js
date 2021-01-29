import React from "react";
import Button from "@material-ui/core/Button";
import getData from "../../until/get";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import sendData from "../../until/sendData";
import Notification from "../notification/notification";
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
});
export default function ZipDecode(props) {
  const [distance, setDistance] = React.useState(false),

  [city, setCity]  =React.useState(""),
  [city2, setCity2]  =React.useState(""),
  [state, setState] =React.useState(""),
  [state2, setState2] =React.useState(""),
    [status, setStatus] = React.useState(false),
    [total, setTotal] = React.useState(false),
    [toll, setToll] = React.useState(false),
    [pricePerKm, setPricePerKm] = React.useState(false),
    [delay, setDelay] = React.useState(false),
    [counter, setCounter] = React.useState(60),
    [arriveSameDay, setArriveSameDay] = React.useState(false),
    [openN, setOpenN] = React.useState();
  const classes = useStyles();
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  const priceKmFun =async (value) =>{
    const tollSolve = value>=100?parseFloat(Number((Math.round(value/100)*0.25).toFixed(2))):false
    const priceKm =  Number(( value*0.20).toFixed(2))
    const Ctotal =  !tollSolve?priceKm:tollSolve+priceKm
    const timeDelaySameDay =  Number(value/250).toFixed(2)*1000
  
    let hours =  Math.floor((timeDelaySameDay / 60) % 60);
    hours =  Number((hours < 10)? '0' + hours : hours);
    let minutes =  timeDelaySameDay % 60;
    minutes =  Number((minutes < 10)? '0' + minutes : minutes);

    if( value>250){
        setDelay(Math.round( timeDelaySameDay/1000))
        setArriveSameDay(false)
    }else{
        if(timeDelaySameDay<=100)
        {
            setDelay({
                hours: 1,
                minutes: 0
            })
            setArriveSameDay(true)
        }else{
            setDelay({
                hours: hours,
                minutes: minutes
            })
            setArriveSameDay(true)
        }
    }
   
   
   
  
      
      setPricePerKm(priceKm)
      setToll(tollSolve)
      setTotal(Ctotal)
      
   setStatus('success')
 
   
    

    }
    
  const getDistance = () => {
    const url = `/distance.json/${props.zip1}/${props.zip2}/km`;
    getData(url).then(async(response) => {
      if (response) {
        setDistance(Math.round(response.distance) );
       priceKmFun(Math.round(response.distance) )
        
       
        
       
        console.log(JSON.stringify(response));
      } else {
        setStatus("error");
        console.log('error')
      }
    });
    const urlzip = `/info.json/${props.zip1}/degrees`
    const urlzip2 = `/info.json/${props.zip2}/degrees`
    getData(urlzip).then((response)=>{
      if(response.city){
        setCity(response.city)
        setState(response.state)
      }else{
        setCity('No info')
        setState('No info')
      }
    })
    getData(urlzip2).then((response)=>{
      if(response.city){
        setCity2(response.city)
        setState2(response.state)
      }else{
        setCity2('No info')
        setState2('No info')
      }
    })
  };
  const appendTime = (date)=>{
    date.setMinutes(date.getMinutes()+delay.minutes)
    date.setHours(date.getHours()+delay.hours-5)
    return date
  }
const appendDays= (date, days)=>{
  date.setDate(date.getDate()+days)
  return date
}
const makeOrderFn = () =>{
  const url = '/ordenarpedido'
  let data = {
    usuario: localStorage.getItem('id'),
    costo: pricePerKm,
    estado: 'pendiente',
    ciudadsalida: city,
    ciudadllegada: city2,
    estadosalida: state,
    estadollegada: state2
  }
  if(arriveSameDay){
    const date = new Date()
    data.fechaArribo=appendTime(date)
    console.log(JSON.stringify(date) )
  }else{
    
    const date = new Date()
    
    data.fechaArribo=appendDays(date, delay)
  }
  sendData(JSON.stringify(data) , url).then((response)=>{
    console.log(response)
    if(response){
      setOpenN('Creado exitosamente')
      setTimeout(() => {
        setOpenN(false)
      }, 2000);
    }else{
      setOpenN('error servidor')
      setTimeout(() => {
        setOpenN(false)
      }, 2000);
    }
  })
  console.log(data)
}
  const StatusMessage = () => {
    if (status === "success" ) {
      return (
          <div>
           
        <Typography variant="h5" gutterBottom>
          {`La distancia que recorrerá tu pedido es de ${distance} kms`}
        </Typography>
        {toll?<Typography>
            {`Costo ${toll/0.25} peaje${toll>0.25?'s':''}: $${toll}`}
        </Typography>:null}
        
        <Typography>
            {`Costo por ${distance} Kilometro${distance>1?'s':''}: $${pricePerKm}`}
        </Typography>
        <Typography>
            {`Costo Total: $${ total}`}
        </Typography>
        <Typography>
            {`Tu pedido llegará en: `}{arriveSameDay?`${delay.hours} hora${delay.hours>1?'s':''} ${delay.minutes>0?`y ${delay.minutes} minuto${delay.minutes>1?'s':''}`:''}`:`${delay} dia${delay>1?'s':''}`}
        </Typography>
        <Typography variant="subtitle1"> 
              {`Pedido desde ${city} en el estado de ${state}`}
            </Typography>
            <Typography variant="subtitle1"> 
              {`Destino del pedido ${city2} en el estado de ${state2}`}
            </Typography>
        <Button variant="contained" color="primary" onClick={makeOrderFn}>
          Realizar Pedido
        </Button>
        </div>
      );
    } else if (status === "error") {
      return (<Typography>Los códigos postales no son correctos</Typography>);
    }else{
        return null
    }
  };
  return (
    <div style={{marginBlock:5}}>
      <Button   variant="contained" color="primary" onClick={()=>getDistance()}>Consultar Pedido</Button>
   
      <StatusMessage />
      <Notification status={openN}/>
    </div>
  );
}
