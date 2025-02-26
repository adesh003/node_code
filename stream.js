const fs = require('fs');
const server = require('http').createServer();


server.on('request' , (req, res) =>{
  // Solution 1
  
  // fs.readFile('input.txt' , (err, data) =>{
  //   if(err) console.log(err);
  //   res.end(data);
  // })
  
  // SOLUTION 2
  
  // const readAble= fs.createReadStream('input.txt')
  // readAble.on('data' , chunk =>{
  //   res.write(chunk);
  // })
  // readAble.on('end' , () =>{
  //   res.end();
  // })
  
  // readAble.on('error' , err =>{
  //   console.log(err)
  //   res.statusCode=500;
  //   res.end("file not found")
  // })
  
  
  // SOLUTION 3
  
  const readAble = fs.createReadStream("input.txt");
  readAble.pipe(res);
  // readableSource.pipe(writeable_Destination)
  
  
  
})

server.listen(8000, '127.0.0.1', ()=> {
console.log("listening...")  
})