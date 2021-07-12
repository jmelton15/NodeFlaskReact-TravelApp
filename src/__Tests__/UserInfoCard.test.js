import {render } from '@testing-library/react';
import {user} from "./TestHelperObjects";
import UserInfoCard from "../Components/Profile/UserInfoCard";


// simple smoke test for UserInfoCard component
it("renders a UserInfoCard component without crashing", function() {
    render(<UserInfoCard user={user} token={true} goToPage={() => ""} profilePic={""} uploadPicture={() => ""} getConnections={() => ""}/>);
});

// simple snapshot test for UserInfoCard Component
it("should match snapshot for UserInfoCard", function() {
    const {asFragment} = render (<UserInfoCard user={user} token={true} goToPage={() => ""} profilePic={""} uploadPicture={() => ""} getConnections={() => ""}/>);
    expect(asFragment()).toMatchSnapshot();
});
