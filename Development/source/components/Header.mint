component Header {
   connect Style.Store exposing { appBackground }

   style svgstyle {
      fill-rule:evenodd;
      clip-rule:evenodd;
      stroke-linecap:round;
      stroke-linejoin:round;
      stroke-miterlimit:1.5;
      width: 498px;
      height: 13px;
      top: 1px;
      -webkit-user-select: none;        
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color:transparent;
      outline-style:none;
   }

   style pathstyle {
      stroke:  { appBackground };
      stroke-width: 1px;
      fill:  { appBackground };
   }

   style svgcontainer {
      display: block;
      background-color: rgba(0,0,0,0);
      background-color: rgba(0,0,0,0);
      width: 500px;
      height: 13px;
      color: { appBackground };
      margin: 0px;
      padding: 0px;
      -webkit-user-select: none;        
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color:transparent;
      outline-style:none;
   }

   fun render : Html {
      <div::svgcontainer>
         <svg::svgstyle width="100%" height="100%" viewBox="0 0 500 13" version="1.1" >
            <g transform={"matrix(1.02926,0,0,0.221637,0.154745,0.405861)"}>
               <path::pathstyle d={"M-0.11,53.001C-0.11,53.001 0.743,27.264 17.888,23.717C38.611,19.43 196.453,26.031 219.375,23.717C241.955,21.438 242.755,0.426 242.755,0.426C242.755,0.426 243.343,21.719 263.298,23.717C286.219,26.013 447.943,20.802 468.412,23.717C481.231,25.543 485.575,53.001 485.575,53.001C485.575,53.001 161.785,53.001 -0.11,53.001"} />
            </g>
         </svg>
      </div>
   }
}
