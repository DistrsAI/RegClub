
const config = {
type: Phaser.AUTO,
width: 360,
height: 640,
backgroundColor: "#0f172a",
physics: { default: 'arcade', arcade: { debug: false }},
scene: { preload, create, update }
};

let player, fairies, score=0, scoreText, timeLeft=30, timerText, gameOver=false;

new Phaser.Game(config);

function preload(){
this.load.image('player','assets/girl.png');
this.load.image('fairy1','assets/fairy1.png');
this.load.image('fairy2','assets/fairy2.png');
this.load.image('fairy3','assets/fairy3.png');
this.load.image('win','assets/win.png');

// музыка (ты добавишь файл сам)
this.load.audio('music','assets/music.mp3');
}

function create(){
player = this.physics.add.sprite(180,500,'player').setScale(0.2);

fairies = this.physics.add.group();

scoreText = this.add.text(10,10,'Очки: 0',{fontSize:'20px',fill:'#fff'});
timerText = this.add.text(280,10,'30',{fontSize:'20px',fill:'#fff'});

// музыка
this.music = this.sound.add('music',{loop:true,volume:0.5});
this.music.play();

this.input.on('pointermove',(p)=>{
player.x = p.x;
player.y = p.y;
});

this.time.addEvent({delay:700,callback:spawnFairy,callbackScope:this,loop:true});

this.time.addEvent({
delay:1000,
callback:()=>{
if(gameOver)return;
timeLeft--;
timerText.setText(timeLeft);
if(timeLeft<=0) endGame.call(this);
},
loop:true
});

this.physics.add.overlap(player,fairies,catchFairy,null,this);
}

function spawnFairy(){
if(gameOver)return;
let types=['fairy1','fairy2','fairy3'];
let t=Phaser.Math.RND.pick(types);
let f=fairies.create(Phaser.Math.Between(50,310),-50,t);
f.setVelocityY(220);
f.setScale(0.25);
}

function catchFairy(player,f){
f.destroy();
score++;
scoreText.setText('Очки: '+score);
}

function endGame(){
gameOver=true;

this.cameras.main.fade(1000,0,0,0);

setTimeout(()=>{
this.cameras.main.setBackgroundColor('#000');

this.add.text(20,180,'Реджина стала феей 💖',{
fontSize:'26px',
fill:'#fff',
wordWrap:{width:320}
});

this.add.image(180,380,'win').setScale(0.4);

},1000);
}
