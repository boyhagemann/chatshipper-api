var express = require('express')
var app = express()
var fetch = require('isomorphic-fetch')
var firebase = require('firebase')
var cors = require('cors')

app.use(cors())


// Initialize Firebase
 var config = {
   apiKey: "AIzaSyCtlLjOM77psPuIhen0xXaAP9nWI1Io1lw",
   authDomain: "chatshipper-demo.firebaseapp.com",
   databaseURL: "https://chatshipper-demo.firebaseio.com",
   storageBucket: "chatshipper-demo.appspot.com",
   messagingSenderId: "928848885077"
 };
 firebase.initializeApp(config);


 app.get('/selection', function (req, res) {

   firebase.database().ref('/places').once('value').then(function(snapshot) {
     res.json(snapshot.val())
   })
 });

app.get('/save/:id/:name', function (req, res) {

  const id = req.params.id
  const name = req.params.name

  firebase.database().ref('/places/' + id).set({
    id: id,
    name: name
  })

  res.json({
    status: "ok"
  })
});

app.get('/search/:query', function (req, res) {

  const q = req.params.query;

  fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyDLy2CJ6vd5Iy1fDGlRksltNukJLhCBtLg&query=' + q + '&language=nl', {
     mode: 'cors'
   })
     .then( function(response) {

        // console.log(response.status)
         if (response.status >= 400) {
             throw new Error("Bad response from server")
         }
        //  console.log(response.json())
         return response.json()
     })
     .then(
       function(response) {
         console.log(response)
         res.json(response);
       },
       function(error) {
         console.log(error)
         res.json(error)
       }
     )

})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
