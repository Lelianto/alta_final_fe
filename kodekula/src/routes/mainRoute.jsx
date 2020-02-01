import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'unistore/react';
import { store } from '../stores/store';

import SignUp from '../pages/signUp';
import SignIn from '../pages/signIn';
import ChooseInterest from '../pages/chooseInterest';


const MainRoutes = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/daftar" component={SignUp}/>
                    <Route exact path="/pilih-minat" component={ChooseInterest}/>
                    <Route exact path="/masuk" component={SignIn}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default MainRoutes;