const foo = async () => {
  const answer = await new Promise(function (resolve, reject) {
    console.log('promise')
    // reject("bye");
    resolve('hello')
  })
  console.log(answer)
}

foo()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./memo.db')

// rオプション
const displayRoption = async () => {
  const answer = await new Promise(function (resolve, reject) {
    db.each('SELECT * FROM foodb', (error, row) => {
      if (error) {
        console.error('Error!', error)
        return
      }
      row.content.split('\n')
      return
    })
    db.close()
  })
}

// Enquirerライブラリー
const Enquirer = require('enquirer')
const foo = (async () => {
  const question = {
    type: 'select',
    name: 'favorite',
    message: '好きな乗り物は？',
    choices: ['パトカー', '救急車', '消防車'],
  }
  const answer = await Enquirer.prompt(question)
  console.log(`僕も${answer.favorite}が好きだよ`)
})()

func = async () => {
  await log(3)
  await log(2)
  await log(1)
}

log = (num) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log(num)
      resolve('hello')
      console.log(resolve)
    }, 1000)
  })
}

func()
console.log(func)

new Promise(resolve => resolve('hello'))
  .then(res => console.log(res))


  ```
func = async () => {
  console.log(await log(3))
  await log(2)
  await log(1)
}

log = (num) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log(num)
      resolve('hello')
    }, 1000)
  })
}
func()

// 結果
Promise {<pending>}
3
hello
2
1
```

func = () => {
  log(3).then(arg => console.log(arg))
}

log = (num) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log(num)
      resolve('hello')
    }, 1000)
  })
}

func()

// 実行結果
// 3
// hello