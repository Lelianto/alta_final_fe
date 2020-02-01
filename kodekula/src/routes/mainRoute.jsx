import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'unistore/react';
import { store } from '../stores/store';
import UserProfilePage from '../pages/userProfilePage';
import UserProfileSetting from '../pages/userProfileSetting';
import SignUp from '../pages/signUp';
import SignIn from '../pages/signIn';
import ChooseInterest from '../pages/chooseInterest';
        
const MainRoute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/profil" component={UserProfilePage} />  
                    <Route exact path="/pengaturan-akun" component={UserProfileSetting} />
                    <Route exact path="/daftar" component={SignUp}/>
                    <Route exact path="/pilih-minat" component={ChooseInterest}/>
                    <Route exact path="/masuk" component={SignIn}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}
export default MainRoute;
