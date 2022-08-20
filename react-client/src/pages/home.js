import {React, useRef} from 'react'
import {useNavigate} from "react-router-dom"

export default function Home() {
    const refs = useRef([])
    const navigate = useNavigate()

    function findRoutes(e) {
        e.preventDefault()
        const startLatitude = refs.current[`startLatitude`].value
        const startLongitude = refs.current[`startLongitude`].value
        const endLatitude = refs.current[`endLatitude`].value
        const endLongitude = refs.current[`endLongitude`].value

        const queryString = `?start_latitude=${startLatitude}&start_longitude=${startLongitude}&end_latitude=${endLatitude}&end_longitude=${endLongitude}`

        fetch("http://localhost:3001/routes" + queryString)
            .then(resp => resp.json())
            .then(json => {
                navigate('/routes', {
                    state: {
                        routes: json.routes
                    }
                })
            })
    }

    function findHighlight(e) {
        e.preventDefault()
        const latitude = refs.current[`highlightLatitude`].value
        const longitude = refs.current[`highlightLongitude`].value

        const queryString = `?latitude=${latitude}&longitude=${longitude}`

        fetch("http://localhost:3001/highlight" + queryString)
            .then(resp => resp.json())
            .then(json => {
                navigate('/highlight', {
                    state: {
                        info: json
                    }
                })
            })
    }

    return (
        <div>
            <h3>Enter the start and end position of your road trip!</h3>
            <br/>
            <label>Start Latitude</label>
            <input type="text" placeholder="Start Latitude"
                   defaultValue="38.695945"
                   ref={elem => refs.current[`startLatitude`] = elem}/>
            <label>Start Longitude</label>
            <input type="text" placeholder="Start Longitude"
                   defaultValue="-9.430056"
                   ref={elem => refs.current[`startLongitude`] = elem}/>
            <br/>
            <label>End Latitude</label>
            <input type="text" placeholder="End Latitude"
                   defaultValue="38.687659"
                   ref={elem => refs.current[`endLatitude`] = elem}/>
            <label>End Longitude</label>
            <input type="text" placeholder="End Longitude"
                   defaultValue="-9.344317"
                   ref={elem => refs.current[`endLongitude`] = elem}/>
            <br/>
            <button onClick={(e) => findRoutes(e)}>Find routes</button>
            <br/>
            <h3>Or find the nearest highlight to a certain position!</h3>
            <label>Latitude</label>
            <input type="text" placeholder="Latitude"
                   defaultValue="38.695945"
                   ref={elem => refs.current[`highlightLatitude`] = elem}/>
            <label>Longitude</label>
            <input type="text" placeholder="Longitude"
                   defaultValue="-9.430056"
                   ref={elem => refs.current[`highlightLongitude`] = elem}/>
            <button onClick={(e) => findHighlight(e)}>Find highlight</button>
        </div>
    )
}
