import angular from 'angular';
import uiRouter from 'angular-ui-router';
import resultComponent from './result_table.component';
import searchService from '../search/search.service';

const resultTableModule = angular.module('resultTable', [uiRouter])
    .component('resultTable', resultComponent)
    .service('searchService', searchService);

export default resultTableModule;
