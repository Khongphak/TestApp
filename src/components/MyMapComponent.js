
import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import _ from 'lodash';

const { 
  compose,
  withProps, 
  withState, 
  withHandlers,
  lifecycle 
 } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require('react-google-maps');

// const markers=[
//     { lat: 13.7563, lng: 100.5018 },
//     { lat: 13.5498, lng: 100.2741 },
//     { lat: 13.5991, lng: 100.5998 },
// ];

const Container = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 550;
`;

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyACtvMFbQlvoFOIuIIl1riC_8IY407ijoE&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <Container/>,
    mapElement: <div style={{ height: `100%`}} />
  }),
  withState('zoom', 'onZoomChange', 8),
  withHandlers(() => {
    const refs = {
      map: undefined
    };

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      onZoomChanged: () => () => {
        console.log(refs.map.getZoom());
        console.log(refs.map.getCenter());
      }
    };
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      console.log('From Map WillMount: ',this.props.StatePlace);
      this.setState({
        newDirections: [],
      });
    },
    componentDidUpdate(prevProps, prevState) {
      console.log('From Map DidUpdate: ',prevProps.StatePlace.Origin.location);
      if (prevProps.StatePlace !== this.props.StatePlace) {
           this.setState({
              directions: null,
          });
          this.drawRoutes();
      }
    },
    componentDidMount() {
      console.log('From Map DidMount: ',this.props.StatePlace);
      this.drawRoutes();
    },
    drawRoutes(){
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route({
        origin: _.get(this.props, 'StatePlace.Origin.location'),
        waypoints: _.get(this.props,'StatePlace.Waypoints'),
        destination: _.get(this.props, 'StatePlace.Destination.location'),
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props => (
  <GoogleMap
    defaultCenter={{ lat: 13.7563, lng: 100.5018 }}
    zoom={props.zoom}
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
  >
    <DirectionsRenderer 
      directions={props.directions}
      options={{
        polylineOptions: {
            strokeOpacity: 0.5,
            strokeColor: '#FF0000',
        }
      }}
    />
   
    {/* {
        markers.map((item,index)=>{
            return <Marker key={index} position={{ lat: item.lat, lng: item.lng }} />
        })
    } */}
     
    {/* <Polyline
        path={markers}
        options={{
            strokeColor: '#000000',
            strokeOpacity: 1,
            strokeWeight: 4,
            offset: '0%',
            icons: [
                {
                    strokeWeight: 2,
                    offset: '0%',
                    repeat: '35px'
                }
            ]
        }}
    /> */}
  </GoogleMap>
));

const mapStateToProps =(state)=>{
  return {
    StatePlace: state.result
  }
}

export default connect(mapStateToProps,null)(MyMapComponent);
