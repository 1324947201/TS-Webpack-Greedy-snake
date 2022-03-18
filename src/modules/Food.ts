class Food {
  element: HTMLElement
  fatherElement: HTMLElement

  constructor(snakeBodies: HTMLCollection) {
    this.element = document.getElementById('food') as HTMLElement
    this.fatherElement = document.getElementById('game-screen') as HTMLElement
    //重置食物位置
    this.rePoint(snakeBodies)
    //窗口大小变化事件
    this.resize(snakeBodies)
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
  randomPoint(): number {
    let value = this.fatherElement.clientWidth - this.element.clientWidth
    //控制坐标必须为食物大小的倍数
    return Math.round((value / this.element.clientWidth) * Math.random()) * this.element.clientWidth
  }

  //重置屏幕大小为食物大小的20倍
  resize(snakeBodies: HTMLCollection) {
    this.fatherElement.style.width = this.element.clientWidth * 20 + 'px'
    window.addEventListener('resize', () => {
      this.fatherElement.style.width = this.element.clientWidth * 20 + 'px'
      this.rePoint(snakeBodies)
    })
  }

  //重置食物坐标
  rePoint(snakeBodies: HTMLCollection): number[] {
    let x = this.randomPoint()
    let y = this.randomPoint()
    let isOverlap = false
    //判断是否与蛇重叠
    for (let i = 0; i < snakeBodies.length; i++) {
      if (x === (snakeBodies[i] as HTMLDivElement).offsetLeft && y === (snakeBodies[i] as HTMLDivElement).offsetTop) {
        isOverlap = true
        break
      }
    }
    if (isOverlap) {
      return this.rePoint(snakeBodies)
    } else {
      this.element.style.left = x + 'px'
      this.element.style.top = y + 'px'
      return [x, y]
    }
  }
}

module.exports = Food
export default void 0

