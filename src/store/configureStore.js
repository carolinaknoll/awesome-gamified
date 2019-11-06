import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export default function configureStore() {

  let initialState = {};
  let enhancedComposer = compose;
  if(process.env.NODE_ENV !== 'production') {
    enhancedComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const composedEnhancers = enhancedComposer(
    applyMiddleware(thunk),
  );

  return createStore(
    rootReducer,
    initialState,
    composedEnhancers,
  );
}
