import _ from 'lodash';

class SearchController {
    constructor(reportService, $state) {
        this.name = 'report';
        this.result = {};
        this.service = reportService;
        this.id = $state.params.id;
        this.loading = true;
    }

    $onInit() {
        if (this.id) {
            this.getList();
        } else {
            this.getFavorite();
        }
    }

    getList() {
        this.service.getReport(this.id)
            .then(res => this.result = res.data.report.food)
            .finally(()=>this.loading = false);

    }

    getFavorite() {
        this.loading = false;
        this.result =  _.get(this.service.getFavorite(), 'items', []);
    }

    hasResult() {
        return !_.isEmpty(this.result) && this.loading === false;
    }

    onDelete(){
        console.log('change')
        this.getFavorite();
    }
}

export default SearchController;
