import APP_CONFIG from '../../config/app_config';
import _ from 'lodash';
import {Store} from 'simple_localstorage_api';
const store = new Store();

const toParams = (params = {}) => {
    if (_.isEmpty(params)) {
        return '';
    }
    params.max = params.max || 25; // default page size
    return '&' + _.map(params, (value, key) => `${key}=${encodeURIComponent(value)}`).join('&')
};

const getApiURL = (action, params = {}) => `${APP_CONFIG.API_URL}/${action}?format=json&api_key=${APP_CONFIG.API_KEY}${toParams(params)}`;

class CacheService {

    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;
        this.store = store;
    }


    fetch(options) {
        return this.$http({
            url: getApiURL(options.action, options.params)
        })
    }

    getOrFetch(options = {}) {
        const cacheKey = _.escape(`data-${options.action}-${toParams(options.params)}`), //cache key or generate new key base on options.
            data = store.find(cacheKey),
            deferred = this.$q.defer();

        if (_.isEmpty(data)) {
            this.fetch(options)
                .then(response => {
                    store.insert(cacheKey, response);
                    deferred.resolve(response);
                }, response => deferred.reject(response))
        }
        else {
            deferred.resolve(data);
        }

        return deferred.promise;
    }


}

export default CacheService;
