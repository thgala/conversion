import {AppRegistry} from 'react-native';
import App from './app/index';
import * as data from './app.json';

AppRegistry.registerComponent(data.name, () => App);
