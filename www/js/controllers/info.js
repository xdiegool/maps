contrl.controller('InfoCtrl', function($scope, $stateParams, firebaseFactory){

  $scope.currentTrip = $stateParams.trip;
  // $scope.currentUser = firebase.auth().currentUser.uid;
  console.log($scope.currentTrip);
  const input = document.getElementById('infoInput')
  const infoRef = firebase.database().ref('info');

  $scope.obj = {};

  $scope.addInfo = () => {
    $scope.obj.trip = $scope.currentTrip;
    $scope.obj.uid = firebase.auth().currentUser.uid;
    infoRef.push($scope.obj)
    .then(()=> input.value = " ")
    .then(() => $scope.obj = {})
  }

  infoRef.on("child_added", () => {
    firebaseFactory.getInfo()
    .then((data)=>{
      $scope.data = data
      $scope.$apply()
    })
  });

  //removes infonote from firebase
  $scope.removeInfoNote = (key) => { firebaseFactory.deleteInfo(key) };

  infoRef.on("child_removed", () => {
    firebaseFactory.getInfo()
    .then((data)=>{
      $scope.data = data
      $scope.$apply()
    })
  });






})
