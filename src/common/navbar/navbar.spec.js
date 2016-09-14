import angular from 'angular';
import NavbarModule from './navbar';
import NavbarController from './navbar.controller';
import NavbarComponent from './navbar.component';
import NavbarTemplate from './navbar.html';

describe('Navbar', () => {
  let makeController;

  beforeEach(window.module(NavbarModule.name));  // eslint-disable-line
  beforeEach(inject(() => {
    makeController = () => {
      return new NavbarController();
    };
  }));

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => {
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = NavbarComponent;

    it('includes the intended template',() => {
      expect(component.template).to.equal(NavbarTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(NavbarController);
    });
  });

  describe('Component: Render', function () {

    let element;
    let scope;
    beforeEach(inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      element = angular.element('<navbar></navbar>');
      element = $compile(element)(scope);
      scope.$apply();
    }));

    it('should render have correct menu', function() {
      expect(element.find('li').length).to.equal(3);
      const aElements = element.find('a');
      expect(aElements[1].text).to.equal('Home');
      expect(aElements[2].text).to.equal('Favorites');
      expect(aElements[3].text).to.equal('Contact');
    });

  });

});
