"use strict";

let allColors = [],
    colorDiff,
    firstColor = [ 2849, 331.15384615384613, 41.26984126984129, 50.588235294117645 ],
    chips = '',
    colorInHSL;

class ColorSet {
    // -------------------------------------------------
    // ASSUMPTIONS:
        // Choices of next colors will always be driven by the hueSorted list. We can weight any of the three attributes in order to
        // guide the fitness determination along those dimensions
        //
        // A given set will have the HSL for each of its members set by calling buildNextSet() in the previous set
    // -------------------------------------------------

    constructor( colorSet ) {
        this._colorSet = colorSet;
    }

    testMatchFitness( hueArrayIndex, startingHue = 180, startSaturation = 50, startLuminisity = 50 ) {
        console.log('########## i: ' + hueArrayIndex);
        // var indexOfNextHue = parseInt( colorsByH[ 2849 + index ] , 10), // This gives you the next master index of the next hue indexed color
        var indexOfNextHue = parseInt( colorsByH[ hueArrayIndex ] , 10), // This gives you the next master index of the next hue indexed color
        //console.log('########## indexOfNextHue: ' + indexOfNextHue);
            hue = parseFloat( colorsAll2[ indexOfNextHue * 5 + 2 ], 10),
            saturation = parseFloat( colorsAll2[ indexOfNextHue * 5 + 3 ], 10),
            luminance = parseFloat( colorsAll2[ indexOfNextHue * 5 + 4 ], 10),
            hueDiff = Math.abs( startingHue - hue ),
            satDiff = Math.abs( startSaturation - saturation ),
            lumDiff = Math.abs( startLuminisity - luminance );
        if ( satDiff + lumDiff < 35 ) {
            // allColors.push( colorsAll2[ ( indexOfNextHue * 5 ) + 2 ] + ',' + parseFloat( colorsAll2[ indexOfNextHue * 5 + 3 ], 10) + '%,' + parseFloat( colorsAll2[ indexOfNextHue * 5 + 4 ], 10) + '%"');
            allColors.push( `${colorsAll2[ ( indexOfNextHue * 5 ) + 2 ]},${saturation}%,${luminance}%` );
        }
    }

    findMatches( hueArrayIndex, startingHue = 180, startSaturation = 50, startLuminisity = 50 ) {
        let nextArrayIndex = hueArrayIndex;

        for( var i = 2; i < 100; i += 2 ) { // Starting at 2 because the master index value FOLLOWS the hue value in that array, and we want to start with the NEXT color
            if ( nextArrayIndex + 2 >= colorsByH.length ) {
                nextArrayIndex = 0; // Starting at 1 because the master index value FOLLOWS the hue value in that array
            } else {
                nextArrayIndex += 2;
            }

            this.testMatchFitness( nextArrayIndex, 0, 100, 50);
        }

        nextArrayIndex = hueArrayIndex;

        for( var i = -2; i > -100; i -= 2 ) { // Starting at -2 because the master index value FOLLOWS the hue value in that array, and we want to start with the PRECIOUS color
            if ( nextArrayIndex - 2 < 1 ) {
                nextArrayIndex = colorsByH.length;
            } else {
                nextArrayIndex -= 2;
            }
            
            this.testMatchFitness( nextArrayIndex, 0, 100, 50);
        }
    }

    checkMasterIndex( hue ) {
        for (  var x = 0; x < colorsAll2.length; x++ ) {
            var indexOfNextHue = parseInt( x * 5 , 10);
            var z = parseFloat( colorsAll2[ x * 5 + 2 ], 10);
            if ( Math.abs( hue - z) < 5) {
                //return z;
                console.log('########## z: ' + z);
                //allColors.push( colorsAll2[ indexOfNextHue + 2 ] + ',' + colorsAll2[ indexOfNextHue + 3 ] + ',' + colorsAll2[ indexOfNextHue + 4 ] );
                allColors.push( `${colorsAll2[ indexOfNextHue + 2 ]},${colorsAll2[ indexOfNextHue + 3 ]},${colorsAll2[ indexOfNextHue + 4 ]}` );
            }   
        }
        _.each ( allColors, function( color, index ){
            console.log(color);
            chips = chips + '<div class="chip" style="background:hsl(' + color + ')"></div>';
        });

        console.log( allColors);

        $parserWrapper.append(chips);
    }
}

const $parserWrapper = $( '#parser-wrapper' ),
    buildNextColor = function( i ) {
        //console.log('########## i: ' + i);
        var indexOfNextHue = parseInt( colorsByH[ 2849 + i ] , 10); // This gives you the next master index of the next hue indexed color
        //console.log('########## indexOfNextHue: ' + indexOfNextHue);
        var satDiff = Math.abs( 41.26984126984129 - parseFloat( colorsAll2[ indexOfNextHue * 5 + 3 ], 10) );     //slice(0, -1);
        var lumDiff = Math.abs( 50.588235294117645 - parseFloat( colorsAll2[ indexOfNextHue * 5 + 4 ], 10) );     //slice(0, -1);
        if ( satDiff + lumDiff < 35 ) {
            allColors.push( colorsAll2[ ( indexOfNextHue * 5 ) + 2 ] + ',' + parseFloat( colorsAll2[ indexOfNextHue * 5 + 3 ], 10) + '%,' + parseFloat( colorsAll2[ indexOfNextHue * 5 + 4 ], 10) + '%"');
        }
    },
    recommendColors = function() {    
        /* colorsByHue is listed by hue first, master index second */

        for( var i = 2; i < 100; i += 2 ) {
            buildNextColor( i );
        }

        for( var i = -2; i > -100; i -= 2 ) {
            //console.log('########## running');
            buildNextColor( i );
        }

        _.each ( allColors, function( color, index ){
            //console.log( allColors[ index ] );
            chips = chips + '<div class="chip" style="background:hsl(' + allColors[ index * 3 ] + ')"></div>';
        });

        $parserWrapper.append(chips);
    };

/*

    */


/*
TO DO HERE:

*/

$(document).ready( function(){

    //console.log('########## colorsAll2.length: ' + colorsAll2.length/5);
    //recommendColors();
    let love = new ColorSet( [ [120, 100, 50], [0, 100, 50], [120, 100, 50], [120, 100, 50], [120, 100, 50] ] );
    love.findMatches( 0, 0, 100, 50);
    //love.findMatches( 0 );
    love.checkMasterIndex( 220 );
});


/*

############################################################################################
########################    NOTES   ########################
############################################################################################

//"38.82352941176471","87.93103448275865%","77.25490196078431%"

the closest to pure red: "Lotus Flower","6310","0","45.054945054945044%","82.15686274509804%"

  --color-intro-hue-v1: hsl(0, 100%, 50%);
  --color-intro-hue-v2: hsl(39, 100%, 50%);
  --color-intro-hue-v3: hsl(60, 100%, 50%);
  --color-intro-hue-v4: hsl(121, 50%, 40%);
  --color-intro-hue-v5: hsl(241, 98%, 64%);
  --color-intro-hue-v6: hsl(300, 100%, 25%);
  --color-intro-hue-v7: hsl(29, 20%, 66%);


// allColors.push( '"' + color.name + '"', '"' + color.colorNumber + '"', '"' + colorInHSL.h + ',' + colorInHSL.s * 100 + '%,' + colorInHSL.l * 100 + '%"');
        // allColors.push( colorInHSL.h + ',' + colorInHSL.s * 100 + '%,' + colorInHSL.l * 100 + '%"');

console.log( colorsByH[ 2849 ] );
    console.log( colorsByH[ 1426 ] );
    console.log( colorsByH[ 1428 ] );
    console.log( colorsAll2[ 0 ] );



------------------ ### original parsing code that I built the lists with ### ------------------
class ColorDetail {
    constructor( number, name, index ) {
        this._name = name;
        this._number = number;
        this._index = index;
    }

    get name() {
        return this._name;
    }
}

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
            //chips = chips + '<div class="chip" style="background:rgb(' + r + ',' + g + ',' + b + ')"></div>';
            let colorInHSL = tinycolor( "rgb " + r + " " + g + " " + b).toHsl();
            // console.log('########## colorInHSL: ');
            // console.log(colorInHSL);

            colorsByH.push( [ colorInHSL.h, index ] );
            colorsByS.push( [ colorInHSL.s, index ] );
            colorsByL.push( [ colorInHSL.l, index ] );
            // var thisRGB = r + ',' + g + ',' + b;
            // console.log('########## thisRGB: ' + thisRGB);

            //colorInHSL = rgbToHsl( r, g, b );
            //allColors[ index ] = [ color.colorNumber, color.name, r + ',' + g + ',' + b, index ];
            // allColors.push( '"' + color.name + '"', '"' + color.colorNumber + '"', colorInHSL.h + ',' + colorInHSL.s * 100 + '%,' + colorInHSL.l * 100 + '%');
            allColors.push( '"' + color.name + '"', '"' + color.colorNumber + '"', '"' + colorInHSL.h + ',' + colorInHSL.s * 100 + '%,' + colorInHSL.l * 100 + '%"');
        }
    });

    colorsByH.sort( sortByFirst );
    colorsByS.sort( sortByFirst );
    colorsByL.sort( sortByFirst );

    _.each ( colorsByH, function( color, index ){
        //console.log( allColors[ color[ 1 ] * 3 + 2 ] );
        //chips = chips + '<div class="chip" style="background:hsl(' + allColors[ color[ 1 ] * 3 + 2 ] + ')"></div>';
    });
    
    

    $parserWrapper.append(chips);

    console.log('########## H, S, L');
    // console.log(colorsByH);
    // console.log(colorsByS);
    // console.log(colorsByL);
};

parse();
$( '#console1' ).text( allColors );
$( '#console2' ).text( colorsByH );
$( '#console3' ).text( colorsByS );
$( '#console4' ).text( colorsByL );






------------------ ### write to canvas ### ------------------
var canvasBlockIndex = 0,
canvasPreviousBlockChipCount = 0,
rgbIndex = 0,
canvasCurrentColumn = 0,
canvasCurrentRow = 0,
canvasCurrentX = 0,
thisIndex,
rowAdjustment = 0,
totalChipCount = 1232, //3696
canvasCurrentY = 0;

for ( var canvasLoopIndex = 0; canvasLoopIndex < totalChipCount; canvasLoopIndex++ ) {
if ( canvasLoopIndex < 631 ) {
    canvasBlockIndex = Math.floor( canvasLoopIndex / 105 );
    canvasPreviousBlockChipCount = canvasBlockIndex * 105;
} else if ( canvasLoopIndex < 925 ) {
    rowAdjustment = 15;
    canvasBlockIndex = Math.floor( ( canvasLoopIndex - 630 ) / 49 );
    canvasPreviousBlockChipCount = canvasBlockIndex * 49 + 630;
} else {
    rowAdjustment = 0;
    canvasBlockIndex = Math.floor( ( canvasLoopIndex - 925 ) / 154 ) + 6;
    canvasPreviousBlockChipCount = canvasBlockIndex * 154;
}

//canvasCurrentX = ( ( ( canvasLoopIndex - canvasPreviousBlockChipCount ) % 7 ) + canvasBlockIndex * 7 ) * 21;
canvasCurrentColumn = ( ( ( canvasLoopIndex - canvasPreviousBlockChipCount ) % 7 ) + canvasBlockIndex * 7 );

//canvasCurrentY = ( Math.floor( ( canvasLoopIndex - canvasPreviousBlockChipCount ) / 7 ) + rowAdjustment ) * 21;
canvasCurrentRow = ( Math.floor( ( canvasLoopIndex - canvasPreviousBlockChipCount ) / 7 ) + rowAdjustment ) * 56;

thisIndex = canvasCurrentColumn + canvasCurrentRow;
//cwContex.fillStyle = 'rgb(' + allColorsShort[ rgbIndex ] + ',' + allColorsShort[ rgbIndex + 1 ] + ',' + allColorsShort[ rgbIndex + 2 ] + ')';
allColorsRGB[thisIndex] = allColorsShort[ rgbIndex ] + ',' + allColorsShort[ rgbIndex + 1 ] + ',' + allColorsShort[ rgbIndex + 2 ];
//cwContex.fillRect( canvasCurrentX, canvasCurrentY, 20, 20);

chips = chips + '<div class="chip" style="background:rgb(' + allColorsRGB[thisIndex] + ')"></div>';

console.log("allColorsRGB[thisIndex]: " + allColorsRGB[thisIndex]);


rgbIndex += 3;

------------------ ### wwwwwww ### ------------------
------------------ ### wwwwwww ### ------------------
------------------ ### wwwwwww ### ------------------


*/