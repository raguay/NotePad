component NoteEditor {
   connect Notes.Store exposing { currentNote, getCurrentNote, setCurrentNote }
   connect Style.Store exposing { textColor, editorBackground, editorTheme }

   property lnumber : Bool = false
   state curID : Number = 0

   style editor {
      font-family: 'Lucida Console', Monaco, monospace;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      height: 400px;
      width: 480px;
      resize: none;
      background-color: { editorBackground };
      color: { textColor };
      font-size: 15px;
      box-shadow: inset 0px 0px 5px 2px black;
      padding: 7px;
   }

   fun handleChange (value : String) : Promise(Never, Void) {
      sequence {
         if(curID == currentNote) {
            setCurrentNote(value)
         } else {
            sequence {
               setCurrentNote(value)
               next { curID = currentNote }
            }
         }
      }
   }

   get themeFile : Array(String) {
      [ "/np/codemirror/codemirror.css", "/np/editorThemes/" + editorTheme + ".css" ]
   }

   fun render : Html {
      <div::editor id={"editorDiv"}>
         <CodeMirror
            onChange={handleChange}
            value={ getCurrentNote() }
            theme={ editorTheme }
            mode="markdown"
            javascripts=[
               "/np/codemirror/codemirror.js",
               "/np/codemirror/markdown.js"
            ]
            lineNumbers={lnumber}
            styles={ themeFile }
         />
      </div>
   }
}
