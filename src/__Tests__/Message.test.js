import { fireEvent, render } from '@testing-library/react';
import {user,message1} from "./TestHelperObjects";
import Message from "../Components/Messages/message";


// simple smoke test for Message component
it("renders a Message component without crashing", function() {
    render(<Message currentUser={1} message={message1}/>);
});

// simple snapshot test for Message Component
it("should match snapshot for Message", function() {
    const {asFragment} = render (<Message currentUser={1} message={message1}/>);
    expect(asFragment()).toMatchSnapshot();
});

it("should display correct ownership of message (this case should be own)",() => {
    const {getByTestId} = render(<Message currentUser={1} message={message1}/>)
    const ownership = getByTestId("messageOwnership");
    expect(ownership).toHaveClass('own');
})