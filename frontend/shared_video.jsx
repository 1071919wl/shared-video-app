import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {
   let store;
    if (window.currentUser) {
        const preloadedState = {
            session: { id: window.currentUser.id },
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    const root = document.getElementById('root');




  //! testing
    window.store = store;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // window.fetchProduct = fetchProduct; //!store.dispatch(fetchProduct(1)) in browser
    //! testing

  ReactDOM.render(<Root store={store} />, root);
});