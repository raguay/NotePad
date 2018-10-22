store Style.Store {
   state targetColors : Array(String) = [ "#CC5A7B", "#E47D98", "#FF8CAA", "#FFBBD0", "#F1C0CC", "#F9E2EA", "#C2B1DB", "#B09BD2", "#8279AC" ]
   state appBackground : String = "#191b1e"
   state textColor : String = "#aba8a9"
   state editorBackground : String = "#013948"
   state editorTheme : String = "oceanic-next"
   state shadowColor : String = "#0D1E2A"
   state selectionBackgroundColor : String = "white"
   state selectionColor : String = "gray"

   state progName : String = "NotePad"

   fun getTargetColors( id : Number ) : String {
      Maybe.withDefault("",Array.at(id, targetColors))
   }
}
