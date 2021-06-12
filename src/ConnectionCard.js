import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

/**
 * connection will be a user from the database 
 *  ---> someone that the logged in user is following
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
const ConnectionCard = ({connection,unfollow}) => {

    return (
        <>
        <Card>
        <CardImg top width="100%" src="" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{connection.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{connection.numberOfTrips}</CardSubtitle>
          <Button onClick={() => unfollow(connection.id)}>UnFollow</Button>
        </CardBody>
        </Card>
        </>
    )
}

export default ConnectionCard;