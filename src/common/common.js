import angular from 'angular';
import Navbar from './navbar/navbar';
import Search from './search/search';
import ResultTable from './result_table/result_table';

export default angular.module('app.common', [
  Navbar.name,
  Search.name,
  ResultTable.name
]);
