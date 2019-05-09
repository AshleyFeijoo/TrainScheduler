
// var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
var trainName = "";
var trainDestin = "";
var trainTime;
var trainFreq = "";
var currentTime = moment();
var csKey='';
var cs;
// var nextTrain;
var childKey;
var childData;
var formInvalid = false;
let number;


$(document).ready(function () {
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

$("#submit-btn").click(function() {
    event.preventDefault();
    ValidateForm();
  });


  



function ValidateForm() {
  $('#trainForm input:text').each(function() {
    if ($(this).val() === '') {
      formInvalid = true;
    } else {
        getValues();
    }
    // if (formInvalid) alert('One or Two fields are empty. Please fill up all fields');
});
}

    function  getValues(){
        trainName = $('#nameinput').val().trim();
        trainDestin = $('#destininput').val().trim();
        trainTime = $('#timeinput').val().trim();
        trainFreq = $('#freqinput').val().trim();
        $("form").trigger("reset");

        //pushes the information to firebase
        database.ref().push({
            trainName: trainName,
            trainDestin: trainDestin,
            trainFreq: trainFreq,
            trainTime: trainTime
          });
    
    }; 


    database.ref().on("child_added", function(childSnapshot) {
        cs = childSnapshot.val();
        csKey = (childSnapshot.key)
        console.log(csKey)
            var tf = cs.trainFreq;
                // var currentTime = moment();
                var firstTime = cs.trainTime;

                var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        
                var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
                var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

                var tRemainder = diffTime % tf;
                
                var timeUntilTrain = tf - tRemainder;
                console.log(timeUntilTrain)

                var nextTrain = moment().add(timeUntilTrain, "hh:mm");

                nextTrain = moment(nextTrain).format("hh:mm A");
                console.log(nextTrain);

                $('#train-table').append('<thead>' +
                    '<tr>'+
                    '<th><input type="radio" class= "selects" id="select-in" name="record" value="' + csKey + '">' + '</th>'+
                    '<th>' + cs.trainName + '</th>' + 
                    '<th>' + cs.trainDestin + '</th>'+
                    '<th>' + cs.trainFreq + '</th>'+
                    '<th>' + nextTrain + '</th>'+
                    '<th>' + timeUntilTrain + '</th>'+
                    '</tr>'+
                    '</thead>'
            );
    });

       $('.selects').on('click', function(){
        number =$(this).val();
        console.log(number)
        var radioValue = $("input[name='record']:checked").val();
        if(radioValue){
           delbtn();
        }
    });

    $("#deleteMe").click(function(event) {
        event.preventDefault();
        console.log("what the fuck");
        if($('#select-in').prop("checked") == true){
            console.log(csKey)
            database.ref().child(csKey).remove();
            window.onbeforeunload

        }
      });
    


});