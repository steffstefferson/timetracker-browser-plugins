
var userKey = "stefkaeser";

var initPluginScript = function () {
	console.log('initPluginScript');
	chrome.storage.sync.get({
    userKey: ''
  }, function (options) {
		console.log('plugin settings loaded with options: ', options);
		userKey = options.userKey  || 'stefkaeser';
	});
	setInterval(checkTimeLogMaskIsVisible,200);
}

  function insertFor(userKey,title,workingDate,timeSpent){
		console.log('insertFor: ',{userKey,title,workingDate,timeSpent});

		  firebase.database().ref('users/' + userKey+'/'+new Date().getTime()).set({
			title: title,
			workingDate: workingDate,
			timeSpentInSeconds : timeSpent
		  });
}

function jiraTimeToSeconds(jiraTime){
  jiraTime = jiraTime.toLowerCase();

  var hours = +(jiraTime.match(/\d+h/g) && jiraTime.match(/\d+h/g)[0].replace("h","")) || 0;
  var minutes = +(jiraTime.match(/\d+m/g) && jiraTime.match(/\d+m/g)[0].replace("m","")) || 0;
  var weeks = +(jiraTime.match(/\d+w/g) && jiraTime.match(/\d+w/g)[0].replace("w","")) || 0;
  var days = +(jiraTime.match(/\d+d/g) && jiraTime.match(/\d+d/g)[0].replace("d","")) || 0;

  return minutes * 60 + hours * 60 * 60 + days * 60 * 60 * 8.5 + weeks * 60 * 60 * 8.5 * 5;
  
  }
  
  	
	
var saveLoggedValue = function(){ 
	var timeSpent = document.getElementById('log-work-time-logged').value;
	var workingDate = new Date(document.getElementById('log-work-date-logged-date-picker').value).getTime();
	
	const url = location.href;
	const regex = /[a-zA-Z]{3}-\d{1,7}/g;
	var title = url.match(regex)[0];
	
	insertFor(userKey,title,workingDate,jiraTimeToSeconds(timeSpent));
}

var checkTimeLogMaskIsVisible = setInterval(function(){
    var logButton = document.getElementById('log-work-submit');
    var myButton = document.getElementById('log-work-submit-custom');
	if(myButton || !logButton){
		return;
	}
    var newButton = logButton.cloneNode();
    newButton.value = "Log and track";
	newButton.id = "log-work-submit-custom";
    newButton.onclick = saveLoggedValue;
    logButton.parentElement.insertBefore(newButton,logButton);
},2000);

  


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyALjRI8A14Gyq_VrC0yDxdcI7cB-SHjd30",
    authDomain: "timekeeper-78124.firebaseapp.com",
    databaseURL: "https://timekeeper-78124.firebaseio.com",
    projectId: "timekeeper-78124",
    storageBucket: "timekeeper-78124.appspot.com",
    messagingSenderId: "293719761096"
  };
  
  firebase.initializeApp(config);
  initPluginScript();
  
