const { Container, Containers } = require("@azure/cosmos");
const { containerId } = require("../config");
const TaskDao = require("../models/taskDao");
// React js code into nodejs
const { useEffect, useState } = require('react');


 class TaskList {
   /**
    * Handles the various APIs for displaying and managing tasks
    * @param {TaskDao} taskDao
    */
   constructor(taskDao) {
     this.taskDao = taskDao;
   }
   
   async showTasks() {
     const querySpec = {
       query: "SELECT * FROM c"
     };

     const items = await this.taskDao.find(querySpec);
     return items
   }

   
   async addTask(req, res) {
     const item = req.body;

     await this.taskDao.addItem(item);
     res.redirect("/");
   }

   async completeTask(req, res) {
     const completedTasks = Object.keys(req.body);
     const tasks = [];

     completedTasks.forEach(task => {
       tasks.push(this.taskDao.updateItem(task));
     });

     await Promise.all(tasks);

     res.redirect("/");
   }
 }

 module.exports = TaskList;