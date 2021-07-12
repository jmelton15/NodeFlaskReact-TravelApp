import {render } from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import {v4 as uuid} from "uuid";
import {user,trip} from "./TestHelperObjects";
import TripCard from "../Components/ActivityFeed/TripCard";

// simple smoke test for TripCard component
it("renders a TripCard component without crashing", function() {
    render(<TripCard user={user} trip={trip} token={true} />);
});

// simple snapshot test for TripCard Component
it("should match snapshot for TripCard", function() {
    const {asFragment} = render (<TripCard user={user} trip={trip} token={true} />);
    expect(asFragment()).toMatchSnapshot();
});


