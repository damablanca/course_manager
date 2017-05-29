// ----- JSONtext
// Creating JSON for the courses which already exist when user logs in
// For the images I used googles "Saa käyttää uudelleen ja muokata" search option in order to not use copyrighted photos

/*var JSONtext = '[{"courseName":"Mobile programming","Credits":"5","Timing":"4th semester","Language":"English","Type":"Compulsory","imageName":"https://static.pexels.com/photos/270557/pexels-photo-270557.jpeg"}'
+ ',{"courseName":"Server Technologies","Credits":"5","Timing":"3rd semester","Language":"English","Type":"Compulsory","imageName":"https://upload.wikimedia.org/wikipedia/commons/e/e0/A_view_of_the_server_room_at_The_National_Archives.jpg"}'
+ ',{"courseName":"Finnish for beginners","Credits":"3","Timing":"2nd semester","Language":"Finnish","Type":"Compulsory","imageName":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/2000px-Flag_of_Finland.svg.png"}'
+ ',{"courseName":"3D printing","Credits":"5","Timing":"none","Language":"English","Type":"Optional","imageName":"https://upload.wikimedia.org/wikipedia/commons/b/b8/Felix_3D_Printer_-_Printing_Head.JPG"}]';
*/

//////////////////////////////////////////////////////////////////////////////
// ----- Showing courses on html page (homePage.html) (the courses with pictures above them)
var i;
var a;
var courses;

function listCoursesOnPage() {
    "use strict";
	 var JSONfile = "http://proto451.haaga-helia.fi/5575/courses";
	
    var http_request = new XMLHttpRequest();


    try {
        // Opera 8.0+, Firefox, Chrome, Safari
        http_request = new XMLHttpRequest();
    } catch (ex1) {
        // Internet Explorer Browsers
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");

        } catch (ex2) {

            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (ex3) {
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }

        }
    }
	
	 http_request.onreadystatechange = function () {
        if (http_request.readyState === 4) {
			
			courses = JSON.parse(http_request.responseText);
    
			var containerElement = document.getElementById("course_container");
			containerElement.innerHTML = "";
		
			for (i = 0; i < courses.length; i++) {
				
				var divElement = document.createElement("div");
				var imgElement = document.createElement("img");
				var pElement = document.createElement("p");
				
				imgElement.setAttribute("src", courses[i].imageName);
				imgElement.setAttribute("class", "courseImageList");
				divElement.appendChild(imgElement);
				
				pElement.innerHTML = courses[i].courseName + ", Credits: " + courses[i].credits;
				pElement.setAttribute("class", "courseInfoList");
				divElement.appendChild(pElement);
				
				divElement.setAttribute("class", "courseDivList");
				divElement.setAttribute("onclick", "showOnlyThisCourseWithBiggerImage(" + i + ");");
				containerElement.appendChild(divElement);
				
			}   
		}
	};
http_request.open("GET", JSONfile, true);
    http_request.send();
}

//calling the method
listCoursesOnPage();

//////////////////////////////////////////////////////////////////////////////
// ------ Showing course image as bigger and more info on course

function showOnlyThisCourseWithBiggerImage(index) {
    var containerElement = document.getElementById("course_container");
    containerElement.innerHTML = "";
    
    
        var divElement = document.createElement("div");
        var imgElement = document.createElement("img");
        var pElement = document.createElement("p");
        
        imgElement.setAttribute("src", courses[index].imageName);
        imgElement.setAttribute("class", "courseImageAlone");        
        divElement.appendChild(imgElement);
        
        pElement.innerHTML = "Course name: " + courses[index].courseName + ", Credits: " + courses[index].Credits + ", Timing: " 
                            + courses[index].Timing + ", Language: " + courses[index].Language + ", Type: " + courses[index].Type;
        pElement.setAttribute("class", "courseInfoAlone");
        divElement.appendChild(pElement);
        
        divElement.setAttribute("class", "courseDivAlone");
        divElement.setAttribute("onclick", "listCoursesOnPage();");
        containerElement.appendChild(divElement);
}




//////////////////////////////////////////////////////////////////////////////
// ------ Adding new courses

//Creating a course object
function Course(cName, cCredits, cTiming, cLanguage, cType) {
    "use strict";
    this.cName = cName;
    this.cCredits = cCredits;
    this.cTiming = cTiming;
    this.cLanguage = cLanguage;
    this.cType = cType;
    
    this.toString = function () {
        var output = "Name: " + this.cName + ", Credits: " + this.cCredits + ", Timing: " + this.cTiming + ", Language: " +  this.cLanguage + ", Type: " + this.cType;
        console.log(output);
        return output;
    }
}

var courseArray = [];


function writeCourseArrayToWebStorage() {
    // Serializing JavaScript objects into Json text/String
    var JSONtext = JSON.stringify(courseArray);
    
    // Saving to Web storage
    sessionStorage.setItem("courseArrayString", JSONtext);
}

function readCourseArrayFromWebStorage() {
    // Fetching JSOntext from Web storage
    var JSONtext = sessionStorage.getItem("courseArrayString");
    
    // Deserializing JavaScript objects from Json text/String
    courseArray = JSON.parse(JSONtext);
    
   
}

function displayCourseListOnScreen() {
    if (courseArray !== null && courseArray.length > 0) {
    var parentElement = document.getElementById("courseList");
    parentElement.innerHTML = "";
    
    
        for (a=0; a < courseArray.length; a++) {
            childElement = document.createElement("li");
            childElement.innerHTML = courseArray[a].toString();
            parentElement.appendChild(childElement);
        }
    }
    
}

function addCCourseToList() {
    "use strict";
    // Reading index.html input
    var cName = document.getElementById("inputCName").value;
    var cCredits = document.getElementById("inputCCredits").value;
    var cTiming = document.getElementById("inputCTiming").value;
    var cLanguage = document.getElementById("inputCLanguage").value;
    var cType = document.getElementById("inputCType").value;
    
    //Adding new course to list
    var courseTemp = new Course(cName, cCredits, cTiming, cLanguage, cType);
    courseArray.push(courseTemp);
    
    //Saving to web storage
    writeCourseArrayToWebStorage();
    
    //Making input fields empty
    document.getElementById("inputCName").value = "";
    document.getElementById("inputCCredits").value = "";
    document.getElementById("inputCTiming").value = "";
    document.getElementById("inputCLanguage").value = "";
    document.getElementById("inputCType").value = "";
    
    // Display list on screen
    displayCourseListOnScreen();
}





////////////////////////////////////////////////////////////////////////////////////
// ------ Geolocation functions
var x = document.getElementById("location");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation not support with your browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

//////////////////////////////////////////////////////////////////////////////
// ------ Sidebar navigator functions

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//////////////////////////////////////////////////////////////////////////////
// ------ Adding courses function

function addCourseToListSelected(){
    var ul = document.getElementById("selected_list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("Course"));
    ul.appendChild(li);
}

//////////////////////////////////////////////////////////////////////////////
// ------- Angular function for the goals, removing them and adding new ones

angular.module('goalApp', [])
  .controller('GoalListController', function() {
    var goalList = this;
    goalList.goals = [
      {text:'Choose compulosry courses', done:false},
      {text:'Choose optional courses', done:false},
      {text:'Choose 60 credits worth of courses', done:false}];

    goalList.addGoal = function() {
      goalList.goals.push({text:goalList.goalText, done:false});
      goalList.goalText = '';
    };

    goalList.remaining = function() {
      var count = 0;
      angular.forEach(goalList.goals, function(goal) {
        count += goal.done ? 0 : 1;
      });
      return count;
    };

    goalList.archive = function() {
      var oldGoals = goalList.goals;
      goalList.goals = [];
      angular.forEach(oldGoals, function(goal) {
        if (!goal.done) goalList.goals.push(goal);
      });
    };
  });


// ----------- Executing the JavaScript functions
// ------- Running functions

listCoursesOnPage();
