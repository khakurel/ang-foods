import angular from 'angular';
import $ from 'jquery';
import Module from './result_table';
import Controller from './result_table.controller';
import Component from './result_table.component';
import Template from './result_table.html';

describe('ResultTable', () => {

    beforeEach(window.module(Module.name));  // eslint-disable-line


    describe('Controller', () => {
        let controller;
        let $event = {
            preventDefault: sinon.spy()
        };
        beforeEach(inject((searchService, $state) => {
            controller = new Controller(searchService, $state);
        }));

        it('has a name property', () => {
            expect(controller).to.have.property('name');
        });

        describe('#goToReport', function () {
            it('should called $state go', function () {
                sinon.stub(controller.$state, 'go');
                controller.goToReport($event, {ndbno: '1'});
                expect($event.preventDefault).to.have.been.called;
                expect(controller.$state.go).to.have.been.calledWith('reports', {id: '1'});
                controller.$state.go.restore();
            });
        });


        describe('#addToFavorite', function () {
            it('should called serivice addToFavorite', function () {
                sinon.stub(controller.service, 'addToFavorite');
                controller.addToFavorite($event, {ndbno: '1', name: 'test'});
                expect($event.preventDefault).to.have.been.called;
                expect(controller.service.addToFavorite).to.have.been.calledWith({ndbno: '1', name: 'test'});
                controller.service.addToFavorite.restore();
            });
        });


        describe('#removeFromFavorite', function () {
            it('should called service removeFromFavorite', function () {
                sinon.stub(controller.service, 'removeFromFavorite');
                controller.removeFromFavorite($event, {ndbno: '1', name: 'test'});
                expect($event.preventDefault).to.have.been.called;
                expect(controller.service.removeFromFavorite).to.have.been.calledWith({ndbno: '1', name: 'test'});
                controller.service.removeFromFavorite.restore();
            });

            it('should called onDelete', function () {
                controller.onDelete = sinon.spy();
                sinon.stub(controller.service, 'removeFromFavorite');
                controller.removeFromFavorite($event, {ndbno: '1', name: 'test'});
                expect($event.preventDefault).to.have.been.called;
                expect(controller.service.removeFromFavorite).to.have.been.calledWith({ndbno: '1', name: 'test'});
                expect(controller.onDelete).to.have.been.called;
                controller.service.removeFromFavorite.restore();
            });
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

        let element, $element, rootScope, scope;
        beforeEach(inject(function ($rootScope, $compile) {
            rootScope = $rootScope.$new();
            element = angular.element('<result-table items="items"></result-table>');
            element = $compile(element)(rootScope);
            scope = element.isolateScope();
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

            scope.$ctrl.items = [
                {offset: 0, ndbno: "1001", name: "test1", group: "Test", favorite: true},
                {offset: 1, ndbno: "1002", name: "test2", group: "Test", favorite: false}
            ];
            rootScope.$digest();

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

        it('should trigger goToReport clicking on view report', ()=> {
            const data = {offset: 0, ndbno: "1001", name: "test1", group: "Test", favorite: true};
            scope.$ctrl.items = [data];
            rootScope.$digest();
            scope.$ctrl.goToReport = sinon.spy();
            expect($element.find('tbody > tr').length).to.equal(1);
            $element.find('a.view').get(0).click();
            expect(scope.$ctrl.goToReport).to.have.been.called;
            expect(scope.$ctrl.goToReport.getCall(0).args[1]).to.deep.equal(data);
        });


        it('should trigger removeFromFavorite clicking on Remove from Favorite', ()=> {
            const data = {offset: 0, ndbno: "1001", name: "test1", group: "Test", favorite: true};
            scope.$ctrl.items = [data];
            rootScope.$digest();
            scope.$ctrl.removeFromFavorite = sinon.spy();
            expect($element.find('tbody > tr').length).to.equal(1);
            $element.find('a.remove').get(0).click();
            expect(scope.$ctrl.removeFromFavorite).to.have.been.called;
            expect(scope.$ctrl.removeFromFavorite.getCall(0).args[1]).to.deep.equal(data);
        });


        it('should trigger addToFavorite clicking on add to  Favorite', ()=> {
            const data = {offset: 0, ndbno: "1001", name: "test1", group: "Test", favorite: false};
            scope.$ctrl.items = [data];
            rootScope.$digest();
            scope.$ctrl.addToFavorite = sinon.spy();
            expect($element.find('tbody > tr').length).to.equal(1);
            $element.find('a.add').get(0).click();
            expect(scope.$ctrl.addToFavorite).to.have.been.called;
            expect(scope.$ctrl.addToFavorite.getCall(0).args[1]).to.deep.equal(data);

        })

    });

});
