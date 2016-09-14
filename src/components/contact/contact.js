import angular from 'angular';
import uiRouter from 'angular-ui-router';
import contactComponent from './contact.component';

const contactModule = angular.module('contact', [
  uiRouter
])

.config(($stateProvider) => {
  $stateProvider
    .state('contact', {
      url: '/contact/',
      template: '<contact></contact>'
    });
})

.component('contact', contactComponent);

export default contactModule;
