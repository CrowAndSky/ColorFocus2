"use strict";

//const /*--------------------- ### DOM elements ### ---------------------*/


/*--------------------- ### App State ### ---------------------*/
let appState,    // state-intro    state-intro-hue   state-lower-room  state-color-preference   state-detail  state-transition state-app-primed

/*--------------------- ### Animation Looping ### ---------------------*/
animLoopIndex,
stillUpdatingDOM = false,
readyToUpdate = false,
mainRAFloop,
x,
i;

let tintScene = function( hue, saturation, luminosity ) {
   // sepia: hsl(38, 24.5%, 60%);
// H:  170 - 38             ->  132°
// S:  100 + (24.5 - 21.3)  ->  103.2%  (relative to base 100% =  3.2%)
// L:  100 + (51.2 - 60.0)  ->   91.2%  (relative to base 100% = -8.8%)
    let H =  hue - 38,
        S =  100 + ( 24.5 - saturation ),
        L =  100 + ( luminosity - 60.0),
        theFilter = `filter: brightness( 50% ) sepia( 1 )  hue-rotate( ${H}deg ) saturate( ${S}% ) brightness( ${L}% )`;

    //filter: brightness(50%) sepia(1)  hue-rotate(132deg) saturate(103.2%) brightness(91.2%);
    console.log('########## theFilter: ' + theFilter);


}
/* ------------------ ### initDOM ### ------------------ */
var initDOM = function( event ) {
    console.log('########## 1');
    $( '.color-list__button' ).click( function(){
        tintScene( 11.02301, 53.0004346724, 53.002438 );
    })
};


/* ------------------ ### wwwwwwww ### ------------------ */
/* ------------------ ### wwwwwwww ### ------------------ */
/* ------------------ ### wwwwwwww ### ------------------ */
/* ------------------ ### wwwwwwww ### ------------------ */

$(document).ready( function(){
    initDOM();

    window.setTimeout( function(){ $( 'body' ).addClass( 'primed' ); }, 100 );
});

/*\
|*|  :: wwwwwwwwww ::
|*|       TO DO:
|*|  :: wwwwwwwwww ::
------------------ ### Soonish ### ------------------


------------------ ### Medium ### ------------------



------------------ ### Long term ### ------------------

\*/




/*\
|*|  :: wwwwwwwwww ::
|*|       USEFUL LATER:
|*|  :: wwwwwwwwww ::


Brandywine R: 165 G: 108 B: 74 Hex Value: #a56c4a
Emotional R: 198 G: 95 B: 71  Hex Value: #c65f47
Gale Force R: 53 G: 69 B: 78 Hex Value: #35454e
Stardew R: 166 G: 178 B: 181  Hex Value: #a6b2b5






/* ------------------ ### Application Loop ### ------------------ 
const appLoop = function( event ) {
    if ( readyToUpdate ) {
        console.log('########## loop');

        for ( x = 0; x < 9; x++ ) {
        }
        animLoopIndex += 2;
        
        cancelAnimationFrame( mainRAFloop );
    }
    mainRAFloop = requestAnimationFrame( appLoop );
};







|*|  :: wwwwwwwwww ::
|*|       PROBABLY TRASH:
|*|  :: wwwwwwwwww ::






\*/