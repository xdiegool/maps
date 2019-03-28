contrl.controller('AuthCtrl', function($scope, $timeout, $ionicModal, $q, $http, $state, authFactory) {

  // Create the register modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.registerModal = function() {
    $scope.modal.show();
  };
  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.modal.hide();
  };


  // Form data for the login modal
  $scope.regData = {};
  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doRegister = () => {
    authFactory
    .registerUser($scope.regData.email, $scope.regData.password)
    .then(()=> $scope.closeRegister())
    .then(()=> $state.go('map.nameit'))

  }
  $scope.doLogin = () => {
    authFactory
    .userLogin($scope.loginData.email, $scope.loginData.password)
    .then(()=> $state.go('map.nameit'), {}, {reload: true})

  }
  // Simulate a login delay. Remove this and replace with your login
  // code if using a login system
  $timeout(function() {
    $scope.closeRegister();
  }, 1000)



})
