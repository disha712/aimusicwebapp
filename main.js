var song1="";
var song2="";
var leftWristx=0;
var leftWristy=0;
var rightWristx=0;
var rightWristy=0;
var score_leftWrist=0;
var score_rightWrist=0;
var status1="";
var status2="";
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    status1=song1.isPlaying();
    status2=song2.isPlaying();
    fill('#00ff29');
    stroke('#ff00c7');
    if(score_leftWrist>0.2){
circle(leftWristx,leftWristy,20);
song2.stop();
if(status1==false){
    song1.play();
    document.getElementById("song_name").innerHTML=" Playing Harry Potter";
}
    }
    if(score_rightWrist>0.2){
        circle(rightWristx,rightWristy,20);
        song1.stop();
        if(status2==false){
            song1.play();
            document.getElementById("song_name").innerHTML=" Playing Peter Pan";
        }
    }
}
function modelLoaded(){
    console.log("Model Is Loaded");
}
function gotPoses(results){
if (results.length>0) {
    console.log(results);
    score_leftWrist=results[0].pose.keypoints[9].score;
    console.log("Left Wrist Score=  "+score_leftWrist);
    score_rightWrist=results[0].pose.keypoints[10].score;
    console.log("Right Wrist Score= "+score_rightWrist);
    leftWristx=results[0].pose.leftWrist.x;
    leftWristy=results[0].pose.leftWrist.y;
    console.log("Left wrist y= "+leftWristy+"     Left wrist x= "+leftWristx);
    rightWristx=results[0].pose.rightWrist.x;
    rightWristy=results[0].pose.rightWrist.y;
    console.log("Right wrist y= "+rightWristy+"   Right wrist x= "+rightWristx);
}
}