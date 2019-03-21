const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  database: 'postgres',
  password: 'password',
  port: 5432,
});
const getIngredientsList = (request, response) => {
  console.log(request);
  pool.query('select * from naiveBakerSchema.ingredients ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const putIngredientsList = (request, response) => {
  console.log(request);
  const id=request.body;
      pool.query('select r.id from naiveBakerSchema.recipes as r left join naiveBakerSchema.recipeIngredients as ri on r.id=ri.recipe_id  left join naiveBakerSchema.ingredients as i on i.id=ri.ingredientId where i.id NOT IN ($1) GROUP BY r.id HAVING COUNT(i.id)=0',[id], (error, results) => {
      if (error) {
          throw error
        }
        response.status(200).json(results.rows);
    })
  }

const addUser = (request,response) => {
  const data=request.body;
  let strin='insert into naiveBakerSchema.users (userName,userFullName,userPass,email) values (\'' + data.username + '\',\'' + data.fullname + '\',\'' + data.password + '\',\'' + data.email + '\')';
  console.log(strin);
  pool.query(strin, (error, results) => {
    if (error) {
        throw error
      }
      response.status(200).json(results.rows);
  })
}

const ingredientListFromId = (request,response) => {
  const id=request.body.recipeid;
  let strin='select ingredientname from naivebakerschema.ingredients natural join (select ingredientid from naivebakerschema.recipeingredient where recipeid='+id+') as reci';
  pool.query(strin, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const checkLikedRecipe = (request,response) => {
  let strin='select * from naivebakerschema.likeslog where recipeid='+request.body.recipeid+' and userid='+request.body.userid;
  pool.query(strin, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsernameList= (request,response) => {
  pool.query('select userName from naiveBakerSchema.users ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsernameAndPasswordList = (request,response) => {
  pool.query('select userId,userName,userPass from naiveBakerSchema.users ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRecipes = (request, response) => {
  rids={}
  pool.query('select * from naiveBakerSchema.ingredients ', (error, results) => {
    if (error) {
      throw error
    }
    rids=result.rows;    
        response.status(200).json(results.rows)
   })

}

const likeRecipe = (request, response) => {

  const strin='UPDATE naiveBakerSchema.recipes SET numOfLikes = numOfLikes + 1 WHERE recipeId = '+request.body.recipeid;
  pool.query(strin,(error, results) => {
    if (error) {
      throw error
    }
  });
  const strin2='INSERT into naiveBakerSchema.likeslog (userid,recipeid) values ('+request.body.userid+','+request.body.recipeid+')';
  pool.query(strin2,(error, results) => {
    if (error) {
      throw error
    }
  });
}

const disLikeRecipe = (request, response) => {

  const strin='UPDATE naiveBakerSchema.recipes SET numOfLikes = numOfLikes - 1 WHERE recipeId = '+request.body.recipeid;
  pool.query(strin,(error, results) => {
    if (error) {
      throw error
    }
  });
  const strin2='DELETE from naiveBakerSchema.likeslog where userid='+request.body.userid+' and recipeid='+request.body.recipeid;
  pool.query(strin2,(error, results) => {
    if (error) {
      throw error
    }
  });
}
  
const addRecipe = async(request,response) => {
  const data=request.body;
  let strin='insert into naiveBakerSchema.recipes (recipeName,category,mealType,cookingTime,calories,imageLink,cuisine,description,cookingProcedure,numOfViews,numOfLikes,numOfComments,numOfShares) values (\'' + data.title + '\',\'' + data.category + '\',\'' + data.mealType + '\',\'' + data.cookingTime + '\',\'' + data.calories + '\',\'' + data.imageLink + '\',\'' + data.cuisine + '\',\'' + data.description + '\',\'' + data.procedure +'\',\'0\',\'0\',\'0\',\'0\')';
  var recipeid;
  try{
    const res = await pool.query(strin);
    response.status(200).json(res.rows);
  }
  catch(err){
    throw err;
  }
  
  let strng2='select recipeId from naiveBakerSchema.recipes order by recipeId desc limit 1';
  try {
    const res = await pool.query(strng2);
    recipeid=res.rows[0].recipeid;
  }
  catch(error){
    throw error;
  }

  console.log(recipeid);
  let strng3='insert into naiveBakerSchema.uploadsLog (userId,recipeId) values(\'' + data.userid +'\',\''+recipeid+ '\')';
  pool.query(strng3, (error, results) => {
      if (error) {
          throw error
        }
  });
}

module.exports = {
  getIngredientsList,
  putIngredientsList,
  addUser,
  getUsernameList,
  getUsernameAndPasswordList,
  addRecipe,
  ingredientListFromId,
  likeRecipe,
  disLikeRecipe,
  checkLikedRecipe
}