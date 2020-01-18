import React, { useState, useEffect } from "react";


import  Cardata from "./data/csvjson.json";

import {

  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker, 
  InfoWindow
} from "react-google-maps";

function Map() {
const [slectedCar, setSlectedCar]=useState(null);

  return (
    <GoogleMap
      defaultZoom={5} 
   defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
  
     >
     {Cardata.features.map(data=>(
     
 <Marker   
          key={data.deviceId} 
        
          position= {{
                     // lat: (data.LAT_LON.split(","))[0],
                     // lng: (data.LAT_LON.split(","))[1]
                    lat:data.LAT_LON[0],
                    lng:data.LAT_LON[1]
                     }}
               onClick={()=>{
            
                 setSlectedCar(data)
                
               }}      
                     
             />  

     ))}

     {slectedCar&&( 
       <InfoWindow
           position= {{
        
                    lat:slectedCar.LAT_LON[0],
                    lng:slectedCar.LAT_LON[1]
                     }}
                     onCloseClick={()=>{
                       setSlectedCar(null);
                     }}
             >
               <div>
                 <h2>{slectedCar.deviceId}</h2>
                 </div>

                  
                    
       </InfoWindow>
     )}

  </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "200vw", height: "200vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB0IgueBiqW7T25Rv7mcQi2AfUc4SGbEQ0 `}
        loadingElement={<div style={{ height: `200%` }} />}
        containerElement={<div style={{ height: `200%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}