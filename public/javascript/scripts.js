 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBzKFQGZSMNyfwDCAqpdgRL1MgRiTWoAYY",
  authDomain: "zodiac-friends-yo.firebaseapp.com",
  databaseURL: "https://zodiac-friends-yo.firebaseio.com",
  projectId: "zodiac-friends-yo",
  storageBucket: "zodiac-friends-yo.appspot.com",
  messagingSenderId: "67690482617"
};
firebase.initializeApp(config);

const database = firebase.database();

// 2. Button for adding users
$('#add-user-btn').on('click', (event) => {
  event.preventDefault();

  // Grabs user input
  const userName = $('#name-input').val().trim();
  const userBirth = $('#birth-input').val().trim();

  // user Info
  // console.log('userStart: ' + userStart);

  // Creates local "newuser" object for holding user data
  const newuser = {
    name: userName,
    birth: userBirth,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  };

  // Uploads user data to the database
  database.ref().push(newuser);

  // Logs everything to console
  // console.log('user Name: ' + newuser.name);
  // console.log('user Birth: ' + newuser.birth);

  // alert("user successfully added");

  // Clears all of the text-boxes
  $('#name-input').val('');
  $('#birth-input').val('');
});
