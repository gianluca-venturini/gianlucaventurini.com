import * as React from 'react';
import { render } from 'react-dom';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { RoutePage } from './components/pages/PageUtils';

export class App extends React.Component<{}> {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={(props: RouteProps) => <RoutePage {...props} pageName="home" />} />
                    <Route path="/bookshelf" component={(props: RouteProps) => <RoutePage {...props} pageName="bookshelf" />} />
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
