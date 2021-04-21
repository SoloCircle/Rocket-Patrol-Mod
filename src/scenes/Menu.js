class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/atk.wav');
        this.load.audio('sfx_explosion', './assets/heal1.wav');
        this.load.audio('sfx_rocket', './assets/pop4.wav');
        this.load.audio('bgm_01', './assets/loginMusic.mp3');
        this.load.audio('bgm_02', './assets/morningMusic.mp3');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Candara',
            fontSize: '28px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        //menu text
        this.add.text(50, 50, 'Star Catcher', menuConfig).setOrigin(0);
        this.add.text(0, 360, 'Use <--> arrows to move & (F) to launch', menuConfig).setOrigin(0);
        //menuConfig.color = '#ffffff';
        this.add.text(0, 400,'Press <- for Dawn or -> for Dusk', menuConfig).setOrigin(0);
        this.add.text(0, 440,'Press (Esc) During Game to Return to Menu', menuConfig).setOrigin(0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.settings = {
                mood: 0,
                spaceshipSpeed: 3,
                redSpeed: 6,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                mood: 1,
                spaceshipSpeed: 5,
                redSpeed: 10,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}
