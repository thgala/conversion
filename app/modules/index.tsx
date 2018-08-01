import React from 'react';
import { ReducersMapObject } from 'redux';
import { SagaIterator } from 'redux-saga';
import exchangeModule from './exchange';

export interface Module {
    name: string,
    reducer: ReducersMapObject,
    bootSagas: SagaIterator[],
}

export const modules = {
    name: 'all-modules',
    reducer: {
        ...exchangeModule.reducer,
    },
    bootSagas: [
        ...exchangeModule.bootSagas,
    ],
};

export default modules;
