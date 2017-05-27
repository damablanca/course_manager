<!DOCTYPE html>
<html>
<head>
    <title>Courses</title>
    <meta charset="utf-8" />
    <link href="coursesStyle.css" rel="stylesheet" />
    
</head>
<body>
    <!-- The title on the page of the website -->
    <div id ="page_title">
        <h1>Course management website</h1>
    </div>
    
    <!-- The first container -->
    <div id="content_one">
        <!-- Available courses shown to user -->
        <div id="course_container">

        </div>

        <!-- Selected courses container -->
        <div id="selected_courses">
            <h2>Selected courses:</h2>
        </div>
        
    </div>
    
    <!-- Adding new courses container -->
	
    <!--<div id="adding_courses"> -->
	<form>
		Course name:<br>
		<input type="text" id="inputName" /><br>
		Credits:<br>
		<input type="number" id="inputCredits" /><br>
		Timing:<br>
		<input type="text" id="inputTiming" /><br>
		Language:<br>
		<input type="text" id="inputLanguage" /><br>
		Type:<br>
		<input type="text" id="inputType" /><br>
        <button onclick="addCourseToContainer();">Add course to selected list</button>
	</form>
	<!-- </div> -->
    
    
    <!-- Running JavaScript -->
    <script src="courseJavaScript.js"></script>
</body>

</html>
