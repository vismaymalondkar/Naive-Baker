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
    response.status(200).json(results.rows)
  }
  )

  
  }

  const getRecipes = (request, response) => {
    rids={}
    pool.query('select * from naiveBakerSchema.ingredients ', (error, results) => {
      if (error) {
        throw error
      }
      rids=results.rows;    
          response.status(200).json(results.rows)
         })

  }
  


module.exports = {
  getIngredientsList,
  putIngredientsList
}