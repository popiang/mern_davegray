# lesson 2

1. add express.json() middleware
2. create middlewares folder and create logger.js file
    - install date-fns & uuid
    - require format from date-fns
    - require uuid from v4:uuid
    - require fs and fsPromises
    - require path
    - create helper async function logEvents which accept message and logFileName
        - create dateTime const - refer lesson
        - it is the date and time when the logging occurs
        - use the format function from date-fns
    - create logItem const - refer lesson
        - create log line with the datetime and message
    - use try catch
    - check if logs directory does not exist, create one
        - use !fs.existStync(path.join(\_\_dirname, "..", "logs"))
    - append logItem to the log file
    - console log any error
3. create the logger middleware function
    - call log events function and sent the message and filename
        - message: ${req.method}\t${req.url}\t${req.headers.origin}
    - filename: reqLog.log
    - call next()
4. export both of the functions
5. require logger in server.js and add as middleware at the top
6. create errorHandler file in middleware folder
    - require(logEvents)
    - create errorHandler middleware function
        - call logEvents
          message: ${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}
          filename: errLog.log
    - console log err.stack for developer
    - get the status code, if error status code is available, use it, if not then use 500
    - set the status in res
    - set the json with the error message
    - export errorHandler
7. require errorHandler in server.js and use it as middleware at the bottom before listening to request
8. install cookie-parser, require in server.js and use it as middleware
9. install cors and use it as middleware
10. create config folder and create allowedOrigins.js file

-   create an array called allowedOrigins and set the allowed url to call our backend
-   export the array

11. create corsOptions.js file in config folder
    -   require allowedOrigins
    -   create corsOptions object the set the options
        -   origin - refer lessage
        -   credentials : true
        -   optionsSuccessStatus : 200
    -   export corsOptions
12. in server file require corsOptions and put it the options in cors middleware

# lesson 3

1. install dotenv and require and config at the top of server.js
2. create .env file and add NODE_ENV=development
3. create mongodb database techNotesDB and users table and get the connection string
4. put the connection string in .env file
5. install mongoose and mongoose-sequence
6. create models folder and create User.js file
    - in User.js, require mongoose and create the schema
    - the schema, refer lesson
    - export User model
7. create Note.js file in models folder
    - require mongoose
    - require mongoose-sequence(mongoose) and assign to AuthIncrement
    - create noteSchema, the schema refer lesson
    - add timestamps
    - add plugin for auto increment
        - noteSchema.plugins(AuthIncrement, {})
    - the options, refer lesson
    - export Note model
8. in config folder create dbConn.js
    - require mongoose
    - create connectDB async function, try catch and create connection
    - export connectDB
9. in server.js, require mongoose, connectDB, logEvents
    - at the top, log the node environment for development reference
    - below it, call connectDB function
    - at the bottom of the file, before listen to request
        - mongoose.connection.once('open', ()=>{})
    - log successful connection message in the callback function
    - bring the app.listen into the callback funtion as well
    - add mongoose error connection handler
        - mongoose.connection.on("error, (error) => {})
    - in the call back, console.log the error and then call logEvents to log the error in mongoErrLog.log
        - message: ${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}
        - filename: mongoErrLog.log
