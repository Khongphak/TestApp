import React,{useState} from 'react'
import MapDistance  from 'google-distance-matrix';
// ใช้ direction API ได้มีทั้ง origin,destination, waypoints(ได้หลายตัว) ตอบโจทย์!!!
import _ from 'lodash';
function MainPage() {
    const initialValues = {
        StartFrom: "",
        EndAt: "",
      };
    const [values, setValues] = useState(initialValues);
    const [Distance, setDistance] = useState([])
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handlerClearResult=()=>{
        setDistance("")
        setValues(initialValues);
    }
    const getDistance =()=>{
        var origins = [values.StartFrom];
        var destinations = [values.EndAt];
        MapDistance.key('AIzaSyACtvMFbQlvoFOIuIIl1riC_8IY407ijoE');
        MapDistance.units('imperial');
        MapDistance.matrix(origins, destinations,function(err, distances){
            if (err) {
                return console.log(err);
            }
            if(!distances) {
                return console.log('no distances');
            }
            if (distances.status === 'OK') {
                let dataRows = _.get(distances,'rows');
                let dataElement = _.map(dataRows, 'elements')
                let distanceText = _.map(dataElement[0], 'distance.text')
                setDistance(distanceText);
                console.log('distances', distanceText)
                for (var i=0; i < origins.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        var origin = distances.origin_addresses[i];
                        var destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status === 'OK') {
                            var distance = distances.rows[i].elements[j].distance.text;
                            console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                            // setDistance(distances)
                        } else {
                            console.log(destination + ' is not reachable by land from ' + origin);
                        }
                    }
                }
            }if (distances.status === 'REQUEST_DENIED'){
                console.log('REQUEST_DENIEDDDDD')
            }
        } );
    }

// console.log(Distance);
    return (
        <div>
           
            <input 
                name="StartFrom"
                value={values.StartFrom} 
                onChange={handleInputChange} 
                label="StartFrom"
            />
            <input 
                name="EndAt"
                value={values.EndAt} 
                onChange={handleInputChange} 
                label="EndAt"
            />
            <button onClick={()=>getDistance()}>Find distance</button>
            <button onClick={()=>handlerClearResult()}>Clear</button>
            <h2>Start from</h2>
            <h4>{values.StartFrom}</h4>
            <h2>End at</h2>
            <h4>{values.EndAt}</h4>
            <h1>{Distance}</h1>
        </div>
    )
}

export default MainPage
