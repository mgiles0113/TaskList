'use strict'

// node modules
const express = require('express');
const bodyParser = require('body-parser');

// custom modules
const FileLog = require('./custom_modules/file-log.js');
const TaskManager = require('./custom_modules/task-manager');

// global application properties
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');

// global custom properties
global.fl = new FileLog('true');

// routes
app.get('/', (req, res) => {
	fl.log('INFO', 'HTTP REQUEST', 'GET /');
	res.render('index');
});

app.get('/api/task', (req, res) => {
	fl.log('INFO', 'HTTP REQUEST', 'GET /task');
	var tm = new TaskManager();
	tm.getAll().then(tasks => {
		res.send(tasks);
	});
});

app.delete('/api/task', (req, res) => {
	fl.log('INFO', 'HTTP REQUEST', 'DELETE /task');
	if (!req.body.id) {
		res.send('bad');
	} else {
		var tm = new TaskManager();
		tm.deleteTask(req.body.id).then(r => {
			res.send(r);
		});
	}
});

app.post('/api/task', (req, res) => {
	fl.log('INFO', 'HTTP REQUEST', 'POST /task');
	if (!req.body.name) {
		res.send('bad');
	} else {
		var tm = new TaskManager();
		tm.addTask(req.body.name).then(r => {
			res.send(r);
		});
	}
});

// run application and listen
app.listen(3000, () => {
	fl.log('INFO', 'SYSTEM', 'Application started on localhost: ' + 3000);
});

module.exports = app;