import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';

Template.task.helpers({
	isOwner: function () {
		return this.owner === Meteor.userId();
	}
});
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, ! this.checked);
  },
  'click .delete'() {
  	if (this.owner !== Meteor.user()._id) {
  		alert("usted no puede eliminar esta tarea");
  		throw new Meteor.Error("not-authorized");
  	}
	Meteor.call('tasks.remove', this._id);
  	
  },
});