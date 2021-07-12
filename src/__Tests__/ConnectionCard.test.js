import { fireEvent, render } from '@testing-library/react';
import {user,connection} from "./TestHelperObjects";
import ConnectionCard from "../Components/AddConnections/ConnectionCard";


// simple smoke test for ConnectionCard component
it("renders a ConnectionCard component without crashing", function() {
    render(<ConnectionCard user={user} connection={connection} token={true} />);
});

// simple snapshot test for ConnectionCard Component
it("should match snapshot for ConnectionCard", function() {
    const {asFragment} = render (<ConnectionCard user={user} connection={connection} token={true} />);
    expect(asFragment()).toMatchSnapshot();
});

it("should display already following when follow is clicked", () => {
    const {getByText} = render(<ConnectionCard user={user} connection={connection} token={true} />)
    const unfollowBtn = getByText("UnFollow");
    const alreadyFollowing = getByText("(Already Following)");
    expect(alreadyFollowing).not.toBeInTheDocument();

    fireEvent.click(unfollowBtn);
    expect(alreadyFollowing).toBeInTheDocument();
});