component Main {
   connect Style.Store exposing { appBackground }
   connect Notes.Store exposing { setCurrentNoteId, currentNote, quitNotePad }

   style outsideContainer {
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
      color: transparent;
      caret-color: transparent;
      background-color: rgba(0,0,0,0);
      margin: 0px;
   }

   style containerBody {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      background-color: { appBackground };
      margin: -1px 0px 0px 0px;
      padding: 10px;
      caret-color: transparent;
      border-radius: 3px 3px 10px 10px;
   }

   fun render : Html {
      <div::outsideContainer contenteditable={"true"} onKeyUp={(event : Html.Event) : Promise(Never, Void) => {
            if (event.ctrlKey && (event.keyCode == 81)) {
               quitNotePad()
            } else {
               Utility.doNothing()
            }
         }
      }>
         <Header />
         <div::containerBody>
            <NoteEditor />
            <NoteBar />
         </div>
      </div>
   }
}

