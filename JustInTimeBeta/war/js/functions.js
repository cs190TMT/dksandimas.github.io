/* -------------------------------------------------------------------------
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Copyright (C) JustInTime
 * -------------------------------------------------------------------------
 */

$("#listButton").click(
		function() {
			$("#calendar").hide();
			$("#taskMList").show();
			$("#projectList").show();
			$(this).addClass("radical-simple-button-active");
			$("#calendarButton").addClass("radical-simple-button").removeClass(
					"radical-simple-button-active");
		});

$("#calendarButton").click(
		function() {
			$("#projectList").hide();
			$("#calendar").show();
			$(this).addClass("radical-simple-button-active");
			$("#listButton").addClass("radical-simple-button").removeClass(
					"radical-simple-button-active");
		});

//Functions for Tasks start
function editTaskMaster(id) {
	document.getElementById("name_" + id).disabled = false;
	document.getElementById("detail_" + id).disabled = false;
	document.getElementById("name_" + id).classList.remove("listInput");
	document.getElementById("detail_" + id).classList.remove("listInput");
	document.getElementById("saveButton_" + id).classList.remove("listHiddenButtons");
}

function retrieveTaskMasterList(successMessage) {
	// alert("inside meth");
	$("#taskMList").empty();
			$.ajax({
				url : 'retrieveTaskMasterList',
				type : 'GET',
				data : null,
				success : function(data, status, jqXHR) {
					console.log("data", data);
					if (data.errorList.length == 0) {
						var formattedTaskList = ''
							+ '<div class="row listRow listRowHeader">'
							+ '<div class="col-md-4 listProperty listHeader">Name</div>'
							+ '<div class="col-md-4 listProperty listHeader">Details</div>'
							+ '</div>';
						$
								.each(
										data.taskList,
										function(index, value) {
											formattedTaskList += ''
													+ '<div class="row listRow listRowProperty">'
														+ '<div class="col-md-4 listProperty">'
														+ '<input id="name_'+ value.id +'" class="listInput" type="text" value="'+ value.taskName +'" disabled>'
														+ '</div>'
														+ '<div class="col-md-4 listProperty">'
														+ '<input id="detail_'+ value.id +'" class="listInput" type="text" value="'+ value.taskDetails +'" disabled>'
														+ '</div>'
														+ '<div class="col-md-4 listProperty listButtonsRow">'
														+ '<span id="saveButton_'+ value.id +'" class="glyphicon glyphicon-ok listButtons listHiddenButtons" onclick="updateTaskMaster('+ value.id +')"></span>'
														+ '<span class="glyphicon glyphicon-pencil listButtons" onclick="editTaskMaster('+ value.id +')"></span>'
														+ '</div>'
													+ '</div>';
										});
						if (formattedTaskList == "") {
							formattedTaskList = "<div>No Tasks in the Master List!</div>";
						}
						// alert(formattedTaskList);
						$("#taskMList").html(formattedTaskList);
						if (undefined != successMessage && "" != successMessage) {
							//alert(successMessage);
						}
					} else {
						alert('Failed to retreive tasks masterlist!');
					}
				}
			,
				error : function(jqXHR, status, error) {
					alert("error");
				}
			});
}

function searchTask(taskName) {

	jsonData = {
		data : JSON.stringify({
			taskName : taskName,
		})
	};

	$("#TaskMList").empty();
	$
			.ajax({
				url : 'search',
				type : 'GET',
				data : jsonData,
				success : function(data, status, jqXHR) {
					if (data.errorList.length == 0) {
						var formattedTaskList = "";
						$
								.each(
										data.taskList,
										function(index, value) {

											formattedTaskList += ''
													+ '<div class="row listRow listRowProperty">'
													+ '<div class="col-md-4 listProperty">'
													+ value.taskName
													+ '</div>'
													+ '<div class="col-md-4 listProperty">'
													+ value.taskDetails
													+ '</div>'
													+ '</div>';

										});

						// alert(formattedTaskList);
						$("#TaskMList").html(formattedTaskList);
						// if (undefined != successMessage && "" !=
						// successMessage) {
						// alert(successMessage);
						// }
					} else {
						alert('Failed to retreive tasks masterlist!');
					}
				},
				error : function(jqXHR, status, error) {
					alert("error");
				}
			});
}

function updateTaskMaster(id) {
	// Disabling text field start
	document.getElementById("name_" + id).disabled = true;
	document.getElementById("detail_" + id).disabled = true;
	var nameField = document.getElementById("name_" + id);
	nameField.className = nameField.className + " listInput";
	var detailField = document.getElementById("detail_" + id);
	detailField.className = detailField.className + " listInput";
	var saveButton = document.getElementById("saveButton_" + id);
	saveButton.className = saveButton.className + " listHiddenButtons";
	alert(document.getElementById("name_" + id).value +" "+ document.getElementById("detail_" + id).value);
	// Disabling text field end
	
	// Updating task list code start
	$("#errorDisplay").empty();
	$(".updateErrorDisplay").empty();
	var updateDisplay =  document.getElementById("updateDisplay");
	
	jsonData = {
			data: JSON.stringify({
				id: id,
				taskName: document.getElementById("name_" + id).value,
				taskDetail: document.getElementById("detail_" + id).value,
			})
	};
	
	$.ajax({
		url: 'updateTask',
		type: 'POST',
		data: jsonData,
		dataType: 'json',
		success: function(data, status, jqXHR){
			if(data.errorList.length == 0) {
				retrieveTaskMasterList('Entry updated successfully!');
			} else {
				var msg = "";
				for (var i = 0; i < data.errorList.length; i++) {
					msg += data.errorList[i] + "\n";
				}
				errorDisplay.html(msg);
			}
		},
		error: function(jqXHR, status, error) {
			
		}
	});
	// Updating task list code end
	
}

//Functions for Tasks end

//Functions for Projects start
function editProject(id) {
	document.getElementById("name_" + id).disabled = false;
	document.getElementById("detail_" + id).disabled = false;
	document.getElementById("name_" + id).classList.remove("listInput");
	document.getElementById("detail_" + id).classList.remove("listInput");
	document.getElementById("saveButton_" + id).classList.remove("listHiddenButtons");
}

function retrieveProjectList(successMessage) {
	$("#projectList").empty();
	$
			.ajax({
				url : 'retrieveProjectList',
				type : 'GET',
				data : null,
				success : function(data, status, jqXHR) {
					if (data.errorList.length == 0) {
						var formattedProjectList = ''
							+ '<div class="row listRow listRowHeader">'
							+ '<div class="col-md-4 listProperty listHeader">Name</div>'
							+ '<div class="col-md-4 listProperty listHeader">Details</div>'
							+ '</div>';
						$
								.each(
										data.projectList,
										function(index, value) {
											formattedProjectList += ''
													+ '<a href="/projectPage?projectName=' + value.projectName + '" style="color: black">'
														+ '<div class="row listRow listRowProperty">'
															+ '<div class="col-md-4 listProperty">'
															+ '<input id="name_'+ value.id +'" class="listInput" type="text" value="'+ value.projectName +'" disabled>'
															+ '</div>'
															+ '<div class="col-md-4 listProperty">'
															+ '<input id="detail_'+ value.id +'" class="listInput" type="text" value="'+ value.projectDetails +'" disabled>'
															+ '</div>'
															+ '<div class="col-md-4 listProperty listButtonsRow">'
															+ '<span id="saveButton_'+ value.id +'" class="glyphicon glyphicon-ok listButtons listHiddenButtons" onclick="updateProject('+ value.id +')"></span>'
															+ '<span class="glyphicon glyphicon-pencil listButtons" onclick="editProject('+ value.id +')"></span>'
															+ '</div>'
														+ '</div>'
													+ '</a>';
										});
						if (formattedProjectList == "") {
							formattedProjectList = "<div>No Projects in the Master List!</div>";
						}
						// alert(formattedProjectList);
						$("#projectList").html(formattedProjectList);
						if (undefined != successMessage && "" != successMessage) {
							// alert(successMessage);
						}
					} else {
						alert('Failed to retreive tasks masterlist!');
					}
				},
				error : function(jqXHR, status, error) {
					alert("error");
				}
			});
}

function updateProject(id) {
	// Disabling text field start
	document.getElementById("name_" + id).disabled = true;
	document.getElementById("detail_" + id).disabled = true;
	var nameField = document.getElementById("name_" + id);
	nameField.className = nameField.className + " listInput";
	var detailField = document.getElementById("detail_" + id);
	detailField.className = detailField.className + " listInput";
	var saveButton = document.getElementById("saveButton_" + id);
	saveButton.className = saveButton.className + " listHiddenButtons";
	alert(document.getElementById("name_" + id).value +" "+ document.getElementById("detail_" + id).value);
	// Disabling text field end
	
	// Updating task list code start
	$("#errorDisplay").empty();
	$(".updateErrorDisplay").empty();
	var updateDisplay =  document.getElementById("updateDisplay");
	
	jsonData = {
			data: JSON.stringify({
				id: id,
				projectName: document.getElementById("name_" + id).value,
				projectDetail: document.getElementById("detail_" + id).value,
			})
	};
	
	$.ajax({
		url: 'update',
		type: 'POST',
		data: jsonData,
		dataType: 'json',
		success: function(data, status, jqXHR){
			if(data.errorList.length == 0) {
				retrieveTaskMasterList('Entry updated successfully!');
			} else {
				var msg = "";
				for (var i = 0; i < data.errorList.length; i++) {
					msg += data.errorList[i] + "\n";
				}
				errorDisplay.html(msg);
			}
		},
		error: function(jqXHR, status, error) {
			
		}
	});
	// Updating task list code end
	
}

//Functions for Projects end
/*
function setCalendar() {
	$('#calendar').fullCalendar({
		header : {
			left : 'prev,next today',
			center : 'title',
			right : 'month,basicWeek,basicDay'
		},
		defaultDate : '2015-09-09',
		editable : false,
		eventLimit : true, // allow "more" link when too many events
		events : 'RetrieveTasksForCalendar'
	});
}
*/

function setCalendar2() {
	$.ajax({
		url: 'RetrieveTasksForCalendar',
		type: 'GET',
		data: null,
		success: function(data, status, jqXHR){
			console.log("data", data);
			$('#calendar').fullCalendar({		
				header : {
					left : 'prev,next today',
					center : 'title',
					right : 'month,basicWeek,basicDay'
				},
				defaultDate : '2015-0-12',
				editable : false,
				displayEventTime: false,
				eventLimit : true, // allow "more" link when too many events
				events :  data.events
		})
			},
		error: function(jqXHR, status, error) {
			alert("Hello!");
		}
	});
		
	}


/*
$("#btnAddMasterTask").on("click", function() {
	jsonData = {
			data : JSON.stringify({
				taskName : $('#taskMasterName').val(),
				taskDetails : $('#taskMasterDetails').val()
			})
		};
	$.ajax({
		url : 'addMasterTask',
		type : 'POST',
		data : jsonData,
		dataType : 'json'
		success : function(data, status, jqXHR) {
			if (data.errorList.length == 0) {
				$('#taskMasterName').val();
				$('#taskMasterDetails').val();
				retrieveTaskMasterList('Entry saved successfully!');
			} else {
				var msg = "";
				for (var i = 0; i < data.errorList.length; i++)
					msg += data.errorList[i] + "\n";
				$('#errorDisplay').html(msg);
			}
		},
		error : function(data, status, jqXHR) {
			
		}
	});
});
*/