'use strict';

angular.module('statservicev3App')
    .factory('Password', function ($resource) {
        return $resource('api/account/change_password', {}, {
        });
    });
