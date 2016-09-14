import CacheService from '../../common/cache_service';


class SearchService extends CacheService {
    constructor($http, $q) {
        super($http, $q)
    }

    getList(query) {
        return this.getOrFetch({action: 'search', params: {q: query}});
    }

    addToFavorite(food) {
        food.favorite = true;
        const cleanFood = _.pick(food, 'ndbno', 'name', 'group', 'favorite');
        if (!this.isExistInFavorite(cleanFood.ndbno)) {
            this.store.addItem('favorite', cleanFood);
        }
    }

    removeFromFavorite(food) {
        this.store.removeItem('favorite', item => item.ndbno === food.ndbno);
        food.favorite = false;

    }

    isExistInFavorite(ndbno) {
        return this.store.findItem('favorite', item => item.ndbno === ndbno)
    }

}

export default SearchService;
