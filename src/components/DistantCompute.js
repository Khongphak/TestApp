import React,{useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import MapDistance  from 'google-distance-matrix';
import _ from 'lodash';

function DistantCompute() {
    const DataForCompute = state=>state.DataForCompute;
    const ReadyToCompute = state=>state.ReadyToCompute;
    const valueForCompute = useSelector(DataForCompute);
    const CheckToCompute = useSelector(ReadyToCompute);

    let DistanceArray=[];
    const [DistantLists, setDistantLists] = useState([]);
    console.log('DistantLists1',DistantLists);
    
    const getDistance =(og,dt)=>{
        let origins = [og];
        let destinations = [dt]; 
        let ExtractNumber;
        MapDistance.key('AIzaSyACtvMFbQlvoFOIuIIl1riC_8IY407ijoE');
        MapDistance.units('metric');
        MapDistance.matrix(origins, destinations,function(err, distances){
            if (err) {
                console.log(err);
            }
            if(!distances) {
                console.log('no distances');
            }
            if (distances.status === 'OK') {
                let distance = distances.rows[0].elements[0].distance.text;
                ExtractNumber = distance.split(' ')
                DistanceArray.push(ExtractNumber[0]);
                setTimeout(() => {
                    setDistantLists(DistanceArray);
                }, 1000);
                
            }if (distances.status === 'REQUEST_DENIED'){
                console.log('REQUEST_DENIEDDDDD')
            }
        } );
        
    }
    
    const ComputeFunc =()=>{
        for(let i=0;i<valueForCompute.length-1;i++){
            getDistance(valueForCompute[i],valueForCompute[i+1])      
        }
    }

    useEffect(() => {
        ComputeFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CheckToCompute]);

    const RenderDistant =()=>{
        let NumberArray = DistantLists.map((item)=>Number(item))
        let SumDistance =  _.sum(NumberArray);
        // console.log('DistantLists',DistantLists);
        return  <h1>Total {SumDistance} KM</h1>
    }

    return (
        <div>
           {RenderDistant()}
        </div>
    )
}

export default DistantCompute
