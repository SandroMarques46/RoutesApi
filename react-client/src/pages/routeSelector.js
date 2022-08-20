import {React, useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom"

export default function RouteSelector() {
    const [routes, setRoutes] = useState(null)
    const {state} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (state != null) {
            setRoutes(state.routes)
        } else {
            navigate('/')
        }
    }, [state, navigate])

    function showRouteDetails(route) {
        const id = route.id

        navigate(`/routes/${id}`, {
            state: {
                route
            }
        })
    }

    return (
        <div>
            {routes &&
                <>
                    <h2>Number of possible routes found : {routes.length}</h2>
                    {routes.map(route => {
                        return (
                            <div>
                                <h3>{route.description}</h3>
                                <p>Start : {route.start_latitude} , {route.start_longitude} ; End : {route.end_latitude} , {route.end_longitude} </p>
                                {route.highlights.length !== 0 && route.highlights.map(hl => {
                                    return (
                                        <li>{hl.name}</li>
                                    )
                                })}
                                <button onClick={() => showRouteDetails(route)}>Click here to view details</button>
                            </div>
                        )
                    })}
                </>
            }
        </div>
    )
}
