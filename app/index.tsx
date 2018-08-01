import { Container } from 'native-base';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, ReducersMapObject } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { boot } from './lib/boot-saga';
import modules from './modules';
import ExchangeContainer from './modules/exchange/components/exchange-container';

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
      combineReducers(modules.reducer as ReducersMapObject),
      applyMiddleware(sagaMiddleware, logger),
  );
  sagaMiddleware.run(boot, modules.bootSagas);
  return store;
}

export default class App extends React.PureComponent<{}> {
  public render() {
    return (
      <Provider store={configureStore()}>
        <Container>
          <ExchangeContainer/>
        </Container>
      </Provider>
    );
  }
}
