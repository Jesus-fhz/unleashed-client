import React, { Component } from 'react';
import { Marker, GoogleMap, LoadScript } from '@react-google-maps/api';
import { get, post } from "../network/http";
import axios from 'axios'

const containerStyle = {
  // FIXME: how to change this responsively in css?
  width: window.innerWidth - 340,
  height: window.innerHeight
};


// TODO: change this to be a hook
class Map extends Component {

  state = {
    nearby_walkers: [],
    current_position: {lat: -33.8724235, lng: 151.2591179}, //TODO: make this updating whenever. 
  }
  
  componentDidMount() {
    this.getCurrentLocation();
    this.loadWalkers();
  }

  componentDidUpdate() {
    // this.loadWalkers()
  }
  
  getCurrentLocation() {
    
    
    let startPos; 
    
    let lat, lng;
    let promise =  new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition( function(position){
        lat = position.coords.latitude
        lng = position.coords.longitude
        resolve({lat, lng})
      })
    })
    
    promise.then(function(value){
      console.log('promise resolved coords', value.lat, value.lng);
      this.setState({lat: value.lat, lng: value.lng})
    })
    
    // this.setState({current_position: coords});

    // console.log({lat: -33.8724235, lng: 151.2591179});
    // console.log(this.state.current_position);
  }
  

  // Gets the walkers values
  async loadWalkers() {
    try{
      let res = await axios.get(`http://localhost:3000/users/find/${this.state.current_position.lat}/${this.state.current_position.lng}`);
      this.setState({nearby_walkers: res.data}); 
      
      console.log('The near by walkers are:', this.state.nearby_walkers);
    }catch (err){
      console.log('Nearby walkers AJAX ERROR:', err);
    }
  }
  
  render() { //TODO: get some locations that are around fairfield
    return (
      <div className="map">
        <LoadScript
          googleMapsApiKey="AIzaSyAm7vYw4jkC7m9hbEKpMfFxjwLAOZgxwko"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={this.state.current_position}
            zoom={13}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <Marker
            position={this.state.current_position}
            ></Marker>
            {
              this.state.nearby_walkers.map( (el, i) => <Marker
                key={i}
                icon="https://i.imgur.com/kEXCUkc.png?1"
                // onLoad={onLoad}
                // position={el.geocode_lat, el.geocode_lng}
                position={{lat: el.latitude, lng: el.longitude}}
                />
              )
            }
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}

// const Map = () => { //TODO: Plug in the actual to and from directions for the walker when they accept a job. NOTE: this just for showing the route to and from. 
//   return (
//     <div className="map">
//       <iframe
//           width="450"
//           height="250"
//           frameBorder="0"
//           style={{border:0}}
//           loading="lazy"
//           src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyAm7vYw4jkC7m9hbEKpMfFxjwLAOZgxwko&origin=-33.862477,150.951833&destination=-33.8724235,151.2591179&avoid=tolls|highways"
//           allowFullScreen>
//       </iframe>
//     </div>
//   )
// }

export default Map;