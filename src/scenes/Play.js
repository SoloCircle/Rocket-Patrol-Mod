class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load img and file sprites
        this.load.image('note', './assets/note.png');
        this.load.image('spaceship', './assets/spaceship.png');
        if(game.settings.mood == 1){
            this.load.image('sky_bg', './assets/sky_bg.png');
            this.load.image('mtn_bg', './assets/mtn_bg.png');
        };
        if(game.settings.mood == 0){
            this.load.image('Dsky_bg', './assets/Dsky_bg.png');
            this.load.image('Dmtn_bg', './assets/Dmtn_bg.png');
        };
  

        //load spritesheet(s)
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
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
            key: 'flicker',
            frames: this.anims.generateFrameNames('candle', {
                start: 0,
                end: 3,
                first: 0
            }),
            repeat: -1,
            frameRate: 1
        });
        /*this.anims.create({
            key: 'pulse',
            frames: this.anims.generateFrameNumbers('star', {
                start: 0,
                end: 5,
                first: 0,
            }),
            frameRate: 5,
            repeat: -1
        });*/
        

        //place starfield + other UI elements + initiate anims
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
        this.bgMusic = this.sound.add('bgm_01', {volume: 0.5});
        this.bgMusic.loop = true;
        this.bgMusic.play();
    

        //end zone
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
        borderUISize * 2, 0x11094B).setOrigin(0,0);
        //borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x11094B).setOrigin
        (0,0).setDepth(1);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width,
        borderUISize, 0x11094B).setOrigin(0,0).setDepth(1);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x11094B).setOrigin
        (0,0).setDepth(1);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.
        config.height, 0x11094B).setOrigin(0,0).setDepth(1);



        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height-borderUISize-borderPadding,
        'note').setOrigin(0.5, 0).setDepth(2);

        //add spaceship
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
        'star', 0, 30).setOrigin(0,0);
        //ship01.play('pulse');
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2,
        'star', 0, 20).setOrigin(0,0);
        //ship02.play("pulse");
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4,
        'star', 0, 10).setOrigin(0,0);
        //ship03.play("pulse");
        if(game.settings.mood == 0){
            this.ship04 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*9 + borderPadding*2,
                'star', 0, 10).setOrigin(0,0);
                //ship04.play("pulse");
        };

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
            fontFamily: 'Courier',
            fontSize: '28px',
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
            this.add.text(game.config.width/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }



    update(){
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.bgMusic.stop();
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.bgMusic.stop();
            this.scene.start("menuScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
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
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
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
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 100;
            boom.destroy();
        });
        //score add
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        //sfx
        this.sound.play('sfx_explosion', {volume: 0.5});
    }

}