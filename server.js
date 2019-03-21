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
app.get('/recipe', (request, response) => {
pool.connect(function(err,client,done){
   if (err){
     console.log("no connecttion");
    }
client.query('select * from (select * from naiveBakerSchema.recipes order by recipeid) as r order by numOfLikes desc limit 10',function(err,result){
//  done();
  len;
  response.send(result.rows);
  len=result.rows.length;
})  }) });


app.post('/recipe',db.ingredientListFromId);


app.get('/getIngredientList',db.getIngredientsList);
//when u put ingredient list server returns recipe names as response
app.post('/putIngredientList',db.putIngredientsList);
app.get('/signup',db.getUsernameList);
app.post('/signup',db.addUser);
app.get('/login',db.getUsernameAndPasswordList);
app.post('/newrecipe',db.addRecipe);

app.post('/likerecipe',db.likeRecipe);
app.post('/dislikerecipe',db.disLikeRecipe);
app.post('/checklikedrecipe',db.checkLikedRecipe);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
