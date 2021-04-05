import React from "react";
import ReactDOM from "react-dom";

import App from "../components/App";


test('renders w/out crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});