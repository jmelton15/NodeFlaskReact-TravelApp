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

export {GoToPage,GetFromLocalStorage,filterData};

