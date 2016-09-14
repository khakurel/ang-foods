import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarComponent from './navbar.component';

const navbarModule = angular.module('navbar', [
  uiRouter
])

.component('navbar', navbarComponent);

export default navbarModule;
