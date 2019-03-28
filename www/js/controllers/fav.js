contrl.controller('FavCtrl', function($scope, $stateParams, arrFactory ,firebaseFactory){

  $scope.currentTrip = $stateParams.trip
  console.log($scope.currentTrip);
  let favArr = [];
  const favRef = firebase.database().ref('fav-spots')

  // gets data when a favorite spot is added
  favRef.on("child_added", () => {
    firebaseFactory.getFavs()
    .then((data)=>{
      $scope.data = data
      $scope.$apply()
    })
  })

  //removes remove favorite spot from firebase
  $scope.removeFav = (k) => { firebaseFactory.deleteFav(k) }

  //reupdates data when fav is deleted
  favRef.on("child_removed", () => {
    firebaseFactory.getFavs()
    .then((data)=>{
      $scope.data = data
      $scope.$apply()
    })
  })


})
