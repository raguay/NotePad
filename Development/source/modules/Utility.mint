module Utility {
   fun doNothing () : Promise(Never, Void) {
      sequence {
         Promise.never()
      }
   }   

   fun stringIncludes( str1 : String, str2 : String ) : Bool {
      `str1.includes(str2)`
   }
}