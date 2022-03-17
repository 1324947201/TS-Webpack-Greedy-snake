class Snake {
  //蛇元素
  snake: HTMLElement
  //蛇头元素
  head: HTMLElement
  //蛇身元素
  body: HTMLCollection

  constructor() {
    this.snake = document.getElementById('snake') as HTMLElement
    this.head = document.getElementById('head') as HTMLElement
    this.body = this.snake.getElementsByTagName('div') as HTMLCollection
  }

  get x() {
    return this.head.offsetLeft
  }

  get y() {
    return this.head.offsetTop
  }

  set x(value: number) {
    if (this.x === value) return
    //移动身体
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkBroken()
  }

  set y(value: number) {
    if (this.y === value) return
    //移动身体
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkBroken()
  }

  //增加身体长度
  addLength() {
    let div = document.createElement('div')
    this.snake.appendChild(div)
  }

  //蛇身体移动
  moveBody() {
    //将后边的身体位置设为前边身体的位置
    //遍历获取所有身体的位置
    for (let i = this.body.length - 1; i > 0; i--) {
      //获取前面身体的位置
      let x = (this.body[i - 1] as HTMLElement).offsetLeft
      let y = (this.body[i - 1] as HTMLElement).offsetTop
        //将前一个身体的值设置到当前身体上
        ; (this.body[i] as HTMLElement).style.left = x + 'px'
        ; (this.body[i] as HTMLElement).style.top = y + 'px'
    }
  }

  //检查蛇头是否撞到身体
  checkBroken() {
    //获取所有身体，监测其是否与蛇头坐标重合
    for (let i = 4; i < this.body.length; i++) {
      let bd = this.body[i] as HTMLElement
      if (this.x === bd.offsetLeft && this.y === bd.offsetTop) {
        throw new Error('GAME OVER')
      }
    }
  }
}

module.exports = Snake
export default void 0

