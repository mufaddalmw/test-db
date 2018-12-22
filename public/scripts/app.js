// Initialize Firebase
var config = {
    apiKey: "AIzaSyDaWwzb2o8oOhow1eABxluAko3oXKgLW7g",
    authDomain: "test-database-1f6f8.firebaseapp.com",
    databaseURL: "https://test-database-1f6f8.firebaseio.com",
    projectId: "test-database-1f6f8",
    storageBucket: "test-database-1f6f8.appspot.com",
    messagingSenderId: "55800458808"
};
firebase.initializeApp(config);

// Get a reference to the database service
const dbRefUsers = firebase.database().ref().child('users');

const name = document.querySelector('#name');
const submit = document.querySelector('#submit');
const list = document.querySelector('#list');



dbRefUsers.on('child_added', snap => {
    const userData = snap.val()
    const name = userData.name
    const date = userData.date

    const listItem = document.createElement("li");
    const listSmall = document.createElement("small");
    const listStrong = document.createElement("strong");
    
    console.log(userData)

    listSmall.textContent = date
    listStrong.textContent = name
    
    listItem.appendChild(listSmall)
    listItem.appendChild(listStrong)
    
    list.appendChild(listItem);
    
    
    
})





submit.addEventListener('click', e => {
    const val = name.value
    const date = new Date();

    const dateStr = date.toLocaleDateString()
    const timeStr = date.toLocaleTimeString();

    
    firebase.database().ref('/users/').push({
        date: dateStr + ' '+ timeStr,
        name: val,
    })
    .then(function(e){
        // console.log(val, timestamp)
    }).catch(function(error) {
        console.error('Error writing new message to Realtime Database:', error);
    });
})