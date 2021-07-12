import { render } from '@testing-library/react';
import {user} from "./TestHelperObjects";
import FindUserPage from "../Components/AddConnections/FindUserPage";

// simple smoke test for FindUserPage component
it("renders a FindUserPage component without crashing", function() {
    render(<FindUserPage user={user} token={true} />);
});

// simple snapshot test for FindUserPage Component
it("should match snapshot for FindUserPage", function() {
    const {asFragment} = render (<FindUserPage user={user} token={true} />);
    expect(asFragment()).toMatchSnapshot();
});