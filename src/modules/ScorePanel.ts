class ScorePanel {
  //初始化数据
  score = 0
  level = 1
  maxLevel: number
  scoreEle: HTMLElement
  levelEle: HTMLElement
  notice: HTMLElement

  //获取两个记分牌的元素
  constructor(ml: number = 9) {
    this.scoreEle = document.getElementById('score') as HTMLElement
    this.levelEle = document.getElementById('level') as HTMLElement
    this.notice = document.getElementById('notice') as HTMLElement
    this.maxLevel = ml
  }

  //增加分数
  addScore() {
    this.score += this.level
    this.scoreEle.innerHTML = this.score + ''
    switch (this.score) {
      case 10:
        this.addLevel()
        break
      case 30:
        this.addLevel()
        break
      case 60:
        this.addLevel()
        break
      case 100:
        this.addLevel()
        break
      case 150:
        this.addLevel()
        break
      case 210:
        this.addLevel()
        break
      case 280:
        this.addLevel()
        break
      case 360:
        this.addLevel()
        break
      case 450:
        this.addLevel()
        break
    }
  }

  //增加等级
  protected addLevel() {
    if (this.level < 9) {
      this.level++
      this.levelEle.innerHTML = this.level + ''
    }
  }

  //游戏结束，保存成绩
  save() {
    if (window.localStorage.getItem('championList') !== null) {
      let list = JSON.parse(window.localStorage.getItem('championList')!)
      list.push({ score: this.score, level: this.level })
      //将数组按照分数进行重排序
      list.sort(function (a: { score: number }, b: { score: number }) {
        return a.score - b.score
      })
      window.localStorage.setItem('championList', JSON.stringify(list))
    } else {
      let sp = { score: this.score, level: this.level }
      let list = [sp]
      window.localStorage.setItem('championList', JSON.stringify(list))
    }
  }
}

module.exports = ScorePanel
export default void 0