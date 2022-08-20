import {React, useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import HighlightDetail from "../components/HighlightDetail"

export default function RouteDetails() {
    const [info, setInfo] = useState(null)
    const {state} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (state != null) {
            setInfo(state.info)
        } else {
            navigate('/')
        }
    }, [state, navigate])

    return (
        <div>
            {info &&
                <>
                    <HighlightDetail highlight={info.highlight}/>
                    <li>Distance - {info.distance} meters</li>
                </>
            }
        </div>
    )
}
