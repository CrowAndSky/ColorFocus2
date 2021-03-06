"use strict";
/*--------------------- ### App State ### ---------------------*/
let appState,    // state-intro    state-intro-hue   state-lower-room  state-color-preference   state-detail  state-transition state-app-primed

/*--------------------- ### Animation Looping ### ---------------------*/
animLoopIndex,
stillUpdatingDOM = false,
readyToUpdate = false,
mainRAFloop,
isStateDetail = false,
x,
i;

var tintScene = function( hue, saturation, luminosity ) {
    document.body.style.setProperty( '--sceneTintColor', 'HSL( 11.02301, 53.0004346724%, 53.002438% )' );
}
/* ------------------ ### initDOM ### ------------------ */
var initDOM = function( event ) {
    /*--------------------- ### DOM elements ### ---------------------*/
    $body = document.querySelectorAll( 'body' );

    $( '.color-list__button' ).click( function(){
        tintScene();

        // if ( $( 'body.state-detail' ).length > 0 ) {
        if ( isStateDetail ) {
            // $( 'body' ).removeClass( 'state-detail' );
            isStateDetail = false;
            // window.setTimeout( function(){ $( 'body' ).removeClass( 'state-detail-animating' ); }, 1000 );
        } else {
            // $( 'body' ).addClass( 'state-detail' );
            isStateDetail = true;
            // window.setTimeout( function(){ $( 'body' ).addClass( 'state-detail-animating' ); }, 1000 );
        }

        window.setTimeout( ( ) => {
            this.$body.classList.toggle( 'state-detail-animating' );
        }, 1000 );

        $body.classList.toggle( 'state-detail' );
    })
};


/* ------------------ ### wwwwwwww ### ------------------ */
/* ------------------ ### wwwwwwww ### ------------------ */
/* ------------------ ### wwwwwwww ### ------------------ */
/* ------------------ ### wwwwwwww ### ------------------ */

// $(document).ready( function(){
//     initDOM();
// });

document.addEventListener('DOMContentLoaded', function() {
    initDOM();
})

/*\
|*|  :: wwwwwwwwww ::
|*|       TO DO:
|*|  :: wwwwwwwwww ::
------------------ ### Soonish ### ------------------
Scaffolding for states
Dispaly filter boxes by state
Increase font size at default

------------------ ### Medium ### ------------------
Classes for filter box border radius
    along with transistions for hiding/showing - or is changing height good enough?



------------------ ### Long term ### ------------------
Mask off back room
Mask off furntiure
Logic to tint back room (invert of value?)
Logic to tint furniture (invert of main hue?)

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



   // sepia: hsl(38, 24.5%, 60%);
// H:  170 - 38             ->  132°
// S:  100 + (24.5 - 21.3)  ->  103.2%  (relative to base 100% =  3.2%)
// L:  100 + (51.2 - 60.0)  ->   91.2%  (relative to base 100% = -8.8%)
    let H =  hue - 38,
        // S =  100 + ( 24.5 - saturation ),
        // L =  100 + ( luminosity - 60.0),
        S =  100 * ( saturation / 24.5),
        L =  100 * ( luminosity / 60.0),
        // S = 408.16326531,
        // L = 166.66666667,

        // theFilter = `brightness( 50% ) sepia( 1 )  hue-rotate( ${H}deg ) saturate( ${S}% ) brightness( ${L}% )`;
        theFilter = `brightness( 50% ) sepia( 1 )  hue-rotate( ${H}deg ) saturate( ${S}% ) brightness( ${L}% )`;



\*/