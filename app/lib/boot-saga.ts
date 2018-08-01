import { CallEffectFn, fork } from 'redux-saga/effects';

export function* boot(bootSagas: CallEffectFn<any>[]) { // tslint:disable-line
    for (const key in bootSagas) {
        if (bootSagas[key]) {
            yield fork(bootSagas[key]);
        }
    }
}
