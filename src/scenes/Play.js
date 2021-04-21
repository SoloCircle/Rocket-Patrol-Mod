class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load img and file sprites
        this.load.image('border', './assets/border.png');
        this.load.image('note', './assets/note.png');
        this.load.image('redStar', './assets/red_star.png');
        if(game.settings.mood == 1){
            this.load.image('sky_bg', './assets/sky_bg.png');
            this.load.image('mtn_bg', './assets/mtn_bg.png');
        };
        if(game.settings.mood == 0){
            this.load.image('Dsky_bg', './assets/Dsky_bg.png');
            this.load.image('Dmtn_bg', './assets/Dmtn_bg.png');
        };
  

        //load spritesheet(s)
        this.load.spritesheet('explosion', './assets/explosion_01.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame:9
        });
        this.load.spritesheet('explosion2', './assets/explosion_02.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame:7
        });
        this.load.spritesheet('explosion3', './assets/explosion_03.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame:7
        });
        this.load.spritesheet('explosion4', './assets/explosion_04.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame:9
        });
        this.load.spritesheet('star', './assets/star_sprite.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 5
        });
        this.load.spritesheet('candle', './assets/candle_sprite.png', {
            frameWidth: 64,
            frameHeight: 64
        });
    }

    create(){
        //anim config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('explosion2', {
                start: 0,
                end: 7,
                first: 0
            }),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode3',
            frames: this.anims.generateFrameNumbers('explosion3', {
                start: 0,
                end: 7,
                first: 0
            }),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode4',
            frames: this.anims.generateFrameNumbers('explosion4', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
        this.anims.create({
            key: 'flicker',
            frames: this.anims.generateFrameNames('candle', {
                start: 0,
                end: 3,
                first: 0
            }),
            repeat: -1,
            frameRate: 1
        });
        this.anims.create({
            key: 'pulse',
            frames: this.anims.generateFrameNumbers('star', {
                start: 0,
                end: 5,
                first: 0,
            }),
            frameRate: 5,
            repeat: -1
        });
        

        //place sky + other UI elements + initiate anims
        this.candle = this.add.sprite(600,420, 'candle').setOrigin(0.5, 0.5);
            this.candle.play('flicker');
            this.candle.setDepth(3);
        if(game.settings.mood == 1){
            this.skyBG = this.add.tileSprite(0, 0, 640, 480, 'sky_bg').setOrigin(0,0);
            this.mtnBG = this.add.tileSprite(0, 0, 640, 480, 'mtn_bg').setOrigin(0,0);
        };
        if(game.settings.mood == 0){
            this.skyBG = this.add.tileSprite(0, 0, 640, 480, 'Dsky_bg').setOrigin(0,0);
            this.mtnBG = this.add.tileSprite(0, 0, 640, 480, 'Dmtn_bg').setOrigin(0,0);
        }
        

        //add music to scene and play
        if(game.settings.mood == 0){
            this.bgMusic = this.sound.add('bgm_02', {volume: 0.3});
        }
        if(game.settings.mood == 1){
            this.bgMusic = this.sound.add('bgm_01', {volume: 0.4});
        }
        
        this.bgMusic.loop = true;
        this.bgMusic.play();
    

        //end zone
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
        borderUISize * 2, 0x11094B).setOrigin(0,0);
        //border sprite
        this.bWindow = this.add.sprite(0,0, 'border').setOrigin(0, 0);
            this.bWindow.setDepth(2);


        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height-borderUISize-borderPadding,
        'note').setOrigin(0.5, 0).setDepth(4);

        //add stars
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
        'star', 0, 30).setOrigin(0,0);
        this.ship01.anims.play('pulse');
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2,
        'star', 0, 20).setOrigin(0,0);
        this.ship02.anims.play('pulse');
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4,
        'star', 0, 10).setOrigin(0,0);
        this.ship03.anims.play('pulse');
        if(game.settings.mood == 0){
            this.ship04 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*9 + borderPadding*2,
                'star', 0, 10).setOrigin(0,0);
                this.ship04.anims.play('pulse');
        };
        this.red01 = new coolStar(this, -10, borderUISize*6, 'redStar', 0, 90).setOrigin(0,0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


        //initialize score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Candara',
            fontSize: '24px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2,
            this.p1Score, scoreConfig);
        
        //game over flag
        this.gameOver = false;
        //60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //exp timer
        this.timeInSeconds = game.settings.gameTimer/1000;
        let timeConfig = {
            fontFamily: 'Candara',
            fontSize: '26px',
            color: '#ffffff',
        }
        this.timeText = this.add.text(550, 60, this.timeInSeconds, timeConfig);
        this.timeText.setDepth(4);
        this.timer = this.time.addEvent({ delay: 1000, callback: this.tickTimer, callbackScope: this, loop: true });

    
    }

    

    update(){
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.sound.play('sfx_select');
            this.bgMusic.stop();
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.sound.play('sfx_select');
            this.bgMusic.stop();
            this.scene.start("menuScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.sound.play('sfx_select');
            this.bgMusic.stop();
            this.scene.start("menuScene");
        }
        
        this.skyBG.tilePositionX -= skySpeed;
        this.mtnBG.tilePositionX -= mtnSpeed;

        if(!this.gameOver){
            //update raw kit
            this.p1Rocket.update();
            //update spaceship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            if(game.settings.mood == 0){
                this.ship04.update();
            }
            this.red01.update();
        }

        //check collisions
        if(game.settings.mood == 0){
            if(this.checkCollision(this.p1Rocket, this.ship04)){
                this.p1Rocket.reset();
                this.shipExplode(this.ship04);
            }
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.red01)){
            this.p1Rocket.reset();
            this.shipExplode(this.red01);
        }
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            }else{
                return false;
            }
    }


    shipExplode(ship){
        //temp hide ship
        ship.alpha = 0;
        //create explosion
        this.rand = Phaser.Math.Between(0,3);
        console.log(this.rand);         //debug

        if(this.rand == 0){
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
            boom.anims.play('explode');
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 100;
                boom.destroy();
            });
        }else if(this.rand == 1){
            let boom = this.add.sprite(ship.x, ship.y, 'explosion2').setOrigin(0,0);
            boom.anims.play('explode2');
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 100;
                boom.destroy();
            });
        }else if(this.rand == 2){
            let boom = this.add.sprite(ship.x, ship.y, 'explosion3').setOrigin(0,0);
            boom.anims.play('explode3');
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 100;
                boom.destroy();
            });
        }else if(this.rand == 3){
            let boom = this.add.sprite(ship.x, ship.y, 'explosion4').setOrigin(0,0);
            boom.anims.play('explode4');
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 100;
                boom.destroy();
            });
        }
        
        //score add
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        //sfx
        this.sound.play('sfx_explosion', {volume: 0.5});
    }

    tickTimer(){
        if(this.timeInSeconds > 0){
            this.timeInSeconds--;
        }
        this.timeText.text = this.timeInSeconds;
    }
    
}