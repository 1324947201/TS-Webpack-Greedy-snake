class Save {


  //构建DOM
  recordDomDataCreat() {
    let data = JSON.parse(window.localStorage.getItem('championList') || '[]')
    let str = `
          <tr>
            <td>RANK</td>
            <td>SCORE</td>
            <td>TIME</td>
          </tr>`
    if (data !== []) {
      for (let i = 0; i < data.length; i++) {
        str += `          
          <tr>
            <td>${i + 1}</td>
            <td>${data[i].score}</td>
            <td>${data[i].time}</td>
          </tr>`
      }
    }
    return str
  }
}

module.exports = Save
export default void 0
