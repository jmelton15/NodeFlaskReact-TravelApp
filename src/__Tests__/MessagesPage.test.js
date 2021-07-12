import { render } from '@testing-library/react';
import {user} from "./TestHelperObjects";
import MessagesPage from '../Components/Messages/MessagesPage';

// simple smoke test for MessagesPage component
it("renders a MessagesPage component without crashing", function() {
    render(<MessagesPage user={user} token={true}/>);
});

// simple snapshot test for MessagesPage Component
it("should match snapshot for MessagesPage", function() {
    const {asFragment} = render (<MessagesPage user={user} token={true}/>);
    expect(asFragment()).toMatchSnapshot();
});

it("should display prompt message for no messages showing",() => {
    const {getByText} = render(<MessagesPage user={user} token={true}/>)
    const prompt = getByText("Click On A Connection To Open Up A Conversation...");
    expect(prompt).toBeInTheDocument();
})

