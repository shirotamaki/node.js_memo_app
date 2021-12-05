// // sqlite3
// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('./memo.db')
// // Enquirerモジュール
// const Enquirer = require('enquirer');
//
//
// // const foo = (async ()=> {
// //   const question = {
// //     content: ['パトカー', '救急車', '消防車'],
// //   };
// //   const answer = await Enquirer.prompt(question);
// //   console.log(`僕も${answer.favorite}が好きだよ`);
// // })();
//
displayRoption = async () => {
  console.log(await dataForOutput())
}

 dataForOutput = () => {
  return new Promise(function (resolve, reject) {
    db.serialize(() => {
      db.each('SELECT * FROM foodb', (error, row) => {
        if (error) {
          console.error('Error!', error)
          return
        }
        const bar = row.content.split('\n')[0]
        resolve(bar)
      })
        db.close()
    })
  })
}

// displayRoption()
//
//
// const Enquirer = require('enquirer');
// ( ()=> {
//   const question = {
//     type: 'select',
//     name: 'favorite',
//     message: '好きな乗り物は？',
//     choices: ['パトカー', '救急車', '消防車'],
//   };
//   const answer =  Enquirer.prompt(question);
//   answer.then( (answer) => { console.log(answer)})
//   console.log(answer)
//   console.log(`僕も${answer.favorite}が好きだよ`);
// })();
//
// function sleep(val) {
//   return new Promise(function(resolve) {
//     setTimeout(function() {
//       console.log(val++);
//       resolve(val);
//     }, 1000);
//   });
// }
//
// sleep(0).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// })
// const { prompt } = require('enquirer');
// const response = await prompt([
//   {
//     type: 'input',
//     name: 'name',
//     message: 'What is your name?'
//   },
//   {
//     type: 'input',
//     name: 'username',
//     message: 'What is your username?'
//   }
// ]);
//
// console.log(response);
// response()
//
// const { prompt } = require('enquirer');
//
// const question = {
//   type: 'input',
//   name: 'username',
//   message: 'What is your username?'
// };
//
// prompt(question)
// .then(a => console.log('Answer:', a))
// .catch(console.error);
//
//
//
// const answer = Enquirer.prompt(values)
// answer.then(({ title }) => console.log( title ))
//


 const foo =  [
  'test1\nmemo\nmemo\nmemo\n',
    'test2\n123\n456\n789\n',
    'test3\nメモ\nめも\n'
  ]

const bar = foo.find(element => element.split('\n')[0] === 'test3' )
console.log(bar)

❯ node test.js
test3
メモ
めも

const answer = Enquirer.prompt(values)
answer.then(({ title }) => console.log( title ))
.then((res) => {
  const bar = memoAllData.find(element => element.split('\n')[0] === res.title)
  console.log(bar)
})












