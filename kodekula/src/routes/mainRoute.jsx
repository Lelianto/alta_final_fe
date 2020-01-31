import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'unistore/react';
import { store } from '../stores/store';
import UserProfilePage from '../pages/userProfilePage';

const MainRoute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/profil" component={UserProfilePage} />     
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default MainRoute;