//
// Name:          NotePadServer
//
// Description:   This is the server for running my NotePad NW.js application.
//
// Author:        Richard Guay
//
const express = require('express')
const bodyParser = require('body-parser')
const os = require('os')
const fs = require('fs')
const path = require('path')

//
// Create the Express application and set all middleware.
//
const app = express()

//
// Create the connection.
//
const http = require('http').createServer(app)

//
// Define some globals:
//
const HOME = os.homedir()

var NOTES = null
const NOTESDIR = HOME + '/.notepad'
const NOTESFILELOC = HOME + '/.notepad/notes.json'

const HOSTNAME = 'localhost'
const PORTNUMBER = 9900
var CONNECTED = false

//
// Function:         getNote
//
// Description:      This function get the specified note from the
//                   global variable making sure that it was read
//                   from disk as well.
//
// Inputs:
//                   noteid      The id of the note to get.
//
function getNote(noteid) {
  readNotesFile()
  return(NOTES[noteid])
}

//
// Function:         putNote
//
// Description:      This function saves the note to the harddrive.
//
// Inputs:
//                   noteid        The id of the note to save
//                   body          The body of the note.
//
function putNote(noteid, body) {
  if((body === null) || (typeof body === 'undefined')) {
    body = ""
  }
  readNotesFile()
  NOTES[noteid] = body
  writeNotesFile()
  return("saved")
}

//
// Function:         writeNotesFile
//
// Description:      This function actually writes the notes to the file.
//
function writeNotesFile() {
  fs.writeFileSync(NOTESFILELOC, JSON.stringify(NOTES) , 'utf-8', 0o666, 'w+')  
}

//
// Function:         readNotesFile
//
// Description:      This function reads the notes file and gets all the notes.
//
function readNotesFile() {
  if(NOTES === null) {
    if(fs.existsSync(NOTESFILELOC)) {
      NOTES = JSON.parse(fs.readFileSync(NOTESFILELOC, 'utf8'))
    } else {
      NOTES = []
      NOTES[1] = ""
      NOTES[2] = ""
      NOTES[3] = ""
      NOTES[4] = ""
      NOTES[5] = ""
      NOTES[6] = ""
      NOTES[7] = ""
      NOTES[8] = ""
      NOTES[9] = ""
      writeNotesFile()
    }
  }
}

app.use(/.*/,(req, res, next) => {
  //
  // We need to do some security checking on all the other, non-API calls.
  //
  var okay = true
  var requesterIP = req.ip.split('.')
  var localIP = req.connection.localAddress.split('.')
  if ((requesterIP[0] === localIP[0])&&(requesterIP[1] === localIP[1])&&(requesterIP[2] === localIP[2])&&(requesterIP[3] === localIP[3])) {
    //
    // Okay, the request is from our computer. You can allow it.
    //
    okay = true
  } else {
    okay = false
  }

  //
  // If okay is true, proceed. Otherwise, just drop out.
  //
  if(okay) {
    next()
  }
})

//
// Sever the static files.
//
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'png'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use('/js', express.static(path.join(__dirname, '/notepad/js'), options))
app.use('/editorThemes', express.static(path.join(__dirname, '/notepad/editorThemes'), options))
app.use('/css', express.static(path.join(__dirname, '/notepad/css'), options))
app.use('/np', express.static(path.join(__dirname, '/notepad'), options))

//
// Get request on the main site.
//
app.get('/np', (req, res, next) => res.send(fs.readFileSync(__dirname + '/notepad/index.html', 'utf8')))

//
// A request to shut it all down.
//
app.put('/quit',(req, res, next) => {
  res.send("okay")
  server.close()
  nw.App.closeAllWindows()
  nw.App.quit()
})

//
// If not already stopped, process the body as JSON.
//
app.use(bodyParser.json())                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//
// A request for a note.
//
app.route('/note/:noteID(\\d+)')
.get((req, res, next) => {
  var note = getNote(req.params.noteID)
  res.json({ note: note })
})
.put((req, res, next) => {
  putNote(req.params.noteID, req.body.note)
  res.json({error: 0})
})

//
// Start the server.
//
try {
   var server = http.listen(PORTNUMBER)
} catch (e) {
  console.log(e)
}

