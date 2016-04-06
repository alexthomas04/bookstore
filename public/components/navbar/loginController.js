angular.module('controllers').controller('loginController', function ($scope, $http, $state, $alert, $rootScope) {
    var errors = [];
    $scope.login = function () {
        $http.post('/auth/login', {username: $scope.username, password: $scope.password}).success(function (data) {
                $rootScope.logged_in_user = {
                    shippingInformation: {
                        first_name: 'dummy name',
                        last_name: 'dummy name',
                        address: 'dummy address',
                        state: 'dummy state',
                        zip: 'dummy zip',
                        city: 'dummy city'
                    }
                };


            })
            .error(function (data, status) {
                errors.forEach(function (error) {
                    error.$scope.$hide();
                });
                errors = [];
                console.log(data);
                if (data) {
                    errors.push($alert({
                        title: data.message,
                        type: 'danger',
                        show: true,
                        container: '#alert-container'
                    }));
                }
                else if (status == 500)  errors.push($alert({
                    title: "Internal server error",
                    type: 'danger',
                    show: true,
                    container: '#alert-container'
                }));
                else   errors.push($alert({
                        title: "Unknown error",
                        type: 'danger',
                        show: true,
                        container: '#alert-container'
                    }));
                console.log(errors);
            })
    }
});

angular.module('directives').directive('login', function () {
    return {
        templateUrl: "components/navbar/loginDirective.html",
        controller: 'loginController',
        restrict: 'E'
    }
});
