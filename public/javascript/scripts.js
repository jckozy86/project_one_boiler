// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCbaDBRoB73Wo-g9jMMjRNXXB7l8PuQjZQ',
  authDomain: 'project-one-f75c6.firebaseapp.com',
  databaseURL: 'https://project-one-f75c6.firebaseio.com',
  projectId: 'project-one-f75c6',
  storageBucket: 'project-one-f75c6.appspot.com',
  messagingSenderId: '272761884868',
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding users
$('#add-user-btn').on('click', (event) => {
  event.preventDefault();

  // Grabs user input
  var userName = $('#name-input').val().trim();
  var userBirth = $('#birth-input').val().trim();

  // user Info
  // console.log('userStart: ' + userStart);

  // Creates local "newuser" object for holding user data
  var newuser = {
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
