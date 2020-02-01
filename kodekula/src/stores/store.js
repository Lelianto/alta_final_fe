import createStore from 'unistore';
import axios from 'axios';

const initialState = {
  menuBarUser:'',
  likeArticle:false,
  likeQuestion:false,
  likeAnswer:false
}

export const store = createStore(initialState)

export const actions = store => ({
  
});



