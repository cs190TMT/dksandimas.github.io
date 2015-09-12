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

// Functions for Tasks start
function retrieveTaskMasterList(successMessage) {

	$("#taskMList").empty();
	$
			.ajax({
				url : 'retrieveTaskMasterList',
				type : 'GET',
				data : null,
				success : function(data, status, jqXHR) {
					if (data.errorList.length == 0) {
						var formattedTaskList = '';
						$
								.each(
										data.taskList,
										function(index, value) {
											formattedTaskList += ''
													+ '<div class = "row radical-pin-tasks">'
													+ '<div class = "radical-pin-tasks-name col-lg-3">'
													+ value.taskName
													+ '</div>'
													+ '<div class = "radical-pin-tasks-details col-lg-7">'
													+ value.taskDetails
													+ '</div>'
													+ '<div class = "radical-pin-tasks-name-edit col-lg-3">'
													+ '<input type="text" data-placement="left" class="form-control" oninput = "taskEditChange(this,'
													+ value.id
													+ ')" onfocus = "taskEditChange(this,'
													+ value.id
													+ ')" placeholder="" value="'
													+ value.taskName
													+ '">'
													+ '</div>'
													+ '<div class = "radical-pin-tasks-details-edit col-lg-7 input-group">'
													+ '<textarea class="form-control" oninput = "taskEditChange(this,'
													+ value.id
													+ ')" rows="3">'
													+ value.taskDetails
													+ '</textarea>'
													+ '</div>'
													+ '<div class = "radical-pin-tasks-remove col-lg-10">'
													+ 'Are you sure you want to delete the task <b><span class="removeTaskLabel">'
													+ value.taskName
													+ '</span></b>?'
													+ '<div class="alert alert-warning col-lg-6" role="alert" style="margin-top: 10px; padding:10px;"> This task will also be removed in projects</div>'
													+ '</div>'

													+ '<div class = "radical-pin-tasks-controls col-lg-2 text-right radical-no-padding">'
													+ '<button class="btn btn-sm text-right radical-task-btn-edit" onclick = "taskPinEditMode(this)">'
													+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'
													+ '</button>'

													+ '<button class="btn btn-sm text-right radical-tasks-btn-remove" onclick = "removeClicked(this)">'
													+ '<span class="glyphicon glyphicon-remove" aria-hidden="true" ></span>'
													+ '</button>'

													+ '<button class="btn btn-sm text-right radical-tasks-btn-remove-confirm" onclick = "deleteConfirmed(this,'
													+ value.id
													+ ')">'
													+ 'delete'
													+ '</button>'
													+ '<button class="btn btn-sm text-right radical-task-btn-save" onclick = "updateConfirmed(this, '
													+ value.id
													+ ')">'
													+ 'save'
													+ '</button>'
													+ '<button class="btn btn-sm text-right radical-tasks-btn-cancel" onclick = "taskPinNormalMode(this)">'
													+ 'cancel'
													+ '</button>'
													+ '<button class="btn btn-sm text-right radical-tasks-btn-cancel-2" onclick = "taskPinNormalMode2(this)">'
													+ 'cancel'
													+ '</button>'
													+ '</div>' + '</div>';
										});
						if (formattedTaskList == "") {
							formattedTaskList = "<div>No Tasks in the Master List!</div>";
						}
						// alert(formattedTaskList);
						$("#taskMList").html(formattedTaskList);
						if (undefined != successMessage && "" != successMessage) {
							// alert(successMessage);
						}
					} else {
						alert('Failed to retreive tasks masterlist!');
					}

					tasksReady();
				},
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

	$("#taskMList").empty();
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
													+ '<div class = "row radical-pin-tasks">'
													+ '<div class = "radical-pin-tasks-name col-lg-3">'
													+ value.taskName
													+ '</div>'
													+ '<div class = "radical-pin-tasks-details col-lg-7">'
													+ value.taskDetails
													+ '</div>'
													+ '<div class = "radical-pin-tasks-name-edit col-lg-3">'
													+ '<input type="text" data-placement="left" class="form-control" oninput = "taskEditChange(this,'
													+ value.id
													+ ')" onfocus = "taskEditChange(this,'
													+ value.id
													+ ')" placeholder="" value="'
													+ value.taskName
													+ '">'
													+ '</div>'
													+ '<div class = "radical-pin-tasks-details-edit col-lg-7 input-group">'
													+ '<textarea class="form-control" oninput = "taskEditChange(this,'
													+ value.id
													+ ')" rows="3">'
													+ value.taskDetails
													+ '</textarea>'
													+ '</div>'
													+ '<div class = "radical-pin-tasks-remove col-lg-10">'
													+ 'Are you sure you want to delete the task <b><span class="removeTaskLabel">'
													+ value.taskName
													+ '</span></b>?'
													+ '<div class="alert alert-warning col-lg-6" role="alert" style="margin-top: 10px; padding:10px;"> This task will also be removed in projects</div>'
													+ '</div>'

													+ '<div class = "radical-pin-tasks-controls col-lg-2 text-right radical-no-padding">'
													+ '<button class="btn btn-sm text-right radical-task-btn-edit" onclick = "taskPinEditMode(this)">'
													+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'
													+ '</button>'

													+ '<button class="btn btn-sm text-right radical-tasks-btn-remove" onclick = "removeClicked(this)">'
													+ '<span class="glyphicon glyphicon-remove" aria-hidden="true" ></span>'
													+ '</button>'

													+ '<button class="btn btn-sm text-right radical-tasks-btn-remove-confirm" onclick = "deleteConfirmed(this,'
													+ value.id
													+ ')">'
													+ 'delete'
													+ '</button>'
													+ '<button class="btn btn-sm text-right radical-task-btn-save" onclick = "updateConfirmed(this, '
													+ value.id
													+ ')">'
													+ 'save'
													+ '</button>'
													+ '<button class="btn btn-sm text-right radical-tasks-btn-cancel" onclick = "taskPinNormalMode(this)">'
													+ 'cancel'
													+ '</button>'
													+ '<button class="btn btn-sm text-right radical-tasks-btn-cancel-2" onclick = "taskPinNormalMode2(this)">'
													+ 'cancel'
													+ '</button>'
													+ '</div>' + '</div>';

										});

						// alert(formattedTaskList);
						$("#taskMList").html(formattedTaskList);
						// if (undefined != successMessage && "" !=
						// successMessage) {
						// alert(successMessage);
						// }
					} else {
						alert('Failed to retreive tasks masterlist!');
					}

					tasksReady();
				},
				error : function(jqXHR, status, error) {
					alert("error");
				}
			});
}

function taskEditChange(pin, idVal) {
	pin = $(pin).parent().parent();

	if ($(pin).find(".radical-pin-tasks-name-edit").find("input").val() != "") {
		var name = $(pin).find(".radical-pin-tasks-name-edit").find("input")
				.val();

		jsonData = {
			data : JSON.stringify({
				id : idVal,
				taskName : name
			})
		};

		$.ajax({
			url : 'ValidTaskName',
			type : 'POST',
			data : jsonData,
			dataType : 'json',
			success : function(data, status, jqXHR) {
				if (data.errorList.length == 0) {
					if (data.validate >= 1) {
						$(pin).find(".radical-task-btn-save").addClass(
								"radical-task-btn-save-disabled");
						$(pin).find(".radical-task-btn-save").attr("disabled",
								"disabled");
						$(pin).find(".radical-pin-tasks-name-edit").addClass(
								"has-error");

						$(pin).find(".radical-pin-tasks-name-edit").attr(
								"data-placement", "left");
						$(pin).find(".radical-pin-tasks-name-edit").attr(
								"data-content", "name already exists");
						$(pin).find(".radical-pin-tasks-name-edit").popover(
								"show");
					} else {
						$(pin).find(".radical-task-btn-save").removeClass(
								"radical-task-btn-save-disabled");
						$(pin).find(".radical-task-btn-save").removeAttr(
								"disabled");
						$(pin).find(".radical-pin-tasks-name-edit")
								.removeClass("has-error");

						$(pin).find(".radical-pin-tasks-name-edit").attr(
								"data-placement", "left");
						$(pin).find(".radical-pin-tasks-name-edit").attr(
								"data-content", "");
						$(pin).find(".radical-pin-tasks-name-edit").popover(
								"hide");
					}

				} else {
					alert('Failed to retreive tasks masterlist!');
				}
			},
			error : function(jqXHR, status, error) {
				alert("error " + status + " " + error);
			}
		});
	} else {
		$(pin).find(".radical-task-btn-save").addClass(
				"radical-task-btn-save-disabled");
		$(pin).find(".radical-task-btn-save").attr("disabled", "disabled");
		$(pin).find(".radical-pin-tasks-name-edit").addClass("has-error");

		$(pin).find(".radical-pin-tasks-name-edit").attr("data-placement",
				"left");
		$(pin).find(".radical-pin-tasks-name-edit").attr("data-content",
				"name is required");
		$(pin).find(".radical-pin-tasks-name-edit").popover("show");
	}

}

function taskPinEditMode(pin) {

	pin = $(pin).parent().parent();

	$(pin).find(".radical-pin-tasks-name-edit").find("input").val(
			$(pin).find(".radical-pin-tasks-name").html());
	$(pin).find(".radical-pin-tasks-details-edit").find("textarea").val(
			$(pin).find(".radical-pin-tasks-details").html());

	$(pin).find(".radical-task-btn-save").addClass(
			"radical-task-btn-save-disabled");
	$(pin).find(".radical-task-btn-save").attr("disabled", "disabled");
	$(pin).find(".radical-pin-tasks-name-edit").removeClass("has-error");

	$(pin).find(".radical-task-btn-edit").fadeOut();
	$(pin).find(".radical-tasks-btn-remove").fadeOut();
	$(pin).find(".radical-pin-tasks-name").fadeOut(function() {
		$(pin).find(".radical-pin-tasks-name-edit").fadeIn();
	});
	$(pin).find(".radical-pin-tasks-details").fadeOut(function() {

		$(pin).find(".radical-pin-tasks-details-edit").fadeIn();
		$(pin).find(".radical-task-btn-save").fadeIn();
		$(pin).find(".radical-tasks-btn-cancel").fadeIn();

	});

}

function taskPinNormalMode(pin) {

	pin = $(pin).parent().parent();

	$(pin).find(".radical-pin-tasks-name-edit").attr("data-content", "");
	$(pin).find(".radical-pin-tasks-name-edit").popover("hide");
	$(pin).find(".radical-task-btn-save").fadeOut();
	$(pin).find(".radical-tasks-btn-cancel").fadeOut();

	$(pin).find(".radical-pin-tasks-name-edit").fadeOut(function() {
		$(pin).find(".radical-pin-tasks-name").fadeIn();
	});
	$(pin).find(".radical-pin-tasks-details-edit").fadeOut(function() {
		$(pin).find(".radical-pin-tasks-details").fadeIn();
		$(pin).find(".radical-task-btn-edit").fadeIn();
		$(pin).find(".radical-tasks-btn-remove").fadeIn();
	});

}

function taskPinNormalMode2(pin) {
	pin = $(pin).parent().parent()

	$(pin).find(".radical-pin-tasks-remove").fadeOut();
	$(pin).find(".radical-tasks-btn-remove-confirm").fadeOut();
	$(pin).find(".radical-tasks-btn-cancel-2").fadeOut(function() {
		$(pin).find(".radical-pin-tasks-name").fadeIn();
		$(pin).find(".radical-pin-tasks-details").fadeIn();
		$(pin).find(".radical-task-btn-edit").fadeIn();
		$(pin).find(".radical-tasks-btn-remove").fadeIn(function() {
			$(pin).removeClass("radical-pin-tasks-removed", "200");
		});

	});
}

function tasksReady() {
	$(".radical-pin-tasks-details-edit").hide();
	$(".radical-pin-tasks-name-edit").hide();
	$(".radical-task-btn-save").hide();
	$(".radical-tasks-btn-cancel").hide();
	$(".radical-tasks-btn-remove-confirm").hide();
	$(".radical-tasks-btn-cancel-2").hide();
	$(".radical-pin-tasks-remove").hide();
}

function removeClicked(pin) {
	pin = $(pin).parent().parent();

	$(pin).addClass("radical-pin-tasks-removed", "200");

	$(pin).find(".radical-pin-tasks-name").fadeOut();
	$(pin).find(".radical-pin-tasks-details").fadeOut();
	$(pin).find(".radical-task-btn-edit").fadeOut();
	$(pin).find(".radical-tasks-btn-remove").fadeOut(function() {

		$(pin).find(".radical-pin-tasks-remove").fadeIn();
		$(pin).find(".radical-tasks-btn-remove-confirm").fadeIn();
		$(pin).find(".radical-tasks-btn-cancel-2").fadeIn();
	});

}

function deleteConfirmed(pin, idValue) {
	pin = $(pin).parent().parent();

	jsonData = {
		data : JSON.stringify({
			id : idValue
		})
	};

	$.ajax({
		url : 'delete',
		type : 'POST',
		data : jsonData,
		dataType : 'json',
		success : function(data, status, jqXHR) {
			if (data.errorList.length == 0) {
				$(pin).hide("200", "linear")
				// retrieveTaskMasterList("TaskMasterList");
			} else {
				alert('Failed to retreive tasks masterlist!');
			}
		},
		error : function(jqXHR, status, error) {
			alert("error");
		}
	});

}

function updateConfirmed(btn, idVal) {
	var name = $(btn).parent().parent().find(".radical-pin-tasks-name-edit")
			.find("input").val();
	var details = $(btn).parent().parent().find(
			".radical-pin-tasks-details-edit").find("textarea").val();

	jsonData = {
		data : JSON.stringify({
			id : idVal,
			taskName : name,
			taskDetails : details
		})
	};

	$.ajax({
		url : 'update',
		type : 'POST',
		data : jsonData,
		dataType : 'json',
		success : function(data, status, jqXHR) {
			if (data.errorList.length == 0) {
				$(btn).parent().parent().find(".radical-pin-tasks-name").html(
						name);
				$(btn).parent().parent().find(".radical-pin-tasks-details")
						.html(details);
				taskPinNormalMode(btn);
				// retrieveTaskMasterList("TaskMasterList");
			} else {
				alert('Failed to retreive tasks masterlist!');
			}
		},
		error : function(jqXHR, status, error) {
			alert("error");
		}
	});
}

// Functions for Tasks end

// Functios for Projects start
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
													+ '<a href="/projectPage?projectName='// create
													// a
													// form?
													+ value.projectName
													+ '" style="color: black">'
													+ '<div class="row listRow listRowProperty">'
													+ '<div class="col-md-4 listProperty">'
													+ value.projectName
													+ '</div>'
													+ '<div class="col-md-4 listProperty">'
													+ value.projectDetails
													+ '</div>' + '</div>'
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

// Functios for Projects end

function setCalendar() {
	$('#calendar').fullCalendar({
		header : {
			left : 'prev,next today',
			center : 'title',
			right : 'month,basicWeek,basicDay'
		},
		defaultDate : '2015-02-12',
		editable : false,
		eventLimit : true, // allow "more" link when too many events
		events : [ {
			title : 'All Day Event',
			start : '2015-02-01'
		}, {
			title : 'Long Event',
			start : '2015-02-07',
			end : '2015-02-10'
		}, {
			id : 999,
			title : 'Repeating Event',
			start : '2015-02-09T16:00:00'
		}, {
			id : 999,
			title : 'Repeating Event',
			start : '2015-02-16T16:00:00'
		}, {
			title : 'Conference',
			start : '2015-02-11',
			end : '2015-02-13'
		}, {
			title : 'Meeting',
			start : '2015-02-12T10:30:00',
			end : '2015-02-12T12:30:00'
		}, {
			title : 'Lunch',
			start : '2015-02-12T12:00:00'
		}, {
			title : 'Meeting',
			start : '2015-02-12T14:30:00'
		}, {
			title : 'Happy Hour',
			start : '2015-02-12T17:30:00'
		}, {
			title : 'Dinner',
			start : '2015-02-12T20:00:00'
		}, {
			title : 'Birthday Party',
			start : '2015-02-13T07:00:00'
		}, {
			title : 'Click for Google',
			url : 'http://google.com/',
			start : '2015-02-28'
		} ]
	});
}

function addMasterTask() {
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
		dataType : 'json',
		success : function(data, status, jqXHR) {
			if (data.errorList.length == 0) {
				$('#taskMasterName').val("");
				$('#taskMasterDetails').val("");
				$('#addMasterTaskModal').modal("hide");
				//alert("no error here");
				retrieveTaskMasterList('Entry saved successfully!');
				// alert("dk sandimas");
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
}

function addProject() {
	jsonData = {
		data : JSON.stringify({
			projectName : $('#projectName').val(),
			projectDetails : $('#projectDetails').val()
		})
	};
	
	$.ajax({
		url : 'addProject',
		type : 'POST',
		data : jsonData,
		dataType : 'json',
		success : function(data, status, jqXHR) {
			if (data.errorList.length == 0) {
				$('#projectName').val("");
				$('#projectDetails').val("");
				$('#addProjectModal').modal("hide");
				//alert("no error here");
				retrieveProjectList('Entry saved successfully!');
				// alert("dk sandimas");
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
}