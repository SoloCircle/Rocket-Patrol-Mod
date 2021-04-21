//game config
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//set UI size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let skySpeed = 0.3;
let mtnSpeed = 0.5;

//reserve keybinds
let keyF, keyR, keyLEFT, keyRIGHT, keyESC;


/**Point Breakdown
 *    
 * 5    Add BG Music to PlayScene
 * 5    Create New Scrolling Tile Sprite for BG
 * 5    
 * 5
 *     
 * 10   Display Time Remaining in Seconds
 * 10       WIP - Create new UI Border Art
 * 10   Create new title screen
 * 10   Implement parallax scrolling
 * 
 * 20   Create new spaceship type - smaller, faster, more points
 * 20   New artwork for rocket, spaceship, explosion
 * 20   
 * 
 * 
 * 
 * 
*/