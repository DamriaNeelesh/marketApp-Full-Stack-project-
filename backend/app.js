 const CosmosClient = require('@azure/cosmos').CosmosClient
 const config = require('./config')
 const TaskList = require('./routes/tasklist')
 const TaskDao = require('./models/taskDao')

 const express = require('express')
 const app = express()
 app.use(express.json());
 const path = require('path')
 const logger = require('morgan')
 const cookieParser = require('cookie-parser')
 const bodyParser = require('body-parser')

 // view engine setup
//  app.set('views', path.join(__dirname, 'views'))
//  app.set('view engine', 'jade')

 // uncomment after placing your favicon in /public
 //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 app.use(logger('dev'))
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(cookieParser())
//  app.use(express.static(path.join(__dirname, 'public')))

 //Todo App:
 const cosmosClient = new CosmosClient({
   endpoint: config.host,
   key: config.authKey
 })
 const taskDao = new TaskDao(cosmosClient, config.databaseId, config.containerId)
 const taskList = new TaskList(taskDao)
 taskDao
   .init(err => {
     console.error(err)
   })
   .catch(err => {
     console.error(err)
     console.error(
       'Shutting down because there was an error settinig up the database.'
     )
     process.exit(1)
   })
      
// Below code is to set up the api url from backend 
 app.get('/api', (req, res) => {
    taskList.showTasks()
     .then(data => 
      {
        // console.log('data', data)
        res.json({"data": data})
      })
     .catch(err => err) 
 })
 

 app.post('/addtask', (req, res, next) => taskList.addTask(req, res).catch(next))
 app.post('/completetask', (req, res, next) =>
   taskList.completeTask(req, res).catch(next)
 )

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   const err = new Error('Not Found')
   err.status = 404
   next(err)
 })

 const port = 3001 // Adding the port for backend
 // Listening to the port 
 app.listen(port,()=>{
  console.log(`Backend App listening at http://localhost:${port}`)
 })

 // error handler
 app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message
   res.locals.error = req.app.get('env') === 'development' ? err : {}

   // render the error page
   res.status(err.status || 500)
   res.status(500).json({message: 'error'})
 })

 module.exports = app