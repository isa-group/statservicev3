'use strict';

angular.module('statservicev3App')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


