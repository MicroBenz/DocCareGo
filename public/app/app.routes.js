(function() {
    angular
        .module('doccareGo')
        .config(routeConfig)
        .config(tokenConfig);

    function routeConfig ($routeProvider) {
        var originalWhen = $routeProvider.when;
        $routeProvider.when = function (path, route) {
            route.resolve || (route.resolve = {});
            angular.extend(route.resolve, {
                loggedIn: function ($q, $window, $location, jwtHelper) {
                    var deferred = $q.defer();
                    var token = $window.localStorage.getItem('doccareGoToken');
                    if (token === null || token === undefined) {
                        deferred.resolve();
                        $location.path('/login');
                    }
                    else if (jwtHelper.isTokenExpired(token)) {
                        $window.localStorage.removeItem('doccareGoToken');
                        $location.path('/login');
                        deferred.resolve();
                    }
                    else {
                        var role = jwtHelper.decodeToken(token).role;
                        if ($location.path() === '/login') {
                            switch (role) {
                                case 'patient':
                                    $location.path('/patient');
                                    break;
                                case 'officer':
                                    $location.path('/officer');
                                    break;
                                case 'admin':
                                    $location.path('/admin');
                            }
                        }
                        else {
                            var pathRole = $location.path().split('/')[1];
                            if (role !== pathRole) {
                                $location.path('/' + role);
                            }
                        }
                        deferred.resolve();
                    }
                    return deferred.promise;
                }
            });
            return originalWhen.call($routeProvider, path, route);
        };
        
        $routeProvider
            .when('/login', {
                templateUrl: '../app/auth/login.view.html'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }

    function tokenConfig ($httpProvider, jwtOptionsProvider) {
        jwtOptionsProvider.config({
            tokenGetter: ['$window', function($window) {
                return $window.localStorage.getItem('doccareToken');
            }]
        });
        $httpProvider.interceptors.push('jwtInterceptor');
    }

})();