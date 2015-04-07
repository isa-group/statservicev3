'use strict';

angular.module('statservicev3App')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
