import axios from "axios";
import { GetFromLocalStorage } from "../helpers/helpers";
import {v4 as uuid} from "uuid";
import defaultImg from "../Images/default_trip.jpg";

const FLASK_BASE_URL = process.env.REACT_APP_FLASK_URL || "http://127.0.0.1:5000"


class FlaskApi {
    // token for access to api can be stored here
    static token;

    static getTokenFromLS(){
        this.token = GetFromLocalStorage("token");
    }

    static async loginUser(username,password) {
        
        let res = await axios.post(`${FLASK_BASE_URL}/login`,{
            username,
            password
        });
        return res.data;
    }

    static async registerUser(username,email,password) {
        
        let res = await axios.post(`${FLASK_BASE_URL}/register`,{
            username,
            email,
            password
        })
        return res.data; 
    }

    static async createTrip(startLocation,endLocation,waypoints,region,userId) {
        this.getTokenFromLS();
        let tripData = await axios.post(`${FLASK_BASE_URL}/users/${userId}/trip`,{
            startLocation,
            endLocation,
            waypoints,
            region
        },{
            headers:{
                Authorization:this.token
            }
        })
        console.log(tripData)
        console.log(tripData.data.data)
        return tripData.data.data;
    }

    static async saveTrip(startLocation,endLocation,waypointData,userId) {
        let res = await axios.post(`${FLASK_BASE_URL}/users/${userId}/trip/save`,{
            startLocation,
            endLocation,
            waypointData,
            photo:defaultImg,
            userId
        },{
            headers:{
                Authorization:this.token 
            }
        })
        console.log(res.data)
        return res.data.response;
    }

    static async getTrips(userId,cancelToken) {
        this.getTokenFromLS();
        // const headers = {
        //     'Authorization':this.token
        // }
        let savedTrips = await axios.get(`${FLASK_BASE_URL}/users/${userId}/trips/saved`,{
            headers:{
                Authorization:this.token
            },
        })
        console.log(savedTrips)
        return savedTrips.data.saved_trips;
    }
}

export {FlaskApi};