/**
 * Created by Blue on 2016/9/13.
 */
angular.module('mlab')
    .constant('mlabUrl', {
        'apiKey': '3JeQ-CfeVZil1CwBoL04SdcKVBBQUqnM',
        'baseUrl': 'https://api.mongolab.com/api/1/databases/user/collections/User',
        'fullUrl': 'https://api.mongolab.com/api/1/databases/user/collections/User?q={"account":"yang","password":"123"}&apiKey=3JeQ-CfeVZil1CwBoL04SdcKVBBQUqnM'
    })
    .controller('authCtrl', function ($scope, $http, $location, mlabUrl) {
        $scope.authenticate = function (account, password) {
            $http.get(mlabUrl.baseUrl, {
                params: {
                    apiKey: "3JeQ-CfeVZil1CwBoL04SdcKVBBQUqnM",
                    q: ({
                        "account": account,
                        "password": password
                    }),
                    withCredentials: true
                    // c:true
                }
            })
                .success(function (data) {
                    // console.log(data.length);
                    if (data.length) {
                        $location.path("/main")
                    }
                    else {
                        $scope.authenticationError = true;
                    }
                    ;
                }).error(function (error) {
                $scope.authenticationError = error;
            })
        }

        var config = {
            params: {
                apiKey: "3JeQ-CfeVZil1CwBoL04SdcKVBBQUqnM",
                withCredentials: true
            }
        };
        $scope.accounts = [];

        //list
        $scope.loadAccounts = function () {

            $http.get(mlabUrl.baseUrl, config
            ).success(function (data) {
                $scope.accounts = data;
            });
        }

        //add
        $scope.addAccount = function (account) {
            $http.post(mlabUrl.baseUrl, account, config)
                .success(function (data) {
                    $scope.loadAccounts();
                })
                .error(function (error) {
                    $scope.createError = error;
                })
        }


        //update
        $scope.updateAccount = function (account) {
            var id = account._id.$oid;
            $http.put(mlabUrl.baseUrl + "/" + id, account, config)
                .success(function (data) {
                    $scope.loadAccounts();
                    $scope.editedAccount = null;
                })
        }

        //delete
        $scope.deleteAccount = function (account) {
            var id = account._id.$oid;
            $http.delete(mlabUrl.baseUrl + "/" + id, config)
                .success(function (data) {
                    $scope.loadAccounts();
                })
        }

        //buttons
        $scope.startEdit = function (account) {
            $scope.editedAccount = account;
        }

        $scope.cancelEdit = function () {
            $scope.editedAccount = null;
        }

        $scope.loadAccounts();

    });















