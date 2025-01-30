import React from "react";

class ClassComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    render() {
        return (
            <div>
                <h1>this is a class component</h1>
                <p>Counter: {this.state.counter}</p>
                <button onClick={() => this.setState({ counter: this.state.counter + 1 })}>Increment</button>
            </div>
        )
    }
}

export default ClassComponent;