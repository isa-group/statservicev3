angular.module('statservicev3App')
    .controller('TrackerController', function ($scope, $cookies, $http) {
        // This controller uses a Websocket connection to receive user activities in real-time.

        $scope.activities = [];
        var stompClient = null;
        var socket = new SockJS('/websocket/tracker');
        stompClient = Stomp.over(socket);
        var headers = {};
        headers['X-CSRF-TOKEN'] = $cookies[$http.defaults.xsrfCookieName];
        stompClient.connect(headers, function(frame) {
            stompClient.subscribe('/topic/tracker', function(activity) {
                showActivity(JSON.parse(activity.body));
            });
        });

        function showActivity(activity) {
            var existingActivity = false;
            for (var index = 0; index < $scope.activities.length; index++) {
                if($scope.activities[index].sessionId == activity.sessionId) {
                    existingActivity = true;
                    if (activity.page == 'logout') {
                        $scope.activities.splice(index, 1);
                    } else {
                        $scope.activities[index] = activity;
                    }
                }
            }
            if (!existingActivity && (activity.page != 'logout')) {
                $scope.activities.push(activity);
            }
            $scope.$apply();
        };
    });
