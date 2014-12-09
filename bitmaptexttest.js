// bitmaptext testing centered function
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

var text1;
var text2;
var text3;

// -------------------------------------
// PHASER GAME FUNCTIONS
// -------------------------------------
function preload() {
	// fix for CocoonJS
	//var fileFormat = (this.game.device.cocoonJS) ? '.json' : '.xml';
	var fileFormat = (TEST_FONT_JSON) ? '.json' : '.xml';
	console.log('prefload fileFormat ='+fileFormat);

    game.load.bitmapFont('myfont', 'myfont.png', 'myfont'+fileFormat); // font created with http://kvazars.com/littera/
};

function create() {
    // add texts
    text1 = game.add.bitmapText(120, 72, 'myfont', 'the fox', 48);
    text2 = game.add.bitmapText(120, 144, 'myfont', 'the quick fox', 48);
    text3 = game.add.bitmapText(120, 216, 'myfont', 'the quick brown fox', 48);
}
