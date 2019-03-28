contrl.controller('CurTripCtrl', function($scope, $state, $stateParams ,firebaseFactory){
  $scope.currentTrip = $stateParams.trip
  console.log("curTrip log", $stateParams.trip);

  $scope.gotoSpots = () => {
    $state.go('app.spots', {trip: $scope.currentTrip})
  }

  $scope.gotoInfo = () => {
    $state.go('app.info', {trip: $scope.currentTrip})
  }

  $scope.gotoFavs = () => {
    $state.go('app.fav', {trip: $scope.currentTrip})
  }

})
