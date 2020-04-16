import '@babel/polyfill'

import * as React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { ReactEmitter, ReduxEmitter, ReduxSagaEmitter } from 'kuker-emitters';

import Counter from './components/Counter'
import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware({ sagaMonitor: ReduxSagaEmitter().sagaMonitor })
const store = createStore(reducer, applyMiddleware(sagaMiddleware, ReduxEmitter()))
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({ type });

ReactEmitter();

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementIfOdd={() => action('INCREMENT_IF_ODD')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
    />,
    document.getElementById('root'),
  )
}

render()
store.subscribe(render)
