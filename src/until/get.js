
const getData=async(url)=>{

  const dirSolve =  `https://www.zipcodeapi.com/rest/FmZssgT290OJYfl04zz7w5aoLTZqmkEd3FQv6KGDnVDEIBPrC3EVsSVMAJZiYLwM${url}`
    
  try {
    const response = await fetch(dirSolve, {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://www.zipcodeapi.com/',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      }   
  });
  console.log(response)
  if (response.ok){
    const json = await response.json()
    return json
  }
  } catch (error) {
    console.log('envio falso')
    return false
  }

    
   
 
}
export default getData