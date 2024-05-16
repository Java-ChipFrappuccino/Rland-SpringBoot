import Boy from "../item/boy.js";

export default class Room {
  #img;
  #ctx;
  #boy;
  #canvas;
  #timerId
  constructor() {
    this.#timerId;
    const gameSection = document.querySelector("#game-section");
    this.#canvas = gameSection.querySelector(".room");
    // bind에서 묶어줘야함
    this.#canvas.onclick = this.clickHandler.bind(this);

    /** @type {CanvasRenderingContext2D} */
    this.#ctx = this.#canvas.getContext("2d");

    this.#img = new Image();
    this.#img.src = "./res/map.png";

    this.#boy = new Boy();
    this.run();
  }
  // for event handling -------------------------
  clickHandler(e) {
    // this.#ctx.drawImage(this.#img, 0, 0)
    this.#boy.move(e.x, e.y);
    // this.#boy.draw(this.#ctx);
    // 위치가 바뀌었으니까 다시 그려
  }

  // for animation -------------------------
  draw() {
    this.#ctx.drawImage(this.#img, 0, 0);
    this.#boy.draw(this.#ctx)
    //     this.#ctx.drawImage(
    //         this.#img,
    //         //source image
    //         0, 0, 200, 200,
    //         //dest image
    //         100, 100, 200, 200
    //     )
    // }
  }
  update() {
    this.#boy.update();
  }

  // for service ---------------------
  run() {
    this.#timerId = setInterval(()=>{
        this.update();
        this.draw();
    },17); //1000/60
  }

  stop() {
    clearInterval(this.#timerId);
  }
}
