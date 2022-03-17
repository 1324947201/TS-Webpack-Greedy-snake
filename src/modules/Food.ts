class Food {
  element: HTMLElement
  fatherElement: HTMLElement
  value: number

  constructor(value: number) {
    this.element = document.getElementById('food') as HTMLElement
    this.fatherElement = document.getElementById('game-screen') as HTMLElement
    //食物分值
    this.value = value
    //重置食物位置
    this.rePoint()
    //窗口大小变化事件
    this.resize()
  }

  get x(): number {
    return this.element.offsetLeft
  }

  get y(): number {
    return this.element.offsetTop
  }

  ponitValue(): number[] {
    return [this.fatherElement.clientWidth, this.element.clientWidth]
  }

  //随机范围内坐标
  protected randomPoint(): number {
    let value = this.fatherElement.clientWidth - this.element.clientWidth
    //控制坐标必须为食物大小的倍数
    return Math.round((value / this.element.clientWidth) * Math.random()) * this.element.clientWidth
  }

  //重置屏幕大小为食物大小的20倍
  resize() {
    this.fatherElement.style.width = this.element.clientWidth * 20 + 'px'
    window.addEventListener('resize', () => {
      this.fatherElement.style.width = this.element.clientWidth * 20 + 'px'
      this.rePoint()
    })
  }

  //重置食物坐标
  rePoint(): number[] {
    let x = this.randomPoint()
    let y = this.randomPoint()
    this.element.style.left = x + 'px'
    this.element.style.top = y + 'px'
    return [x, y]
  }
}

module.exports = Food
export default void 0

