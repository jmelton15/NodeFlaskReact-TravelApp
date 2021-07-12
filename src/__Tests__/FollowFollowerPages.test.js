import { fireEvent, render } from '@testing-library/react';
import {user,connection} from "./TestHelperObjects";
import FollowerPage from '../Components/FollowInfoPages/FollowerPage';
import FollowPage from '../Components/FollowInfoPages/FollowPage';

// simple smoke test for FollowerPage component
it("renders a FollowerPage component without crashing", function() {
    render(<FollowerPage user={user} token={true} />);
});

// simple snapshot test for v Component
it("should match snapshot for FollowerPage", function() {
    const {asFragment} = render (<FollowerPage user={user} token={true} />);
    expect(asFragment()).toMatchSnapshot();
});

// simple smoke test for FollowPage component
it("renders a FollowPage component without crashing", function() {
    render(<FollowPage user={user} token={true} />);
});

// simple snapshot test for FollowPage Component
it("should match snapshot for FollowPage", function() {
    const {asFragment} = render (<FollowPage user={user} token={true} />);
    expect(asFragment()).toMatchSnapshot();
});
