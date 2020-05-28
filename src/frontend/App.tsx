import * as React from 'react';
import { render } from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Bookshelf } from './components/pages/Bookshelf';
import { Home } from './components/pages/Home';

export class App extends React.Component<{}> {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/bookshelf" component={Bookshelf} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        );
    }

}

export function start() {
    const rootElem = document.getElementById('main');
    render(<App />, rootElem);
}
