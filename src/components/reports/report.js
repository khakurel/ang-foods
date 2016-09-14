import angular from 'angular';
import uiRouter from 'angular-ui-router';
import reportComponent from './report.component';
import reportService from './report.service';

const searchModule = angular.module('report', [uiRouter])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('reports', {
                url: '/reports/:id',
                template: '<report></report>'
            });
    })

    .component('report', reportComponent)
    .service('reportService', reportService);

export default searchModule;
