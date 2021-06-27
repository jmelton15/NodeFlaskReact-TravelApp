import axios from "axios";
import { GoogleMap} from "@react-google-maps/api";

class GoogleApi {
    DirectionsService = new window.google.maps.DirectionsService();

    static async getRouteDirections(origin,destination) {
        let routeData = await this.DirectionsService.route(
            {
                origin:origin,
                destination:destination,
                optimizeWaypoints:true,
                travelMode: "DRIVING"
            }
        );
        console.log(routeData);
    }
}

export {GoogleApi}

