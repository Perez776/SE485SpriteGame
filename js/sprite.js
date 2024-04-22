//Parent Sprit Classa
class Sprite {
    constructor(sprite_json, x, y, start_state){
        this.sprite_json = sprite_json;
        this.x = x;
        this.y = y;
        this.state = start_state;
        this.root_e = "TenderBud";

        this.cur_frame = 0;

        this.cur_bk_data = null;

        this.x_v = 0;
        this.y_v = 0;

        //this.keyState = 0;
    }

    draw(state){
        var ctx = canvas.getContext('2d');
        //console.log(this.sprite_json[this.root_e][this.state][this.cur_frame]['w']);
        console.log("keyChange: " + state['key_change']);
        console.log("keyChange: " + state['keyChange']);

        if(state['key_change'] == 'w')
        {
            //this.cur_frame = 0;
            this.state = "walk_N";
            this.y_v = -10;
        }
        else if(state['key_change'] == 'a')
        {
            //this.cur_frame = 0;
            this.state = "walk_W";
            this.x_v = -10;
        }
        else if(state['key_change'] == 's')
        {
            //this.cur_frame = 0;
            this.state = "walk_S";
            this.y_v = 10;
        }
        else if(state['key_change'] == 'd')
        {
            //this.cur_frame = 0;
            this.state = "walk_E";
            this.x_v = 10;
        }
        else if(state['key_change'] == 'n'){
           // this.set_idle_state();
            //this.cur_frame = 0;
            this.state = "idle";
            this.x_v = 0;
            this.y_v = 0;
        }

                
        if(state['keyChange'] == true)
        {
            this.cur_frame = 0;
        }



        if(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] == null){
            console.log("loading");
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] = new Image();
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'].src = 'Penguins/' + this.root_e + '/' + this.state + '/' + this.cur_frame + '.png';
        }
        

        if( this.cur_bk_data != null){
            ctx.putImageData(this.cur_bk_data , (this.x - this.x_v) , (this.y - this.y_v));
        }

        this.cur_bk_data = ctx.getImageData(this.x, this.y, 
                        this.sprite_json[this.root_e][this.state][this.cur_frame]['w'], 
                        this.sprite_json[this.root_e][this.state][this.cur_frame]['h']);


        ctx.drawImage(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'], this.x, this.y );

        if(this.x >= (window.innerWidth - this.sprite_json[this.root_e][this.state][this.cur_frame]['w']) ){
            this.bound_hit('E');
        }else if(this.x <= 0){
            this.bound_hit('W');
        }else if(this.y >= (window.innerHeight - this.sprite_json[this.root_e][this.state][this.cur_frame]['h']) ){
            this.bound_hit('S');
        }else if(this.y <= 0){
            this.bound_hit('N');
        }else{
            this.x = this.x + this.x_v;
            this.y = this.y + this.y_v;
            //this.bound_hit('N');
        }

        this.cur_frame = this.cur_frame + 1;
        if(this.cur_frame >= this.sprite_json[this.root_e][this.state].length){
            console.log(this.cur_frame);
            this.cur_frame = 0;
        }
        

        return false;
    }

    set_idle_state(){
        this.x_v = 0;
        this.y_v = 0;
        const idle_state = ["idle"];//,"idleBackAndForth","idleBreathing","idleFall","idleLayDown","idleLookAround","idleLookDown","idleLookLeft","idleLookRight","idleLookUp","idleSit","idleSpin","idleWave"];

        const random = Math.floor(Math.random() * idle_state.length);
        console.log(idle_state[random]);
        //this.state = idle_state[random];
    }

    bound_hit(side){
            this.set_idle_state();
   } 



   updateAnimationState(keyState) { 
        if (keyState['KeyW'] && keyState['KeyA']) {
            this.state = 'walk_NW';
        } else if (keyState['KeyW'] && keyState['KeyD']) {
            this.state = 'walk_NE';
        } else if (keyState['KeyS'] && keyState['KeyA']) {
            this.state = 'walk_SW';
        } else if (keyState['KeyS'] && keyState['KeyD']) {
            this.state = 'walk_SE';
        } else if (keyState['KeyW']) {
            this.state = 'walk_N';
        } else if (keyState['KeyS']) {
            this.state = 'walk_S';
        } else if (keyState['KeyA']) {
            this.state = 'walk_W';
        } else if (keyState['KeyD']) {
            this.state = 'walk_E';
        } else {
            this.state = 'idleSpin';
        }
    }   
}
