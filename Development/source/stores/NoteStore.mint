store Notes.Store {
   state notes : Array(String) = ["a","b","c","d","e","f","g","h","i"]
   state currentNote : Number = 0

   fun setCurrentNoteId (id : Number) : Promise(Never, Void) {
      sequence {
         next { currentNote = id } 
      }
   }

   fun setNote (id : Number, text : String) : Promise(Never, Void) {
		sequence {
			next { notes = Array.mapWithIndex((oldText : String, index : Number) : String => {
        if (id == index) {
         	text
				} else {
          oldText
				}}, notes) }
			saveNote(id, text)
		}
   }

   fun setCurrentNote ( text : String ) : Promise(Never, Void) {
      setNote(currentNote, text)
   }

   fun getCurrentNote () : String {
      Maybe.withDefault("",Array.at(currentNote, notes))
   }

    fun loadNotes () : Promise(Never, Void) {
      sequence {
        getNote(1)
        getNote(2)
        getNote(3)
        getNote(4)
        getNote(5)
        getNote(6)
        getNote(7)
        getNote(8)
        getNote(9)
      }
   }
	
	fun getNote (id : Number) : Promise(Never, Void) {
    sequence {
      response = Http.get("http://localhost:9900/note/" + Number.toString(id))
            			|> Http.send()
      noteJson = Json.parse(response.body)
							|> Maybe.toResult("Decode Error")
			note = decode noteJson as NoteObject
			setNote( id - 1, note.note )
    } catch Http.ErrorResponse => error {
        sequence {
          Debug.log(error)
          Promise.never()
        }
		} catch Object.Error => error {
      sequence {
        Debug.log("Could not decode!")
        Promise.never()
      }
    } catch String => error {
      sequence {
        Debug.log("Invalid JSON!")
        Promise.never()
      }
    }
	}
	
  fun saveNote( id : Number, note : String ) : Promise(Never, Void) {
      sequence {
         noteJson = encode {
            note = note
         }
		   response = Http.put("http://localhost:9900/note/" + Number.toString(id + 1))
            |> Http.header("Content-Type", "application/json")
            |> Http.stringBody(Json.stringify(noteJson))
            |> Http.send()
         Promise.never()

      } catch Http.ErrorResponse => error {
         sequence {
    		 	Debug.log(error)
            Promise.never()
         }
		}
	}

  fun quitNotePad() : Promise(Never, Void) {
    sequence {
      response = Http.put("http://localhost:9900/quit")
        |> Http.send()
      Promise.never()

      } catch Http.ErrorResponse => error {
        sequence {
          Debug.log(error)
          Promise.never()
        }
    }
  }
}

record NoteObject {
   note : String
}