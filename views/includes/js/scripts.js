const addTaskForm = $( '#add-task-form' );
const taskName = $( '#task-name');
const taskDescription = $( '#task-description' );
const taskList = $( '#task-list' );

addTaskForm.submit(function(e) {
	console.log('add task form submitted');
	e.preventDefault();

	$.ajax({
		data : {
			'name' : taskName.val(),
		},
		url : '/api/task',
		success : function(res) {
			loadTasks();
			taskName.val('');
		},
		error : function(res) {
			console.log(res);
		},
		type : 'POST'
	});
});

function loadTasks() {
	taskList.html('');
	$.ajax({
		url : '/api/task',
		success : function(res) {
			for(var i = 0; i < res.length; i++) {
				taskList.append(
					$('<li id="' + res[i]._id + '"><div class="task-name">' + res[i].name + '</div><div class="task-x">X</div></li>')
				);
			}
			$('.task-x').off('click');
			$('.task-x').click(function(e) {
				deleteTask($(e.target).parent().attr('id'));
			});
		},
		error : function(res) {
			console.log(res);
		},
		type : 'GET'
	});
}

function deleteTask(id) {
	console.log(id);
	$.ajax({
		data : {
			'id' : id,
		},
		url : '/api/task',
		success : function(res) {
			console.log(res);
			loadTasks();
		},
		error : function(res) {
			console.log(res);
		},
		type : 'DELETE'
	});
}

loadTasks();