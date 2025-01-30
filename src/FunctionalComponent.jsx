import { useState } from "react";

const FunctionalComponent = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <h1>this is a functional component</h1>
            <p>Counter: {counter}</p>
            <button onClick={() => setCounter(counter + 1)}>Increment</button>
        </div>
    )
}

export default FunctionalComponent;