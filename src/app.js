import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min'
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiFilter from 'angular-filter';
import AppComponent from './app.component.js';
import Common from './common/common';
import Components from './components/components';
import './styles.scss';

angular.module('myApp', [
    uiRouter,
    uiFilter,
    Common.name,
    Components.name
])
.component('app', AppComponent);
