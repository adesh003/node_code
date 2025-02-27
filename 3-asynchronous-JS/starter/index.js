const fs = require('fs');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

const readfilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('could not found file');
      resolve(data);
    });
  });
};

const getDogPic = async () => {
  try{
  const data = await readfilePro(`${__dirname}/dog.txt`);
  console.log(`Bread: ${data}`);

  const res = await superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  console.log(res.body.message);

  await writeFilePro('dog-img.txt', res.body.message);
  console.log('Random dog image save to file');
}
catch(err){
};
}

console.log("1");
getDogPic();
console.log("2")

// readfilePro(`${__dirname}/dog.txt`).then((data) => {
//   console.log(`Bread: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('random dog image saved...');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {});
