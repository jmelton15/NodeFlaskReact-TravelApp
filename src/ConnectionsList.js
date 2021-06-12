import ConnectionCard from "./ConnectionCard";

const ConnectionList = ({userData}) => {

    return (
        <>
        {userData.following.map((connection) => {
            return (
                <ConnectionCard connection={connection}/>
            )
        })}
        </>
    )

}

export default ConnectionList;