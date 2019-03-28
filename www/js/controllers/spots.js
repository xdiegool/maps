contrl.controller('SpotCtrl', function($scope, $stateParams, $timeout, $location, $state, arrFactory ,firebaseFactory){

  const spotsRef = firebase.database().ref('spots')

  $scope.currentTrip = $stateParams.trip;
  console.log("current trip : " , $scope.currentTrip);
  $scope.user = firebase.auth().currentUser.uid

  const currentTrip = $stateParams.trip;


  firebaseFactory.getForm()
  .then((val) => {
    let curSpots = [];
    let dt = [];
    let tt = [];
    //sets all destinations to varibale
    const allSpots = val.data
    console.log("allSpots", allSpots);

    //loops over dests and only returns data matching current city
    angular.forEach(allSpots, (v, k) => {
      console.log(currentTrip, v.trip);
      if (v.trip === currentTrip) {
          // adds unique key as a value of key/value pair {key: id}
          // to each object locally
          v.key = k;
          //pushes objects of currentCity to array
          curSpots.push(v)
          dt.push(parseFloat(v.destTime))
          tt.push(parseFloat(v.travelTime))

      }
    })

    //sets scope to addition function calling poplated popltd arr
    $scope.totalTrav = arrFactory.daySum(tt);
    $scope.totalDest = arrFactory.daySum(dt);
    //array of filter objects set to scope
    $scope.dest = curSpots
  })
  .then(() => {

    curSpots = [];
    dt = [];
    tt = [];
  })
  //gets spots for the day


  //UI Slide / delete / reorder
  $scope.data = {
      showDelete: false
    };


  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.dest.splice(fromIndex, 1);
    $scope.dest.splice(toIndex, 0, item);
  };


  $scope.onItemDelete = function(item, key) {

    $scope.dest.splice($scope.dest.indexOf(item), 1)
    // deletes obj in firebase
    spotsRef.child(key).remove()
  };




  $scope.flag = false;
  $scope.addToFav = (item) => {
    console.log("favs");
    firebaseFactory.postFav(item)
    .then(()=>{ $scope.flag = true })
    .then($timeout(() => {
      $scope.flag = false;
    },3500))
  }
  // redired back to form back to form to add another spot
  $scope.addAnotherSpot = () => {
    $state.go('map.view', {trip: $scope.currentTrip} );
  }

})
