import _ from 'lodash';

class ResultTableController {
    constructor(searchService,$state) {
        this.$state = $state;
        this.service = searchService;
        this.name = 'resultTable';
    }

    goToReport($event, food) {
        $event.preventDefault();
        this.$state.go('reports', {id: food.ndbno});

    }

    addToFavorite($event, food) {
        $event.preventDefault();
        this.service.addToFavorite(food);
    }

    removeFromFavorite($event, food) {
        $event.preventDefault();
        this.service.removeFromFavorite(food);
        _.result(this, 'onDelete')
    }


}

export default ResultTableController;
