import {React, useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import HighlightDetail from "../components/HighlightDetail"

export default function RouteDetails() {
    const [route, setRoute] = useState(null)
    const {state} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (state != null) {
            setRoute(state.route)
            console.log(state.route)
        } else {
            navigate('/')
        }
    }, [state, navigate])

    return (
        <div>
            {route &&
                <>
                    <h3>{route.description}</h3>
                    <div>
                        {route.highlights.length !== 0 && route.highlights.map(hl => {
                            return (
                                <HighlightDetail highlight={hl}/>
                            )
                        })}
                    </div>
                </>
            }
        </div>
    )
}
