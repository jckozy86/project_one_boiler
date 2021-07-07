// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBzKFQGZSMNyfwDCAqpdgRL1MgRiTWoAYY',
  authDomain: 'zodiac-friends-yo.firebaseapp.com',
  databaseURL: 'https://zodiac-friends-yo.firebaseio.com',
  projectId: 'zodiac-friends-yo',
  storageBucket: 'zodiac-friends-yo.appspot.com',
  messagingSenderId: '67690482617',
};
firebase.initializeApp(config);

const database = firebase.database();

let userName = '';
let userBirth = '';
let userZodiac = '';

// 2. Button for adding users
$('#submit-button').on('click', (event) => {
  event.preventDefault();

  // Grabs user input
  userBirth = $('#birth-input').val().trim();

  findZodiacSign();
  apiCall();


  // user Info
 

  // Creates local "newuser" object for holding user data
  const newuser = {
    name: userName,
    birth: userBirth,
    zodiac: userZodiac,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  };

  // Uploads user data to the database
  database.ref().push(newuser);

  // Logs everything to console
  // //console.log('user Name: ' + newuser.name);
  // //console.log('user Birth: ' + newuser.birth);

  // alert("user successfully added");

  // Clears all of the text-boxes
  $('#name-input').val('');
  $('#birth-input').val('');
});


function findZodiacSign() {
  const userMonth = parseInt(moment(userBirth).format('M'));
  const userDay = parseInt(moment(userBirth).format('D'));

  if (userMonth == 1) {
    if (userDay >= 20) {
      userZodiac = 'Aquarius';
    } else {
      userZodiac = 'Capricorn';
    }
  } else if (userMonth == 2) {
    if (userDay >= 19) {
      userZodiac = 'Pisces';
    } else {
      userZodiac = 'Aquarius';
    }
  } else if (userMonth == 3) {
    if (userDay >= 21) {
      userZodiac = 'Aries';
    } else {
      userZodiac = 'Pisces';
    }
  } else if (userMonth == 4) {
    if (userDay >= 20) {
      userZodiac = 'Taurus';
    } else {
      userZodiac = 'Aries';
    }
  } else if (userMonth == 5) {
    if (userDay >= 21) {
      userZodiac = 'Gemini';
    } else {
      userZodiac = 'Taurus';
    }
  } else if (userMonth == 6) {
    if (userDay >= 21) {
      userZodiac = 'Cancer';
    } else {
      userZodiac = 'Gemini';
    }
  } else if (userMonth == 7) {
    if (userDay >= 23) {
      userZodiac = 'Leo';
    } else {
      userZodiac = 'Cancer';
    }
  } else if (userMonth == 8) {
    if (userDay >= 23) {
      userZodiac = 'Virgo';
    } else {
      userZodiac = 'Leo';
    }
  } else if (userMonth == 9) {
    if (userDay >= 23) {
      userZodiac = 'Libra';
    } else {
      userZodiac = 'Virgo';
    }
  } else if (userMonth == 10) {
    if (userDay >= 23) {
      userZodiac = 'Scorpio';
    } else {
      userZodiac = 'Libra';
    }
  } else if (userMonth == 11) {
    if (userDay >= 22) {
      userZodiac = 'Sagittarius';
    } else {
      userZodiac = 'Scorpio';
    }
  } else if (userMonth == 12) {
    if (userDay >= 22) {
      userZodiac = 'Capricorn';
    } else {
      userZodiac = 'Sagittarius';
    }
  }

  //console.log("User zodiac is:" + userZodiac);
}

function apiCall() {
  const zodiac = userZodiac;
  // var queryURL = "https://theastrologer-api.herokuapp.com/api/horoscope/" + zodiac.toLowerCase() + "/today"

  const queryURL = `https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com/horoscope/today/${zodiac.toLowerCase()}`;
  //console.log(queryURL);

  $.ajax({
    url: queryURL,
    // dataType: "jsonp",
    method: 'GET',
  }).then((response) => {
    const horoscopeResult = response.horoscope;

    const horoscopeDiv = $('<div>');
    const p = $('<p>').text(`Today's Horoscope: ${horoscopeResult}`);

    horoscopeDiv.append(p);
    $('#horoscope-view').html(horoscopeDiv);
  });
  
  var gif = userZodiac
  const queryURL2 = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=1&api_key=6cRH8TNjLjtSmUIM1WzjLPxBIlkUd8LX"
  //console.log(queryURL2)
  $.ajax({
    url: queryURL2,
    // dataType: "jsonp",
    method: 'GET',
  }).then((response) => {
    const gifResult = response.data[0].images.fixed_height.url
    const gifDiv = $('<img>').attr("src", gifResult)

    $('#gif-view').html(gifDiv);
  });

}
