import { Redirect } from "react-router";

/**
 * 
 * @param {function} setUsername 
 * @param {function} setToken
 * @param {function} setUserData
 * 
 * In charge of resetting the state and localstorage by using the set functions for each of the three params
 */
const Logout = ({setUser,setMarkers,setToken,setTripData}) => {
    localStorage.clear();
    setUser({})
    setMarkers([])
    setToken(null)
    setTripData([])

    return (
        <Redirect to="/" />
    )
}

export default Logout;