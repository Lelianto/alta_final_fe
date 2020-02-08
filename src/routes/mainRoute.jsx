import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'unistore/react';
import { store } from '../stores/store';
import UserProfilePage from '../pages/userProfilePage';
import UserProfileSetting from '../pages/userSettingAll';
import UserSetPersonalData from '../pages/userSetPersonalData';
import PersonalDataEdit from '../pages/personalDataEdit';
import PersonalDataInterest from '../pages/userInterest';
import SignUp from '../pages/signUp';
import SignIn from '../pages/signIn';
import ChooseInterest from '../pages/chooseInterest';
import Home from '../pages/home';
import Article from '../pages/articlePage';
import Question from '../pages/questionPage';
import AddArticle from '../pages/addArticle';
import AddQuestion from '../pages/addQuestion';
import UserSetInterest from '../pages/userSetInterest'
import DetailArticle from '../pages/detailArticle';
import DetailQuestionPage from '../pages/detailQuestionPage';
import AdminLanding from '../pages/adminLandingPage';
import EditArticle from '../pages/editArticle';
import EditQuestion from '../pages/editQuestion';
import Notification from '../pages/notification';
        
const MainRoute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/admin" component={AdminLanding}/>
                    <Route exact path="/artikel" component={Article}/>
                    <Route exact path="/pertanyaan" component={Question}/>
                    <Route exact path="/artikel/tulis" component={AddArticle}/>
                    <Route exact path="/pertanyaan/tulis" component={AddQuestion}/>
                    <Route exact path="/profil" component={UserProfilePage} />  
                    <Route exact path="/pengaturan-akun" component={UserProfileSetting} />
                    <Route exact path="/pengaturan-akun/data-diri/edit" component={PersonalDataEdit} />
                    <Route exact path="/pengaturan-akun/minat" component={PersonalDataInterest} />
                    <Route exact path="/pengaturan-akun/minat/edit" component={UserSetInterest} />
                    <Route exact path="/daftar" component={SignUp}/>
                    <Route exact path="/pilih-minat" component={ChooseInterest}/>
                    <Route exact path="/masuk" component={SignIn}/>
                    <Route exact path="/notifikasi" component={Notification}/>
                    <Route path="/pengaturan-akun/:event" component={UserProfileSetting} />
                    <Route path="/pengaturan-akun/:event/edit" component={UserSetPersonalData} />
                    <Route path="/pertanyaan/:id/edit" component={EditQuestion}/>
                    <Route path="/pertanyaan/:id" component={DetailQuestionPage}/>
                    <Route path="/artikel/:id/edit" component={EditArticle}/>
                    <Route path="/artikel/:id" component={DetailArticle}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}
export default MainRoute;
