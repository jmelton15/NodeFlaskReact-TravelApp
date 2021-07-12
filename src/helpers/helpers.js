import {useHistory} from "react-router-dom";
import {v4 as uuid} from "uuid";

const GoToPage = () => {
    const history = useHistory();

    const getPage = (e) => {
        const page = e.target.id;
        history.push(page);
    }
    getPage();
}


const GetFromLocalStorage = (key) => {
    let value = JSON.parse(window.localStorage.getItem(key));
    return value;
}

const filterData = (dataObj) => {
    let filtered = {};
    for(let key in dataObj) {
        if(dataObj[key] && dataObj[key] !== "") {
            filtered[key] = dataObj[key];
        }
    }
    return !("password" in filtered) ? null : filtered;
}

const hasValue = (arrayOfObjects,key,value) => {
    let count = 0;
    arrayOfObjects.every((obj) => {
        if(obj[key] === value) {
            count++;
            return false;
        }
        return true;
    });
    return count > 0 ? true : false;
}

const iterateOverPlaces = (markerData) => {
    let placesArr = [];
    for(let place in markerData) {
        markerData[place].forEach((location) => {
            placesArr.push(location);
        })
    }
    return placesArr;
  }

// const getAvatarUrl = (userId,filename,token) => {
//     return `http://localhost:3001/users/${userId}/uploads/${filename}/${token}`;
// }

export {GoToPage,GetFromLocalStorage,filterData,hasValue,iterateOverPlaces};

