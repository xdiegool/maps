contrl.controller('AppCtrl', function($scope, $ionicModal, $state, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.goToNameit = () => {
    $state.go('map.nameit')
  }
  $scope.gotoTrips = () => {
    $state.go('app.trips')
  }


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/logout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.doLogout = function() {
    firebase.auth().signOut()

    .then(()=>$scope.modal.hide())
    .then(()=> $state.go('auth.login'))
    .then(()=> console.log('currentUser', firebase.auth().currentUser ))
  };

  // Open the logout modal
  $scope.logoutModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = ()=>{
    $scope.modal.hide()
  }




})
