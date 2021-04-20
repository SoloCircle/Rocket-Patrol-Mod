class coolStar extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   //store pointValue
        this.moveSpeed = game.settings.redSpeed;         //pixel per frame
    }

    update(){
        //move spaceship RIGHT
        this.x += this.moveSpeed;
        //wrap around
        if(this.x >= 640){
            this.reset();
        }
    }

    //position reset
    reset(){
        this.x = -game.config.width;
    }
}