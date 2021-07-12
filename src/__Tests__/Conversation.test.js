import { fireEvent, render } from '@testing-library/react';
import {user,connection} from "./TestHelperObjects";
import Conversation from '../Components/Conversations/Conversation';

// simple smoke test for Conversation component
it("renders a Conversation component without crashing", function() {
    render(<Conversation connection={connection} getMessages={() => console.log("get messages")}/>);
});

// simple snapshot test for Conversation Component
it("should match snapshot for Conversation", function() {
    const {asFragment} = render (<Conversation connection={connection} getMessages={() => console.log("get messages")}/>);
    expect(asFragment()).toMatchSnapshot();
});
