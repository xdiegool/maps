contrl.controller('NameitCtrl', function($scope, $state, $location, $cordovaGeolocation, gooGeoFactory) {

  $scope.trip = {}

  let options = {timeout: 1000, enableHighAccuracy: true};


  $cordovaGeolocation.getCurrentPosition(options)
  .then((position)=>{
    console.log("nameit pos", position.coords.latitude, position.coords.longitude);
    geo(position.coords.latitude, position.coords.longitude)
  })
  .catch((err)=>{console.log(err)})

  function geo(x, y) {
    gooGeoFactory.geoCode(x, y)
    .then((adr)=> {

      let strspl = adr.split(" ")
      let cty = '';
      for (var i = 0; i < 6; i++) {
        cty += strspl[i] + " "

      }
      console.log("city", cty);
      $scope.curCity = cty
    })

  }

  $scope.getTrip = () => {
    $scope.currentTrip = $scope.trip.name
    console.log("current trip  ", $scope.currentTrip);
    $state.go('map.view', {trip: $scope.trip.name});
  }

  $scope.gotoTrips = () => {
    $state.go('app.trips')
  }
})
