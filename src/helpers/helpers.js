import {useHistory} from "react-router-dom";

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

export {GoToPage,GetFromLocalStorage,filterData,hasValue};

