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

  //格式化当前时间函数
  dateFormat(time: number) {
    const t = new Date(time)
    // 日期格式
    const format = 'Y-m-d h:i:s'
    let year: number | string = t.getFullYear()
    // 由于 getMonth 返回值会比正常月份小 1
    let month: number | string = t.getMonth() + 1
    let day: number | string = t.getDate()
    let hours: number | string = t.getHours()
    let minutes: number | string = t.getMinutes()
    let seconds: number | string = t.getSeconds()
    month = month > 9 ? month : `0${month}`
    day = day > 9 ? day : `0${day}`
    hours = hours > 9 ? hours : `0${hours}`
    minutes = minutes > 9 ? minutes : `0${minutes}`
    seconds = seconds > 9 ? seconds : `0${seconds}`
    const hash: { [key: string]: string } = {
      'Y': year.toString(),
      'm': month.toString(),
      'd': day.toString(),
      'h': hours.toString(),
      'i': minutes.toString(),
      's': seconds.toString()
    }
    return format.replace(/\w/g, o => {
      return hash[o]
    })
  }

  //游戏结束，保存成绩
  save() {
    if (window.localStorage.getItem('championList') !== null) {
      let list = JSON.parse(window.localStorage.getItem('championList')!)
      //将新数据压入数组
      list.push({ score: this.score, time: this.dateFormat(Date.now()) })
      //将数组按照分数进行重排序
      list.sort(function (a: { score: number }, b: { score: number }) {
        return b.score - a.score
      })
      list.splice(10, 1)
      window.localStorage.setItem('championList', JSON.stringify(list))
    } else {
      let list = [{ score: this.score, time: this.dateFormat(Date.now()) }]
      window.localStorage.setItem('championList', JSON.stringify(list))
    }
  }
}

module.exports = ScorePanel
export default void 0