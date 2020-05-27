import * as React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './components/pages/Home';

export class App extends React.Component<{}> {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        );
    }

}

export function start() {
    const rootElem = document.getElementById('main');
    render(<App/>, rootElem);
}
