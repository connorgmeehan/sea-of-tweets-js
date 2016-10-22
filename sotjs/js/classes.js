var majorityMarker = function(x,y,z,state,party,textOnLeft){if(this.x==undefined){
    this.y = y;
    this.z = z;
    this.lineX;
    this.party = party;
    this.state = state;
    switch (this.party) {
        case 'democrat':
            this.lineX = (majorities[0]/100*1920);
            //console.log(majorities[0]);
            //console.log('setting x to '+majorities[0]+"~~~"+this.lineX );
            break;
        case 'conservative':
            this.lineX = width - majorities[2]/100*1920;
            //console.log("republican majority:  "+this.lineX);
            break;
        case 'undecided':
            this.lineX = majorities[0]/100*1920 + majorities[1]/100*1920;
            break;
        default:

    }
    this.render = function(){
        if(this.party=='democrat'){
            strokeWeight(3);
            stroke(100,100,250);
            line(this.lineX,-450,this.lineX,1080);

            strokeWeight(1);
            fill(100,100,250);
            textSize(26);
            textAlign(RIGHT);
            text('Democrat',this.lineX-20,-450);
            text(majorities[0]+"%",this.lineX-20,-400);
            noStroke();
        } else if (this.party=='conservative') {
            strokeWeight(3);
            stroke(200,100,100);
            line(this.lineX,-450,this.lineX,1080);
            noStroke();

            strokeWeight(1);
            fill(250,100,100);
            textSize(26);
            textAlign(LEFT);
            text("Conservative",this.lineX+20,y-450);
            text(majorities[2]+"%",this.lineX+20,y-400);
        } else {
            strokeWeight(3);
            stroke(80,80,80);
            line(this.lineX, -500, this.lineX, 1080);

            strokeWeight(1);
            fill(80);
            textSize(26);
            textAlign(CENTER);
            text("Undecided",this.lineX,y-550);
            text(majorities[1]+"%",this.lineX,y-520);

        }
    }
}}

var oceanRow = function(x,y,z,state){if(this.z == undefined){
    this.y = y;
    this.z = z;
    this.render = function(){
        for(var x = 0; x < oWidth; x++){
            var zColour = z/ySpacing;
            if (x <= oceanMajorities[0]) {fill(gradient * zColour, gradient * zColour, 100 + gradient * zColour);} else
            if (x <= oceanMajorities[0] + oceanMajorities[1]){ fill(gradient*zColour, gradient * zColour, gradient * zColour);}
            else {fill(100+gradient*zColour, gradient * zColour, gradient * zColour);}
            ellipse(x * xSpacing, sin(x + theta) * amplitude + z, 170, 100);
        }
    }
}}

/**
 * [candidateText description]
 * @param  int x           position
 * @param  int y           position
 * @param  int z           position
 * @param  int state       to add conditions i.e. if we set state to 1 we can make the text flash or st
 * @param  string textContent what we'd like the text to say
 * @param  int r           colours
 * @param  int g           colours
 * @param  int b           colours
 * @return void
 */
var candidateText = function(x,y,z,state,textContent,r,g,b){if(this.x==undefined){
    this.x = x;
    this.y = y;
    this.z = z;
    this.state = state;
    this.textContent = textContent;
    this.r = r;
    this.g = g;
    this.b = b;
    this.render = function(){
        textAlign(LEFT);
        textSize(width / 10);
        fill(r,g,b);
        text(textContent, x, y);
        fill(color(r+20,g+20,b+20))
        text(textContent, x, y-10);
    }
}}

var TestBox = function(x,y,z,state){if(this.x==undefined){
    this.x = x;
    this.y = y;
    this.z = z;
    this.state = state;
    this.render = function(){
        console.log('rendering textbox');
        color(255,255,255);
        rect(x,y,100,300);
    }
}}

var candidateFigure = function(x,y,z,state,side,imageArray,userObject){if(this.x==undefined){
    this.x = x;
    this.y = y;
    this.z = z;
    this.state = 0;
    this.side = side;
    this.imageArray = imageArray;
    this.userObject = userObject;

    this.animframe = 0;
    this.counter;
    //this.boats = {};

    /*if(this.side == 'democratic')
    //console.log(userObject['followers']);
    /*for(var i = 0; i < userObject['followers']/10000; i++){
        console.log('Adding boats to '+userObject+'userObject');
        var tempBoat = insertObject(new Boat(random(majorities[0]/100*1920), random(height/2), random(150,400),'democrat'),random(0,4));
        this.boats.push(tempBoat);
    }*/

    this.render = function(){
        switch (this.state) {
            case 0:
                //default
                this.animframe = 0;
                break;
            case 1:
                //initate the jabber sound
                this.state = 2;
                break;
            case 2:
                //animation
                if(this.counter >=3){
                    this.animframe+=1;
                    this.counter = 0;
                }
                this.counter+=1;
                //console.log(this.animframe+"trumpFigure is state 2");
                break;
            case 3:
                this.state = 0;
                //end jabber sound
                break;
            case 4:
                if(this.counter >=3){
                    this.animframe = 4;
                    counter = 0;
                }
                this.counter+=1;
                //shock expression (flash white?)
                break;
            default:
        }
        image(this.imageArray[this.animframe],x,y);
    }
}}

var speechBubble = function (x,y,z,state,side){if(this.x==undefined){
    this.x = x;
    this.y = y;
    this.z = z;
    this.state = state;
    this.side = side;
    this.counter = 0;
    this.render = function(){
        if(this.side=='trump'){
            switch (this.state) {
                case 0:
                    //do nothing, no cloud
                    break;
                case 1:
                    if(this.counter >=10){
                        this.state+=1;
                        this.counter = 0;
                    }
                    fill(255);
                    ellipse(this.x+50,this.y+70, 30, 30);
                    break;

                case 2:
                    if(this.counter >=10){
                        this.state+=1;
                        this.counter = 0;
                    }
                    fill(255);
                    ellipse(this.x+50,this.y+70, 30, 30);
                    ellipse(this.x+30,this.y+45, 50, 50);
                    break;
                case 3:
                    fill(255);
                    ellipse(this.x+50,this.y+70, 30, 30);
                    ellipse(this.x+30,this.y+45, 50, 50);
                    ellipse(this.x,this.y, 200, 100);
                    break;
                default:

            }
        }
    }
}}

var BoatManager = function(x,y,z,state,trumpFollowerCount, clintonFollowerCount){if(this.x===undefined){
      this.x = x;
      this.y = y;
      this.z = z;
      this.trumpFollowerCount = trumpFollowerCount;
      this.clintonFollowerCount = clintonFollowerCount;
      this.trumpBoats = {};
      this.clintonBoats = {};

      this.generateBoats = function(){
          for(var i = 0; i < this.trumpFollowerCount/10000; i++){
              //var tempBoat = new Boat(random(trump))
          }
      }

      this.trumpSupport = function(retweetCount){

      }
      this.clintonSupport = function(retweetCount){

      }
}}

var Boat = function(x,y,z,state,side){if(this.x ==undefined){
    this.x = x;
    this.z = z;
    this.y = height/2-z;
    this.state = state;
    this.side = side;
    this.render = function(){
        if(this.side=='conservative'){
            fill(200,150,150);
        }  else {
            fill(150,150,200);
        }
        rect(this.x, sin(this.x +this.z+ theta)*amplitude + this.y-20, 170, 100);

        //Manages the people on the boat
        fill(0);
        for(i=0;i<this.people.length;i++){
            rect(this.people[i].x,this.people[i].y, 20,50);
        }
    };
    this.people = {
      person:{x:0,y:-50,},
      person:{x:25,y:-50,},
      person:{x:50,y:-50,},
    };
}}
