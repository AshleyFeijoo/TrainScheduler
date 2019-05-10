
// var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// var trainName = "";
// var trainDestin = "";
// var trainTime;
// var trainFreq = "";
var currentTime = moment();
var csKey = "";
var cs;
var nextTrain = '';

console.log(nextTrain)
$(document).ready(function() {
//firebase Initial
    var firebaseConfig = {
        apiKey: "AIzaSyAF_PFhr47WsaxE5s7iLja9OJUkvPydGR8",
        authDomain: "train-schedule-hw-db2a5.firebaseapp.com",
        databaseURL: "https://train-schedule-hw-db2a5.firebaseio.com",
        projectId: "train-schedule-hw-db2a5",
        storageBucket: "train-schedule-hw-db2a5.appspot.com",
        messagingSenderId: "605255785005",
        appId: "1:605255785005:web:b158522fff3fb319"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

//submit button functions
    $('#submit-btn').on('click', function(){
      
        event.preventDefault();
        trainName = $('#name-input').val().trim();
        trainDestin = $('#destin-input').val().trim();
        trainTime = $('#time-input').val().trim();
        trainFreq = $('#freq-input').val().trim();
    
        var trainTwo = {
            name: trainName,
            destination: trainDestin,
            start: trainTime,
            frequency: trainFreq
        };

        //pushes the information to firebase
        database.ref().push(trainTwo)
        console.log(trainTwo)
        $("form").trigger("reset");

    }); 



    database.ref().on("child_added", function(childSnapshot) {
        var trainName = childSnapshot.val().name;
        var trainDestin = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;
    
        csKey = childSnapshot.key;
        console.log(childSnapshot.key)
        trainFreq;
	  // Current Time
        // var currentTime = moment();
        var trainTime = 0

        var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
 
        var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


        var tRemainder = diffTime % trainFreq;
        
        var timeUntilTrain = trainFreq - tRemainder;

        nextTrain = moment().add(timeUntilTrain, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm A");

        if (nextTrain !== moment()){
        $('#train-table').append('<thead>' +
        '<tr>'+
        '<th><img class="butt" id="' + csKey + '"' +  'style="width:25px; height:25px"  src="./assets/images/x-button.svg"></th>'+
        '<th>' + trainName + '</th>' + 
       '<th>' + trainDestin + '</th>'+
       '<th>' + trainFreq + '</th>'+
       '<th>' + nextTrain + '</th>'+
       '<th>' + timeUntilTrain + '</th>'+
       '</tr>'+
       '</thead>'
       )
        }

       $(".butt").click(function(){
            Rkey = (this.id);
            console.log(Rkey)
            database.ref().child(Rkey).remove();
            window.location.reload();

       
    });

    });


}); //end document ready