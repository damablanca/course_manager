// ----- JSONtext
// Creating JSON for the courses which already exist when user logs in
// For the images I used googles "Saa käyttää uudelleen ja muokata" search option in order to not use copyrighted photos

var JSONtext = '[{"courseName":"Mobile programming","Credits":"5","Timing":"4th semester","Language":"English","Type":"Compulsory","imageName":"https://static.pexels.com/photos/270557/pexels-photo-270557.jpeg"}' 
+ ',{"courseName":"Server Technologies","Credits":"5","Timing":"3rd semester","Language":"English","Type":"Compulsory","imageName":"https://upload.wikimedia.org/wikipedia/commons/e/e0/A_view_of_the_server_room_at_The_National_Archives.jpg"}'
+ ',{"courseName":"Finnish for beginners","Credits":"3","Timing":"2nd semester","Language":"Finnish","Type":"Compulsory","imageName":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/2000px-Flag_of_Finland.svg.png"}'
+ ',{"courseName":"3D printing","Credits":"5","Timing":"none","Language":"English","Type":"Optional","imageName":"https://upload.wikimedia.org/wikipedia/commons/b/b8/Felix_3D_Printer_-_Printing_Head.JPG"}]';



// ----- Showing courses on html page (homePage.html)

function listCoursesOnPage() {
    courses = JSON.parse(JSONtext);
    
    var containerElement = document.getElementById("course_container");
    containerElement.innerHTML = "";
    
    for (var i = 0; i<courses.length; i++) {
        
        var divElement = document.createElement("div");
        var imgElement = document.createElement("img");
        var pElement = document.createElement("p");
        
        imgElement.setAttribute("src", courses[i].imageName);
        imgElement.setAttribute("class", "courseImageList");        
        divElement.appendChild(imgElement);
        
        pElement.innerHTML = courses[i].courseName + ", Credits: " + courses[i].Credits;
        pElement.setAttribute("class", "courseInfoList");
        divElement.appendChild(pElement);
        
        divElement.setAttribute("class", "courseDivList");
        divElement.setAttribute("onclick", "showOnlyThisCourseWithBiggerImage("+i+");");
        containerElement.appendChild(divElement);
        
        
    }
}

// ------ Showing course image as bigger and more info on course

function showOnlyThisCourseWithBiggerImage(index) {
    var containerElement = document.getElementById("course_container");
    containerElement.innerHTML= "";
    
    
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


// ------ Adding new courses

function addCourseToContainer(){
    "use strict";
    // Reading input
    var courseName = document.getElementById("inputName").value;
    var credits = document.getElementById("inputCredits").value;
    var timing = document.getElementById("inputTiming").value;
    var language = document.getElementById("inputLanguage").value;
    var type = document.getElementById("inputType").value;
    
    //Adding new plyaer to collection
    var courseTemp = new Course(courseName, credits, timing, language, type);
    courseArray.push(courseTemp);
    
    //Writing the array also the the web(browser) storage
    writeCourseArrayToWebStorage();
    
    //Clearing input
    document.getElementById("inputName").value = "";
    document.getElementById("inputPoints").value = "";
    
    //Displaying also the the web(browser) storage
    displayCourseListOnScreen();
}


// ------ Getting list of current selected courses

function displayCourseListOnScreen() {
	for (var i = 0; i<courseTemp.length; i++) {
		document.getElementById("courselist").innerHTML = courseTemp[i];
	}
}







// ----------- Executing the JavaScript functions
listCoursesOnPage();
