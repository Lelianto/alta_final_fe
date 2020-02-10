import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
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
import UserSetInterest from '../pages/userSetInterest';
import UserSetPassword from '../pages/userSetPassword';
import DetailArticle from '../pages/detailArticle';
import DetailQuestionPage from '../pages/detailQuestionPage';
import AdminLanding from '../pages/adminLandingPage';
import AdminArticle from '../pages/adminGetArticlePage';
import AdminQuestion from '../pages/adminGetQuestionPage';
import AdminTag from '../pages/adminGetTagPage';
import AdminAnswer from '../pages/adminGetAnswerPage';

import AdminUserGraph from '../pages/adminUserGraphPage';
import AdminArticleGraph from '../pages/adminArticleGraphPage';
import AdminQuestionGraph from '../pages/adminQuestionGraphPage';
import AdminTagGraph from '../pages/adminTagGraphPage';
import AdminAnswerGraph from '../pages/adminAnswerGraphPage';

import EditArticle from '../pages/editArticle';
import EditQuestion from '../pages/editQuestion';
import Notification from '../pages/notification';
import Search from '../pages/searchPage'
        
const MainRoute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/admin/pengguna" component={AdminLanding}/>
                    <Route exact path="/admin/artikel" component={AdminArticle}/>
                    <Route exact path="/admin/pertanyaan" component={AdminQuestion}/>
                    <Route exact path="/admin/jawaban" component={AdminAnswer}/>
                    <Route exact path="/admin/tag" component={AdminTag}/>
                    <Route exact path="/admin/pengguna/grafik" component={AdminUserGraph}/>
                    <Route exact path="/admin/artikel/grafik" component={AdminArticleGraph}/>
                    <Route exact path="/admin/pertanyaan/grafik" component={AdminQuestionGraph}/>
                    <Route exact path="/admin/jawaban/grafik" component={AdminAnswerGraph}/>
                    <Route exact path="/admin/tag/grafik" component={AdminTagGraph}/>
                    <Route exact path="/artikel" component={Article}/>
                    <Route exact path="/pertanyaan" component={Question}/>
                    <Route exact path="/artikel/tulis" component={AddArticle}/>
                    <Route exact path="/pertanyaan/tulis" component={AddQuestion}/>
                    <Route exact path="/profil" component={UserProfilePage} />  
                    <Route exact path="/pengaturan-akun" component={UserProfileSetting} />
                    <Route exact path="/pengaturan-akun/data-diri/edit" component={PersonalDataEdit} />
                    <Route exact path="/pengaturan-akun/ubah-password" component={UserSetPassword} />
                    <Route exact path="/pengaturan-akun/minat" component={PersonalDataInterest} />
                    <Route exact path="/pengaturan-akun/minat/edit" component={UserSetInterest} />
                    <Route exact path="/daftar" component={SignUp}/>
                    <Route exact path="/pilih-minat" component={ChooseInterest}/>
                    <Route exact path="/masuk" component={SignIn}/>
                    <Route exact path="/notifikasi" component={Notification}/>
                    <Route exact path="/pencarian" component={Search}/>
                    <Route path="/pencarian/:event" component={Search}/>
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