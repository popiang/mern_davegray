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
	   - use !fs.existStync(path.join(__dirname, "..", "logs"))
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
8. install cors and use it as middleware
9. create config folder and create allowedOrigins.js file
   - create an array called allowedOrigins and set the allowed url to call our backend
   - export the array 
10. create corsOptions.js file in config folder
    - require allowedOrigins
	- create corsOptions object the set the options
	  - origin - refer lessage
	  - credentials : true
	  - optionsSuccessStatus : 200
	- export corsOptions
11. in server file require corsOptions and put it the options in cors middleware