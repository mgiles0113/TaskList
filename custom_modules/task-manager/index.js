'use strict'

const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

class TaskManager {

	constructor() {
		global.fl.log('INFO', 'MODULE_CUSTOM', 'TaskManager, Constructing a TaskManager object');
	}

	addTask(name, description) {
		var p = new Promise((resolve, reject) => {
			MongoClient.connect('mongodb://localhost:27017/taskList').then(db => {
				if (!db) {
					reject('error - db connection failed');
				} else {
					db.collection('tasks').insertOne( {
						'name' : name,
						'active' : '1'
					}, function(err, result) {
						console.log(result);
						if (err) {
							reject(err);
						} else {
							resolve('Inserted!');	
						}
					});
				}
			});
		});

		return p;
	}

	deleteTask(id) {
		var p = new Promise((resolve, reject) => {
			MongoClient.connect('mongodb://localhost:27017/taskList').then(db => {
				if (!db) {
					reject('error - db connection failed');
				} else {
					console.log('deleting id: ' + id);
					var query = { "_id" : new mongodb.ObjectId(id) };
					console.log(query);
					db.collection('tasks').remove(query, function(err, result) {
						console.log(result);
						if (err) {
							reject(err);
						} else {
							resolve('Deleted');
						}
					})
				}
			});
		});

		return p;
	}

	getAll() {
		var p = new Promise((resolve, reject) => {
			MongoClient.connect('mongodb://localhost:27017/taskList').then(db => {
				if (!db) {
					reject('error - db connection failed');
				} else {
					db.collection('tasks').find({}, function(err, cursor) {
						if (err) {
							reject(err);
						} else {
							readAllDocs(cursor).then(r => {
								resolve(r);
							});
						}
					});
				}
			});
		});

		return p;
	}
};

function readAllDocs(cursor) {
	var docs = [];
	var p = new Promise((resolve, reject) => {
		cursor.each(function(err, doc) {
			if (err) {
				reject(err);
			}
			if (doc) {
				docs.push(doc);
			} else {
				resolve(docs);
			}
		});
	});

	return p;
};

module.exports = TaskManager;