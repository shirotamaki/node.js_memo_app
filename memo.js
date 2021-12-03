// メモを追加
function main (stdin) {
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database('./memo.db')
  db.serialize(() => {
    db.run('CREATE TABLE if not exists foodb (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)')
    db.run('INSERT INTO foodb (content) VALUES (?)', stdin)
  })
  db.close()
}

// lオプション
function displayLoption () {
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database('./memo.db')
  db.serialize(() => {
    db.each('SELECT * FROM foodb', (error, row) => {
      if (error) {
        console.error('Error!', error)
        return
      }
      console.log(row.content.split('\n')[0])
    })
  })
  db.close()
}

// dオプション
function displayDoption () {
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database('./memo.db')
  db.serialize(() => {
    db.run('DELETE FROM foodb WHERE id = 1', error => {
      if (error) {
        return console.error(error.message)
      }
    })
  })
}

// rオプション
function displayRoption () {
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database('./memo.db')
  db.serialize(() => {
    db.each('SELECT * FROM foodb', (error, row) => {
      // 選択したメモを表示できるようにしたい（未実装）
      if (error) {
        console.error('Error!', error)
        return
      }
      const foo = row.content.split('\n')
      return foo
    })
    db.close()
  })
}

// Enquirerライブラリー
const Enquirer = require('enquirer');
const foo = (async ()=> {
  const question = {
    type: 'select',
    name: 'favorite',
    message: '好きな乗り物は？',
    choices: ['パトカー', '救急車', '消防車'],
  };
  const answer = await Enquirer.prompt(question);
  console.log(`僕も${answer.favorite}が好きだよ`);
})();

// オプション受け付け
const args = process.argv.slice(2)
if (args == '-l') {
  displayLoption()
} else if (args == '-r') {
  const foo = displayRoption()
  console.log(foo)
} else if (args == '-d') {
  displayDoption()
} else if (args == '') {
  main(require('fs').readFileSync('/dev/stdin', 'utf8'))
} else {
  console.log('引数に誤りがあります')
}
