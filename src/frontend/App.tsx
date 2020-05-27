import * as React from 'react';
import { render } from 'react-dom';

export class App extends React.Component<{}> {

    render() {
        return <div>Hello</div>;
    }

}

export function start() {
    const rootElem = document.getElementById('main');
    render(<App/>, rootElem);
}
