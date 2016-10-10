class SearchController {
    constructor(searchService, $state) {
        this.$state = $state;
        this.name = 'search';
        this.result = [];
        this.service = searchService;
    }

    getList() {
        this.loading = true;
        this.result = [];
        this.service.getList(this.query)
            .then(res => {
                _.each(res.data.list.item, item => {
                    item.favorite = this.service.isExistInFavorite(item.ndbno) !== undefined
                });
                this.result = res.data.list;
            })
            .finally(() => this.loading = false);

    }

}

export default SearchController;
