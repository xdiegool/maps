angular.module('starter.factories', [])

.factory('authFactory', ($q) => {
  return {
    registerUser: (email, pass) => {
      return $q.resolve(firebase.auth().createUserWithEmailAndPassword(email, pass))
    },
    userLogin: (email, pass) => {
      return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, pass))
    }

  }
})

.factory('gooGeoFactory', ($q, $http) => {
  return {
    distMtx: () => {
      return $http.get(`/googlemapsapi/maps/api/distancematrix/json?units=imperial&origins=place_id:ChIJNT0D7YpmZIgRW_JTBDL7Iwg|place_id:ChIJKZauwUNmZIgRblF0U05TJWI&destinations=place_id:ChIJuY25rS9kZIgRN5MuBAa-JY4|place_id:ChIJ8VhEtvdmZIgRB-GYkpcO89M&key=AIzaSyA7FR9E3bQFP4wWEt_GFRfzr7qxaj-VcKw`)
      .then((val) => console.log(val.data.rows))
    },
    geoCode: (lat, lng) => {
      return $http.get(`/googlemapsapi/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA7FR9E3bQFP4wWEt_GFRfzr7qxaj-VcKw`)
      .then((val) => {
        const locInfo = val.data.results
        console.log(locInfo);
        let adr;
        for (var i = 0; i < locInfo.length; i++) {
          adr = locInfo[0].formatted_address
          console.log(adr);
          break
        }
        return adr

      })
    },
    styleMap: () => {
      return $http.get(`mapspecs.json`)
      .then((val)=>{ return val.data })
    }
  }
})

.factory('firebaseFactory', ($q, $http) => {
  return {
    postForm: (form) => {
      return $q.resolve($http.post(`https://fir-bc8ea.firebaseio.com/destination/.json`, form));
    },
    getTrips: () => {
      return $http.get(`https://fir-bc8ea.firebaseio.com/spots.json`)
      .then((val)=> val )
    },
    getForm: () => {
      return $http.get(`https://fir-bc8ea.firebaseio.com/spots.json`)
    },
    deleteSpot: (key) => {
      return firebase.database().ref('spots').child(key).remove()
    },
    deleteInfo: (key) => {
      return firebase.database().ref('info').child(key).remove()
    },
    getInfo: () => {
      return firebase.database().ref('info').once('value')
      .then((snap)=> snap.val())
    },
    deleteTrip: (name) => {
      return firebase.database().ref('spots').child(name).remove()
    },

    postFav: (item) => {
      return $q.resolve($http.post(`https://fir-bc8ea.firebaseio.com/fav-spots.json`, item));
    },
    getFavs: () => {
      return firebase.database().ref('fav-spots').once('value')
      .then((snap)=> snap.val())
    },
    deleteFav: (key) => {
      return firebase.database().ref('fav-spots').child(key).remove()
    }
  }
})

.factory('arrFactory', () => {
  return {
    cleanArr: (arr) => {
      let a = [], prev;
      arr.sort()
      for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== prev) {
              a.push(arr[i]);
          }
          prev = arr[i];
      }
      return a;
    },
    daySum: (arr) => {
      var sum = 0;
      for (var i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
      }
      return sum
    }
  }
})
