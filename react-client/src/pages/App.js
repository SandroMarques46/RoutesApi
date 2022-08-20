import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Home from "./home.js"
import RouteSelector from "./routeSelector.js"
import RouteDetails from "./routeDetails.js"
import Highlight from "./highlight"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/routes" element={<RouteSelector/>}/>
                <Route path="/routes/:id" element={<RouteDetails/>}/>
                <Route path="/highlight" element={<Highlight/>}/>
            </Routes>
        </BrowserRouter>
    )
}
