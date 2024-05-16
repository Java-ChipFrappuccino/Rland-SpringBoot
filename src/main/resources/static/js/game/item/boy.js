export default class Boy{
    #x
    #y
    #vx
    #vy
    #dx
    #dy
    #w
    #h
    #img
    #moveIndex
    #movedelayCount = 10;
    #dirIndex

    constructor(){
        this.#img = new Image();
        this.#img.src = "./res/boy.png";
        this.#w = this.#img.width/3
        this.#h = this.#img.height/4;
        this.#x = 240;
        this.#y = 300;
        this.#vx = 0;
        this.#vy = 0;
        this.#dx = this.#x;
        this.#dy = this.#y;
        this.#moveIndex = 2;
        this.#dirIndex = 2;

    }
    //애니메이션을 위한 필수 메소드
    draw(ctx){
        let mi = this.#moveIndex;
        let di = this.#dirIndex;

        let w = this.#w;
        let h = this.#h;
        let sx = w*mi;
        let sy = h*di;

        let dx = this.#x -w/2+8;
        let dy = this.#y -h+15;

        ctx.drawImage(this.#img, 
            // 이미지에서 그림에 사용할 영역
            sx,sy,w,h,
            // 위에서 선택한 영역을 출력할 영역
            dx,dy,w,h);
    }
    
    update(){
        // 현재 위치에서 목적지까지의 단위벡터만큼 반복해서 이동시킨다 (애니메이션 효과를 위해)
        this.#x += this.#vx;
        this.#y += this.#vy;

        if(Math.floor(this.#x)==this.#dx | Math.floor(this.#y)==this.#dy){
            this.#vx = 0;
            this.#vy = 0;

            this.#dirIndex = 2;
            this.#moveIndex = 1;
            this.#movedelayCount = 10;
        } else
            if(this.#movedelayCount-- == 0){
            this.#moveIndex = this.#moveIndex == 0 ? 2 : 0; // ?
            this.#movedelayCount = 10;
        }

    }

    //행위
    move(x,y){
        // this.#x = x;
        // this.#y = y;
        let w = x - this.#x;
        let h = y - this.#y;

        let d = Math.sqrt(w*w+h*h);
        let speed = 3;
        this.#vx = (w/d) * speed; //목적지 까지의 단위벡터
        this.#vy = (h/d) * speed;
        this.#dx = x; //목적지
        this.#dy = y;

        if(Math.abs(w)>Math.abs(h)){
            if(w<0)
                this.#dirIndex = 3;
            else
                this.#dirIndex = 1;
        }
        else{
            if(h<0)
                this.#dirIndex = 0;
            else
                this.#dirIndex = 2;
        }
    }
};