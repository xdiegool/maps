contrl.controller('FormCtrl', function($scope, $location, $ionicModal, firebaseFactory) {


  //ng-modal obj for user input
  $scope.day = {}
  //takes input values and creates a "day" object in firebase
  $scope.createForm = () => {
    $scope.day.uid = firebase.auth().currentUser.uid;
    firebaseFactory.postForm($scope.day)
    .then(() => {
      $scope.city = $scope.day.city
      console.log($scope.city);
      $scope.viewDay = true
    })
    .then(() => $scope.day = {})
  }

  //takes user to see their day
  $scope.goToDay = () => {
    console.log($scope.city);
    if ($scope.city === undefined) {
      $scope.viewDay = false
    } else {

      $location.url(`/app/trips/${$scope.city}/spots`);
    }
  }


})
