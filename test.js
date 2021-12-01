const Enquirer = require('enquirer')

// class MemoSelector {
// (async　displayRoption () {
//   const question = {
//     type: 'select',
//     name: 'favorite',
//     message: '好きな乗り物は？',
//     choices: ['パトカー', '救急車', '消防車'],
//   };
//   const answer = await Enquirer.prompt(question);
//   console.log(`僕も${answer.favorite}が好きだよ`);
// })();

function displayRoption () {
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database('./memo.db')
  db.serialize(() => {
    db.each('SELECT * FROM foodb', (error, row) => {
      // 選択したメモを表示できるようにしたい（未実装）
      if (error) {
        console.error('Error!', error)
      }
      const foo = row.content.split('\n')
    return foo
    })
    db.close()
  })
}

const foo = displayRoption()
console.log(foo)
//
// function toSeconds(hour, min, sec) {
//   var answer = hour * 3600 + min * 60 + sec;
//   return(answer);
// }
//
// const foo = toSeconds(12, 10, 5)
// console.log(foo)




