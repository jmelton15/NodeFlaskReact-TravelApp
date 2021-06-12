import axios from "axios";
import { GetFromLocalStorage } from "../helpers/helpers";
import {v4 as uuid} from "uuid";

const FLASK_BASE_URL = process.env.REACT_APP_FLASK_URL || "http://127.0.0.1:5000"


class FlaskApi {
    // token for access to api can be stored here
    static token;

    static async loginUser(username,password,csrfToken) {
        let res = await axios.post(`${FLASK_BASE_URL}/login`,{
            username,
            password
        },
        {headers:{"Access-Control-Allow-Credentials": true, "Access-Control-Allow-Origin":"*","anti-csrf-token":csrfToken}}
        )
        return res.data;
    }
}

export {FlaskApi};