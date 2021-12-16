#!/usr/bin/env node

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

  deleteMemo (memoId) {
    this.db.run('DELETE FROM foodb WHERE id = ?', memoId, error => {
      if (error) {
        return console.error(error.message)
      }
    })
  }
}

const getDbObj = async function () {
  this.db.all('SELECT * FROM foodb', (error, rows) => {
    if (error) {
      console.error('Error!', error)
      return
    }
  console.log(rows)
  })
  // return rows
}

  // selectMemo (rows) {
  //   return new Promise((resolve) => {
  //     const memosTitle = rows.map(({ content }) => content.split('\n')[0])
  //     const values = {
  //       type: 'select',
  //       name: 'memoTitle',
  //       message: 'Choose a note you want to see:',
  //       choices: memosTitle
  //     }
  //     const memo = Enquirer.prompt(values)
  //     memo.then(({ memoTitle }) => {
  //       const selectedMemo = rows.find(element => element.content.split('\n')[0] === memoTitle)
  //       resolve(selectedMemo)
  //     })
  //   })
  // }

class Display {
  constructor () {
    this.storage = new Storage()
  }

  async displayLOption () {
    const rows = await getDbObj()
    console.log(rows)
    rows.forEach((memoTitle) => {
      console.log(memoTitle.content.split('\n')[0])
    })
  }

  async displayROption () {
    const rows = await this.storage.getDbObj()
    const selectedMemo = await this.storage.selectMemo(rows)
    console.log(selectedMemo.content)
  }

  async displayDOption () {
    const rows = await this.storage.getDbObj()
    const selectedMemo = await this.storage.selectMemo(rows)
    await this.storage.deleteMemo(selectedMemo.id)
  }
}

class Option {
  constructor () {
    this.display = new Display()
  }

  async getOption () {
    const args = await process.argv.slice(2).join(',')
    if (args === '-l') {
      this.display.displayLOption()
    } else if (args === '-r') {
      this.display.displayROption()
    } else if (args === '-d') {
      this.display.displayDOption()
    } else if (args === '') {
      const storage = new Storage()
      storage.insert(require('fs').readFileSync('/dev/stdin', 'utf8'))
    } else {
      console.log('引数に誤りがあります')
    }
  }
}

const main = new Option()
main.getOption()
