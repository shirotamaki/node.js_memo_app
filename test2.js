#!/usr/bin/env node
const sqlite3 = require('sqlite3').verbose()
const util = require('util');


class Storage {
  constructor () {
    this.db = new sqlite3.Database('./memo.db')
    this.divPromise = util.pomisify(this.db);
    // this.initialize()
  }

  async main () {
      const result = await this.divPromise.all('SELECT * FROM foodb', (error, rows) => {
        if (error) {
          console.error('Error!', error)
          return
      }
        return rows
  })
}

const storage = new Storage()
storage.main()
