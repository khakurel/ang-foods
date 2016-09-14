import angular from 'angular';
import Home from './home/home';
import Contact from './contact/contact';
import Report from './reports/report';

export default angular.module('app.components', [
    Contact.name,
    Home.name,
    Report.name
]);
