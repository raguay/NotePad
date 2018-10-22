component NoteBar {
   connect Style.Store exposing { getTargetColors }

   style notebarstyle {
      display: flex;
      flex-direction: row;
      height: 40px;
      max-height: 40px;
      align-items: baseline;
      -webkit-user-select: none;        
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color:transparent;
      outline-style:none;
      justify-content: center;
   }

   fun render : Html {
      <div::notebarstyle>
         <CircleTarget id={ 0 } color={ getTargetColors(0) } />
         <CircleTarget id={ 1 } color={ getTargetColors(1) } />
         <CircleTarget id={ 2 } color={ getTargetColors(2) } />
         <CircleTarget id={ 3 } color={ getTargetColors(3) } />
         <CircleTarget id={ 4 } color={ getTargetColors(4) } />
         <CircleTarget id={ 5 } color={ getTargetColors(5) } />
         <CircleTarget id={ 6 } color={ getTargetColors(6) } />
         <CircleTarget id={ 7 } color={ getTargetColors(7) } />
         <CircleTarget id={ 8 } color={ getTargetColors(8) } />
      </div>
   }
}


