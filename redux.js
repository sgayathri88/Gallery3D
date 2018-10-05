import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

//action types
const ADD_NEW_PIC = 'ADD_NEW_PIC';
const GET_PICS = 'GET_PICS';

//action creators
const addPic = pic => ({
  type: ADD_NEW_PIC,
  pic,
});

//thunk creators
export const addPhoto = photo => {
  return dispatch => {
    try {
      dispatch(addPic(photo));
    } catch (err) {
      console.log('oops');
      console.error(err);
    }
  };
};

//reducer
const reducer = (state = { pics: [] }, action) => {
  switch (action.type) {
    case GET_PICS:
      return state;
    case ADD_NEW_PIC:
      return {
        ...state,
        pics: [...state.pics, action.pic],
      };
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunkMiddleware));
