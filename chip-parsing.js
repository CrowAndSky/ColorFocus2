"use strict";

class ColorSet {
    // -------------------------------------------------
    // ASSUMPTIONS:
        // Choices of next colors will always be driven by the hueSorted list. We can weight any of the three attributes in order to
        // guide the fitness determination along those dimensions
        //
        // A given set will have the HSL for each of its members set by calling findMatches() in the previous set
    // -------------------------------------------------
/*  -------------------------------------------------
EXAMPLE of a color in colorsComplete:
"Exuberant Pink","6840","331.15384615384613","41.26984126984129%","50.588235294117645%","Dragon Fruit","6855","343.1775700934579","51.19617224880384%","59.01960784313726%","Cherries Jubilee",....
The index of Exuberant Pink in colorsComplete is 0, its index in colorsByH is 2848 for its hue value

EXAMPLE of a color in colorsComplete: (hue first, index in colorsComplete of that color second
const colorsByH = [ 0,884, 0,1446, 0,911, ....
------------------------------------------------- */

/*  -------------------------------------------------
------------------------------------------------- */

    constructor( colorSet ) {
        this.chips = '';
        this.allColors = [];
        this.$parserWrapper = $( '#parser-wrapper' );
        this.wireChipHandlers();
    }

    wireChipHandlers() {
        let _this = this;

        this.$parserWrapper.on( 'click', '.chip',  function(){
            let selectedChip = _this.allColors[ $(this).data( 'colorIndex' ) ];
            _this.findMatches( selectedChip.hueArrayIndex, selectedChip.hue, selectedChip.saturation, selectedChip.luminance );
        });
    }

    testMatchFitness( hueArrayIndex, startingHue = 180, startSaturation = 50, startLuminisity = 50 ) {
        /*  -------------------------------------------------
        "startingHue" and other HSL values are those of the selected chip color, other possible matches are compared to it
        -------------------------------------------------  */

        let indexOfNextHue = parseInt( colorsByH[ hueArrayIndex ] , 10), // This the color's index in colorsComplete
            thisColor = {},
            hue = parseFloat( colorsComplete[ indexOfNextHue * 5 + 2 ], 10),
            saturation = parseFloat( colorsComplete[ indexOfNextHue * 5 + 3 ], 10),
            luminance = parseFloat( colorsComplete[ indexOfNextHue * 5 + 4 ], 10),
            hueDiff = Math.abs( startingHue - hue ),
            satDiff = Math.abs( startSaturation - saturation ),
            lumDiff = Math.abs( startLuminisity - luminance );

        if ( satDiff + lumDiff < 35 ) {
            thisColor.hueArrayIndex = hueArrayIndex;
            thisColor.hue = hue;
            thisColor.saturation = saturation;
            thisColor.luminance = luminance;
            this.allColors.push( thisColor );
        }
    }

    findMatches( hueArrayIndex, startingHue = 180, startSaturation = 50, startLuminisity = 50 ) {
        /*  -------------------------------------------------
        Find the 50 next closest colors by Hue, moving forward from the current color. For each color test it's fitness as a match.
        Then repeat with 50 more colors, moving baackward from the current color.
        ------------------------------------------------- */
        let nextArrayIndex = hueArrayIndex;

        this.allColors = [];

        for( var i = 2; i < 100; i += 2 ) { // Starting at 2 because the master index value FOLLOWS the hue value in that array, and we want to start with the NEXT color
            if ( nextArrayIndex + 2 >= colorsByH.length ) {
                nextArrayIndex = 0; // Starting at 1 because the master index value FOLLOWS the hue value in that array
            } else {
                nextArrayIndex += 2;
            }

            this.testMatchFitness( nextArrayIndex, startingHue, startSaturation, startLuminisity);
        }

        nextArrayIndex = hueArrayIndex; // Setting this back to the inital value so that we can work our way down

        for( var i = -2; i > -100; i -= 2 ) { // Starting at -2 because the master index value FOLLOWS the hue value in that array, and we want to start with the PRECIOUS color
            if ( nextArrayIndex - 2 < 1 ) {
                nextArrayIndex = colorsByH.length;
            } else {
                nextArrayIndex -= 2;
            }
            
            this.testMatchFitness( nextArrayIndex, startingHue, startSaturation, startLuminisity);
        }

        this.resetColorList();
    }

    resetColorList() {
        let _this = this;
        this.chips = '';

        _.each ( this.allColors, function( color, index ){
            _this.chips = _this.chips + `<div class="chip" data-color-index="${ index }" style="background:hsl( ${color.hue},${color.saturation}%,${color.luminance}% )"></div>`;
        });

        this.$parserWrapper.html(this.chips);
    }
}  // End ColorSet Class

$(document).ready( function(){
    let love = new ColorSet();
    love.findMatches( 2849, 331.15384615384613, 41.26984126984129, 50.588235294117645 );
});


/*

############################################################################################
########################    NOTES   ########################
############################################################################################

  --color-intro-hue-v1: hsl(0, 100%, 50%);
  --color-intro-hue-v2: hsl(39, 100%, 50%);
  --color-intro-hue-v3: hsl(60, 100%, 50%);
  --color-intro-hue-v4: hsl(121, 50%, 40%);
  --color-intro-hue-v5: hsl(241, 98%, 64%);
  --color-intro-hue-v6: hsl(300, 100%, 25%);
  --color-intro-hue-v7: hsl(29, 20%, 66%); // gray


------------------ ### original parsing code that I built the lists with ### ------------------
const sortByFirst = function( a, b ) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

parse = function() {
    _.each ( allColorsLong, function( color, index ){
        if ( !color.archived) {
            var r = Math.floor( color.rgb / 65536 );
            var g = Math.floor( ( color.rgb % 65536 ) / 256 );
            var b = color.rgb - r * 65536 - g * 256;

            let colorInHSL = tinycolor( "rgb " + r + " " + g + " " + b).toHsl();

            colorsByH.push( [ colorInHSL.h, index ] );
            colorsByS.push( [ colorInHSL.s, index ] );
            colorsByL.push( [ colorInHSL.l, index ] );

            this.allColors.push( '"' + color.name + '"', '"' + color.colorNumber + '"', '"' + colorInHSL.h + ',' + colorInHSL.s * 100 + '%,' + colorInHSL.l * 100 + '%"');
        }
    });

------------------ ### wwwwwww ### ------------------
------------------ ### wwwwwww ### ------------------
------------------ ### wwwwwww ### ------------------


*/