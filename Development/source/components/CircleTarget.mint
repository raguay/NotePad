component CircleTarget {
   connect Notes.Store exposing { currentNote, setCurrentNoteId }

   property color : String = "0xffffff"
   property id : Number = 1

   style base {
      display: inline-block;
      height: { size };
      width: { size };
      border-radius: { size };
      margin: 5px { marginLeftRight } 5px { marginLeftRight };
      padding: 0px;
      background-color:  { color };
      cursor: pointer;
      -webkit-user-select: none;        
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color:transparent;
      outline-style:none;
   }

   get size : String {
      if (currentNote == id) {
         "38px"
      } else {
         "34px"
      }
   }

   get marginLeftRight : String {
      if (currentNote == id) {
         "3px"
      } else {
         "5px"
      }
   }

   fun render : Html {
      <div::base onClick={(event : Html.Event) : Promise(Never, Void) => {sequence { setCurrentNoteId(id) }}}>
      </div>
   }
}