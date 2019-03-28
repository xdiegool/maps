contrl.controller('TripsCtrl', function($scope, $state, $stateParams, arrFactory, firebaseFactory){

  $scope.curTrip = $stateParams.trip
  // empty array will store all city values from object
  let allTrips = [];
  const spotRef = firebase.database().ref('spots')
  $scope.currentUser = firebase.auth().currentUser.uid

  //gets all destinations and sets them to values
  firebaseFactory.getTrips()
    .then((val) => {
      //stores returned data in variable
      $scope.allSpots = val.data
      console.log($scope.allSpots);
      //takes all objects and extracts all instince values of city key
        angular.forEach($scope.allSpots, (k, v) => {
          if ($scope.currentUser === k.uid) {
            //pushes all cities to array
            allTrips.push(k.trip)
            //filters 1 instince per city
            $scope.trips = arrFactory.cleanArr(allTrips)
          }
        })

  })

  $scope.gotoCurTrip = (name) => {
    $stateParams.trip = name
    $state.go('app.curTrip', {trip: $stateParams.trip})
  }

})
