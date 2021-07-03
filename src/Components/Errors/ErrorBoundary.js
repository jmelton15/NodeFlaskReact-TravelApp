import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
  
    componentDidCatch(error, errorInfo) {
      // Display fallback UI
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Opps!! Something Went Wrong! Reloading Page, Hold Tight</h1>;
      }
      return this.props.children;
    }
}

  export {ErrorBoundary};