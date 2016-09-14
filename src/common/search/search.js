import angular from 'angular';
import uiRouter from 'angular-ui-router';
import searchComponent from './search.component';
import searchService from './search.service';

const searchModule = angular.module('search', [uiRouter])
    .component('search', searchComponent)
    .service('searchService', searchService);

export default searchModule;
