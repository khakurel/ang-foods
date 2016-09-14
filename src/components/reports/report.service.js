import CacheService from '../../common/cache_service';

class SearchService extends CacheService {

    constructor($http, $q) {
        super($http, $q);
    }

    getReport(id) {
        return this.getOrFetch({action: 'reports', params: {ndbno: id, type: 'b'}})
    }

    getFavorite() {
        return this.store.find('favorite');
    }

}

export default SearchService;
