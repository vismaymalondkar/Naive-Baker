const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const cors = require('cors')
const port = 5000
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
 
const pg=require('pg');

const config={
  user: 'postgres',
  database: 'postgres',
  password: 'password',
  port: 5432,
}
const pool=new pg.Pool(config);
var len=0;
app.get('/', (request, response) => {
pool.connect(function(err,client,done){
   if (err){
     console.log("no connecttion");
    }
client.query('select * from naiveBakerSchema.recipes order by numOfLikes desc limit 10',function(err,result){
//  done();
  len;
  response.send(result.rows);
  len=result.rows.length;
})  }) });



app.get('/getIngredientList',db.getIngredientsList);
//when u put ingredient list server returns recipe names as response
app.post('/putIngredientList',db.putIngredientsList);

app.post('/signup',db.addUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
