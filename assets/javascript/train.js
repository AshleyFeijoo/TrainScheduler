
// var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
var trainName = "";
var trainDestin = "";
var trainTime;
var trainFreq = "";
var currentTime = moment();
var csKey = "";
var cs;
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

function getTimeFromMins(mins) {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    if (mins >= 24 * 60 || mins < 0) {
        throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
    }
    var h = mins / 60 | 0,
        m = mins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format("HH:mm");
}


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
        $("form").trigger("reset");

        //pushes the information to firebase
        database.ref().push({
            trainName: trainName,
            trainDestin: trainDestin,
            trainFreq: trainFreq,
            trainTime: trainTime
          });
          return trainTime;
    }); 



    database.ref().on("child_added", function(childSnapshot) {
        cs = childSnapshot.val();
        	   // Declare variable
        console.log(cs)
        csKey = childSnapshot.key;
        console.log(childSnapshot.key)
       var tf = cs.trainFreq;
	  // Current Time
        // var currentTime = moment();
        var firstTime = cs.trainTime;

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
 
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


        var tRemainder = diffTime % tf;
        
        var timeUntilTrain = tf - tRemainder;

        var nextTrain = moment().add(timeUntilTrain, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm A");


        $('#train-table').append('<thead>' +
        '<tr>'+
        '<th><button class="btn btn-xs butt btn-danger"'+  'id="' + csKey + '"' + 'type="button">x</button></th>'+
        '<th>' + cs.trainName + '</th>' + 
       '<th>' + cs.trainDestin + '</th>'+
       '<th>' + cs.trainFreq + '</th>'+
       '<th>' + nextTrain + '</th>'+
       '<th>' + timeUntilTrain + '</th>'+
       '</tr>'+
       '</thead>'
       )

    

 
       $(".butt").click(function(){
        if (confirm("Are you sure?")) {
            Rkey = (this.id);
            console.log(Rkey)
            database.ref().child(Rkey).remove();
            window.location.reload();
      }
      return false;
       
    });

    });


}); //end document ready