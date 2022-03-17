const Snake = require('./Snake')
const Food = require('./Food')
const ScorePanel = require('./ScorePanel')

class GameControl {
  snake
  food
  scorePanel
  //按钮
  up: HTMLElement
  down: HTMLElement
  left: HTMLElement
  right: HTMLElement
  //控制按钮
  pauseBtn: HTMLElement
  recordBtn: HTMLElement
  //当前移动方向
  direction: string = ''
  //记录游戏是否结束
  isLive: boolean = true
  //记录游戏是否暂停
  isPause: boolean = false

  constructor() {
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
    this.food = new Food(this.scorePanel.level)
    //绑定按钮元素
    this.up = document.getElementById('up') as HTMLElement
    this.down = document.getElementById('down') as HTMLElement
    this.left = document.getElementById('left') as HTMLElement
    this.right = document.getElementById('right') as HTMLElement
    this.pauseBtn = document.getElementById('stop') as HTMLElement
    this.recordBtn = document.getElementById('record') as HTMLElement
    //游戏初始化
    this.init()
  }

  //游戏初始化
  init() {
    //监听键盘按下事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    //监听按钮按下事件
    this.rocker()
    //监听控制按钮按下事件
    this.control()
    //开启移动
    this.move()
  }

  //键盘按下响应函数
  keydownHandler(event: KeyboardEvent) {
    //判断是否在暂停状态中，如果是的话，按任意键继续游戏
    if ((this.isPause === true) && (event.key === this.direction)) {
      this.isPause = false
      this.scorePanel.notice.innerHTML = ''
      //开启移动
      return this.move()
    }
    //禁止蛇掉头，同时将掉头按键改为暂停键
    switch (this.direction) {
      case '':
        if (event.key === ('ArrowLeft' || 'Left')) {
          break
        }
        this.direction = event.key
        break
      case 'ArrowUp' || 'Up':
        if (event.key === ('ArrowDown' || 'Down')) {
          this.pause()
          break
        }
        this.direction = event.key
        break
      case 'ArrowDown' || 'Down':
        if (event.key === ('ArrowUp' || 'Up')) {
          this.pause()
          break
        }
        this.direction = event.key
        break
      case 'ArrowLeft' || 'Left':
        if (event.key === ('ArrowRight' || 'Right')) {
          this.pause()
          break
        }
        this.direction = event.key
        break
      case 'ArrowRight' || 'Right':
        if (event.key === ('ArrowLeft' || 'Left')) {
          this.pause()
          break
        }
        this.direction = event.key
        break
    }
  }

  //游戏暂停处理函数
  pause() {
    this.isPause = !this.isPause
    if (this.isPause === false) {
      this.scorePanel.notice.innerHTML = ''
      this.move()
      return
    }
    this.scorePanel.notice.innerHTML = 'PAUSE'
  }

  //绑定控制按钮按下事件
  control() {
    this.pauseBtn.addEventListener('click', this.pause.bind(this))
  }

  //绑定按钮按下事件
  rocker() {
    this.up.addEventListener('click', () => { this.direction = 'ArrowUp' })
    this.down.addEventListener('click', () => { this.direction = 'ArrowDown' })
    this.left.addEventListener('click', () => { this.direction = 'ArrowLeft' })
    this.right.addEventListener('click', () => { this.direction = 'ArrowRight' })
  }

  //检查蛇是否吃到食物
  checkEat(x: number, y: number) {
    if (x === this.food.x && y === this.food.y) {
      this.food = new Food()
      this.scorePanel.addScore()
      this.snake.addLength()
    }
  }

  //游戏结束
  stop() {
    this.isLive = false
  }

  //控制蛇移动
  move() {
    let x = this.snake.x
    let y = this.snake.y

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        y -= this.food.element.clientWidth
        //判断是否穿墙，下同
        if (y < 0) { y = this.food.element.clientWidth * 19 }
        break
      case 'ArrowDown':
      case 'Down':
        y += this.food.element.clientWidth
        if (y > this.food.element.clientWidth * 19) { y = 0 }
        break
      case 'ArrowLeft':
      case 'Left':
        x -= this.food.element.clientWidth
        if (x < 0) { x = this.food.element.clientWidth * 19 }
        break
      case 'ArrowRight':
      case 'Right':
        x += this.food.element.clientWidth
        if (x > this.food.element.clientWidth * 19) { x = 0 }
        break
    }
    //判断蛇是否吃到了食物
    this.checkEat(x, y)

    //监测游戏是否结束
    try {
      //重置蛇头坐标
      this.snake.x = x
      this.snake.y = y
    } catch (e) {
      this.scorePanel.notice.innerHTML = 'GAME OVER'
      this.scorePanel.save()
      this.stop()
    }

    //开启定时器，每单位时间调用一次move函数，移动蛇
    if (!this.isPause && this.isLive) {
      setTimeout(this.move.bind(this), 230 - 20 * (this.scorePanel.level))
    }
  }
}

export default GameControl