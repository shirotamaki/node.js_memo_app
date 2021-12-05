// やりたいこと
// -rオプション　（メモのタイトルだけ表示させ、選択したメモを全文表示させる）
// -dオプション　（メモのタイトルだけ表示させ、選択したメモをDBから削除する）

// Enquireモジュールを活用し、
// choicesの箇所へ、DBから取り出したcontentのデータを配列にして渡せばいけると思われる

const Enquirer = require('enquirer')
// sqlite3
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./memo.db')

// メモを追加用
function main (stdin) {
  db.serialize(() => {
    db.run('CREATE TABLE if not exists foodb (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)')
    db.run('INSERT INTO foodb (content) VALUES (?)', stdin)
  })
  db.close()
}

// lオプション
function displayLoption () {
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
  db.serialize(() => {
    db.all('SELECT * FROM foodb', (error, rows) => {
      if (error) {
        console.error('Error!', error)
        return
      }
      const memoTitles = rows.map(({ content }) => content.split('\n')[0])
      const memos = rows
      const values = {
        type: 'select',
        name: 'memoTitle',
        message: 'Choose a note you want to see:',
        choices: memoTitles,
      }
      const answer = Enquirer.prompt(values)
      answer.then(({ memoTitle }) => {
        const memoIds = memos.find(element => element.content.split('\n')[0] === memoTitle)
        const memoId = memoIds.id
        // console.log(memoId)
      })
    })
    db.close()
  })
  db.serialize(() => {
    db.run('DELETE FROM foodb WHERE id = "memoId"', error => {
      if (error) {
        return console.error(error.message)
      }
    })
    db.close()
  })
}

// rオプション
function displayRoption () {
  db.serialize(() => {
    db.all('SELECT * FROM foodb', (error, rows) => {
      if (error) {
        console.error('Error!', error)
        return
      }
      const memoTitles = rows.map(({ content }) => content.split('\n')[0])
      const memoAllData = rows.map(({ content }) => content)
      const values = {
        type: 'select',
        name: 'memoTitle',
        message: 'Choose a note you want to see:',
        choices: memoTitles,
      }
      const answer = Enquirer.prompt(values)
      answer.then(({ memoTitle }) => {
        const memoContent = memoAllData.find(element => element.split('\n')[0] === memoTitle)
        console.log(memoContent)
      })
    })
    db.close()
  })
}

// オプション受け付け
const args = process.argv.slice(2)
if (args == '-l') {
  displayLoption()
} else if (args == '-r') {
  displayRoption()
} else if (args == '-d') {
  displayDoption()
} else if (args == '') {
  main(require('fs').readFileSync('/dev/stdin', 'utf8'))
} else {
  console.log('引数に誤りがあります')
}
