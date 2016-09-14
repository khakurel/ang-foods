import angular from 'angular';
import $ from 'jquery';
import Module from './result_table';
import Controller from './result_table.controller';
import Component from './result_table.component';
import Template from './result_table.html';

describe('ResultTable', () => {
    let makeController;

    beforeEach(window.module(Module.name));  // eslint-disable-line
    beforeEach(inject(() => {
        makeController = () => {
            return new Controller();
        };
    }));

    describe('Controller', () => {
        it('has a name property', () => {
            let controller = makeController();
            expect(controller).to.have.property('name');
        });
    });

    describe('Component', () => {
        // component/directive specs
        let component = Component;

        it('includes the intended template', () => {
            expect(component.template).to.equal(Template);
        });

        it('invokes the right controller', () => {
            expect(component.controller).to.equal(Controller);
        });
    });

    describe('Component: Render', function () {

        let element, $element, scope;
        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            element = angular.element('<result-table items="items"></result-table>');
            element = $compile(element)(scope);
            $element = $(element[0])
        }));


        it('should render table', () => {
            expect($element.find('table.table.table-hover').length).to.equal(1);
            const $ths = $element.find('th');
            expect($ths.eq(0).text()).to.equal('#');
            expect($ths.eq(1).text()).to.equal('Name');
            expect($ths.eq(2).text()).to.equal('Group');
            expect($ths.eq(3).text()).to.equal('Actions');
        });

        it('should render correct number of records', ()=> {

            scope.items = [
                {offset: 0, ndbno: "1001", name: "test1", group: "Test", favorite: true},
                {offset: 1, ndbno: "1002", name: "test2", group: "Test", favorite: false}
            ];
            scope.$apply();

            expect($element.find('tbody > tr').length).to.equal(2);

            const firstTr = $element.find('tbody > tr:first');
            const lastTr = $element.find('tbody > tr:last');

            expect(firstTr.find('td.id').text()).to.equal('1');
            expect(firstTr.find('td.name').text()).to.equal('test1');
            expect(firstTr.find('td.group').text()).to.equal('Test');
            expect(firstTr.find('td.actions > a.view').length).to.equal(1);
            expect(firstTr.find('td.actions > a.remove').length).to.equal(1);
            expect(firstTr.find('td.actions > a.add').length).to.equal(0);


            expect(lastTr.find('td.id').text()).to.equal('2');
            expect(lastTr.find('td.name').text()).to.equal('test2');
            expect(lastTr.find('td.group').text()).to.equal('Test');
            expect(lastTr.find('td.actions > a.view').length).to.equal(1);
            expect(lastTr.find('td.actions > a.add').length).to.equal(1);
            expect(lastTr.find('td.actions > a.remove').length).to.equal(0);


        });

        xit('should trigger ctrl\'s goToReport clicking on view report', ()=> {

            scope.items = [
                {offset: 0, ndbno: "1001", name: "test1", group: "Test", favorite: true},
            ];
            scope.$ctrl = {
                goToReport :  sinon.spy()
            };
            scope.$apply();
            expect($element.find('tbody > tr').length).to.equal(1);
            $element.find('a.view').get(0).click();
            expect(scope.$ctrl.goToReport).to.have.been.called;
        })

    });

});
