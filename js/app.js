// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAX_9ujel3jRKl2wwceehy3UI7LXWULg_s",
  authDomain: "fooddeliveryapp-27a82.firebaseapp.com",
  databaseURL: "https://fooddeliveryapp-27a82.firebaseio.com",
  projectId: "fooddeliveryapp-27a82",
  storageBucket: "fooddeliveryapp-27a82.appspot.com",
  messagingSenderId: "350183637276",
  appId: "1:350183637276:web:4b87b3dd5df5af17197ad9",
  measurementId: "G-FWHM1K4BQ0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

function googlesignin() {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var token = result.credential.accessToken;
    var user = result.user;

    console.log(token);
    console.log(user);

  }).catch(function (error) {

    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(error.code);
    console.log(error.message);

  });

}
var db = firebase.firestore();

$("#carousel").empty();
db.collection("recommended").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoURL}')">
            </div>
            <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
        </ons-carousel-item>`
    $("#carousel").append(item);
  });
});

$("#carousel").empty();
db.collection("list").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoURL}')">
            </div>
            <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
        </ons-carousel-item>`
    $("#carousel").append(item);
  });
});

$("#carousel").empty();
db.collection("complete").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoURL}')">
            </div>
            <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
        </ons-carousel-item>`
    $("#carousel").append(item);
  });
});



