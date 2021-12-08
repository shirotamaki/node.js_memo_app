const Enquirer = require('enquirer')

class Storage {
  constructor () {
    const sqlite3 = require('sqlite3').verbose()
    this.db = new sqlite3.Database('./memo.db')

    this.initialize()
  }

  initialize () {
    this.db.run('CREATE TABLE if not exists foodb (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)')
  }

  insert (stdin) {
    this.db.run('INSERT INTO foodb (content) VALUES (?)', stdin)
  }

  getDbObj () {
    return new Promise(function (resolve, reject) {
      this.db.all('SELECT * FROM foodb', (error, rows) => {
        if (error) {
          console.error('Error!', error)
          return
        }
        resolve(rows)
      })
    })
  }

  selectMemo (rows) {
    return new Promise(function (resolve, reject) {
      const memosTitle = rows.map(({ content }) => content.split('\n')[0])
      const values = {
        type: 'select',
        name: 'memoTitle',
        message: 'Choose a note you want to see:',
        choices: memosTitle,
      }
      const memo = Enquirer.prompt(values)
      memo.then(({ memoTitle }) => {
        const selectedMemo = rows.find(element => element.content.split('\n')[0] === memoTitle)
        resolve(selectedMemo)
      })
    })
  }

  deleteMemo (memoId) {
    this.db.run('DELETE FROM foodb WHERE id = ?', memoId, error => {
      if (error) {
        return console.error(error.message)
      }
    })
  }
}

const storage = new Storage()
// lオプション
async function displayLoption () {
  const rows = await storage.getDbObj()
  rows.forEach(function (memoTitle) {
    console.log(memoTitle.content.split('\n')[0])
  })
}

// rオプション
async function displayRoption () {
  const rows = await storage.getDbObj()
  const selectedMemo = await storage.selectMemo(rows)
  console.log(selectedMemo.content)
}

// dオプション
async function displayDoption () {
  const rows = await storage.getDbObj()
  const selectedMemo = await storage.selectMemo(rows)
  await deleteMemo(selectedMemo.id)
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
  const storage = new Storage()
  storage.insert(require('fs').readFileSync('/dev/stdin', 'utf8'))
} else {
  console.log('引数に誤りがあります')
}

