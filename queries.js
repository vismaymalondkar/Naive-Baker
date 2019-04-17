const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  database: 'postgres',
  password: 'password',
  port: 5432,
});
const getIngredientsList = (request, response) => {
  const id=request.body;

  let string ="select * from  naivebakerschema2.ingredients as i;"
  pool.query(string, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const putIngredientsList = (request, response) => {
  console.log(request);
  let id=request.body;
      pool.query('select r.id from naivebakerschema2.recipes as r left join naivebakerschema2.recipeIngredients as ri on r.id=ri.recipe_id  left join naivebakerschema2.ingredients as i on i.id=ri.ingredientId where i.id NOT IN ($1) GROUP BY r.id HAVING COUNT(i.id)=0',[id], (error, results) => {
      if (error) {
          throw error
        }
        response.status(200).json(results.rows);
    })
  }
  const SearchAll= (request,response) => {
    const data=request.body;
      let id=request.body.ingredient; 
    var inglist="(";  
        for(let i=0;i<id.length;i++) {  inglist=inglist.concat(id[i]); inglist=inglist.concat(",");}
    inglist = inglist.substring(0, inglist.length - 1);    inglist=inglist.concat(")");    console.log(inglist);
    
     id=request.body.category; 
    var catlist="(";  
        for(let i=0;i<id.length;i++) {  catlist=catlist.concat('\'');  catlist=catlist.concat(id[i]); catlist=catlist.concat('\''); 
        catlist=catlist.concat(",");}
    catlist = catlist.substring(0, catlist.length - 1);    catlist=catlist.concat(")");    console.log(catlist);

    id=request.body.mealType; 
    var mealist="(";  
        for(let i=0;i<id.length;i++) { mealist=mealist.concat('\''); mealist=mealist.concat(id[i]); mealist=mealist.concat('\''); mealist=mealist.concat(",");}
    mealist = mealist.substring(0, mealist.length - 1);    mealist=mealist.concat(")");    console.log(mealist);
    
    id=request.body.cuisine; 
    var culist="(";  
        for(let i=0;i<id.length;i++) {culist=culist.concat('\''); culist=culist.concat(id[i]); culist=culist.concat('\''); culist=culist.concat(",");}
  culist = culist.substring(0,culist.length - 1);    culist=culist.concat(")");    console.log(culist);
    
    let string ="with filtered_recipes as( select *  from naivebakerschema2.recipes as r where r.category in "+ catlist+" and r.mealtype in "
    + mealist+ " and r.cookingtime <= " +data.cookingTime + " and r.calories <= "+ data.calories+ " and r.cuisine in " + culist + 
    " ) select distinct r.recipeid,r.recipename from  filtered_recipes as r  join naivebakerschema2.recipeingredient as ri on "+
    " r.recipeid=ri.recipeid join naivebakerschema2.ingredients as i on i.ingredientid=ri.ingredientid where i.ingredientid in "+ inglist;
    pool.query(string, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const Search= (request,response) => {
  	console.log(request.body);
    const data=request.body;
     let id=data.ingredient; 
    var inglist="(";  
        for(let i=0;i<id.length;i++) {  inglist=inglist.concat(id[i]); if(i!=id.length-1)inglist=inglist.concat(",");}
	    inglist=inglist.concat(")");    if(inglist.length === 2) inglist = "(null)"; console.log(inglist);
    
     id=request.body.category; 
    var catlist="(";  
        for(let i=0;i<id.length;i++) {  catlist=catlist.concat('\'');  catlist=catlist.concat(id[i]); catlist=catlist.concat('\''); 
        if(i!=id.length-1)catlist=catlist.concat(",");}
  		catlist=catlist.concat(")");  if(catlist.length === 2)catlist = "(null)";  console.log(catlist);

    id=request.body.mealType; 
    var mealist="(";  
        for(let i=0;i<id.length;i++) { mealist=mealist.concat('\''); mealist=mealist.concat(id[i]); mealist=mealist.concat('\''); if(i!=id.length-1)mealist=mealist.concat(",");}
     mealist=mealist.concat(")");  if(mealist.length === 2) mealist = "(null)";  console.log(mealist);
    
    id=request.body.cuisine; 
    var culist="(";  
        for(let i=0;i<id.length;i++) {culist=culist.concat('\''); culist=culist.concat(id[i]); culist=culist.concat('\''); if(i!=id.length-1)culist=culist.concat(",");}
  culist=culist.concat(")"); if(culist.length === 2)  culist = "(null)";  console.log(culist);
    
    var calories = data.calories ? " and r.calories <= "+data.calories : "";
    var cookingTime = data.cookingTime ? " and r.cookingtime <= " + data.cookingTime : "";

    let string ="with total_ingredients as(select count(*) from naivebakerschema2.ingredients as i  where i.ingredientid in "+ inglist+ 
    "),recipe_ingredient_count as(select ri.recipeid, count(*) as total  from naivebakerschema2.recipeingredient as ri "
    +"   where ri.ingredientid in "+ inglist+ " group by 1 ), filtered_recipes as( select * from naivebakerschema2.recipes as r "
    +"where r.category in "+ catlist+" and r.mealtype in "+ mealist+ cookingTime + calories +" and r.cuisine in "+ culist+"   ) select *  from filtered_recipes as fr where (select * from total_ingredients)"
   + " >= (select ric.total from recipe_ingredient_count as ric where ric.recipeid=fr.recipeid);"
console.log(string);

pool.query(string, (error, results) => {
  if (error) {
    throw error
  }
  
  response.status(200).json(results.rows)
})

  }


const addUser = (request,response) => {
  const data=request.body;
  let strin='insert into naiveBakerSchema2.users (userName,userFirstName,userLastName,userPass,email,userType) values (\'' + data.username + '\',\'' + data.firstname + '\',\''+ data.lastname + '\',\'' + data.password + '\',\'' + data.email + '\',\''+ data.userType +'\')';
  console.log(strin);
  pool.query(strin, (error, results) => {
    if (error) {
        throw error
      }
      response.status(200).json(results.rows);
  })
}

const ingredientListFromId = (request,response) => {
  const id=request.body.id;
  let strin='select ingredientname from naivebakerschema2.ingredients natural join (select ingredientid from naivebakerschema2.recipeingredient where recipeid='+id+') as reci';
  pool.query(strin, (error, results2) => {
    if (error) {
      throw error
    }
    let strng2='select * from naivebakerschema2.recipes where recipeid = '+id;
    pool.query(strng2, (error, results) => {
      if (error) {
        throw error
      }
      let data=results.rows;
      data[0]['ingredients']=results2.rows;
      response.status(200).json(data)
    })
  })
}

const checkLikedRecipe = (request,response) => {
  let strin='select * from naivebakerschema2.likeslog where recipeid='+request.body.recipeid+' and userid='+request.body.userid;
  pool.query(strin, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsernameList= (request,response) => {
  pool.query('select userName,email from naivebakerschema2.users ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsernameAndPasswordList = (request,response) => {
  pool.query('select userId,userName,userPass,userFirstName from naivebakerschema2.users ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRecipes = (request, response) => {
  rids={}
  pool.query('select * from naivebakerschema2.ingredients ', (error, results) => {
    if (error) {
      throw error
    }
    rids=result.rows;    
        response.status(200).json(results.rows)
   })

}

const likeRecipe = (request, response) => {
  console.log("HIII");
  const strin='UPDATE naivebakerschema2.recipes SET numOfLikes = numOfLikes + 1 WHERE recipeId = '+request.body.recipeid;
  pool.query(strin,(error, results) => {
    if (error) {
      throw error
    }
  });
  const strin2='INSERT into naivebakerschema2.likeslog (userid,recipeid) values ('+request.body.userid+','+request.body.recipeid+')';
  pool.query(strin2,(error, results) => {
    if (error) {
      throw error
    }
  });
}

const disLikeRecipe = (request, response) => {

  const strin='UPDATE naivebakerschema2.recipes SET numOfLikes = numOfLikes - 1 WHERE recipeId = '+request.body.recipeid;
  pool.query(strin,(error, results) => {
    if (error) {
      throw error
    }
  });
  const strin2='DELETE from naivebakerschema2.likeslog where userid='+request.body.userid+' and recipeid='+request.body.recipeid;
  pool.query(strin2,(error, results) => {
    if (error) {
      throw error
    }
  });
}
  
const addRecipe = async(request,response) => {
  const data=request.body;
  let strin='insert into naivebakerschema2.recipes (recipeName,category,mealType,cookingTime,calories,imageLink,cuisine,description,cookingProcedure,numOfViews,numOfLikes,numOfComments,numOfShares) values (\'' + data.title + '\',\'' + data.category + '\',\'' + data.mealType + '\',\'' + data.cookingTime + '\',\'' + data.calories + '\',\'' + data.imageLink + '\',\'' + data.cuisine + '\',\'' + data.description + '\',\'' + data.procedure +'\',\'0\',\'0\',\'0\',\'0\')';
  var recipeid;
  try{
    const res = await pool.query(strin);
    response.status(200).json(res.rows);
  }
  catch(err){
    throw err;
  }
  
  let strng2='select recipeId from naivebakerschema2.recipes order by recipeId desc limit 1';
  try {
    pool.query(strng2,(error, results5) => {
      recipeid=results5.rows[0].recipeid;
      console.log(recipeid,data.userid);
  let strng3='insert into naivebakerschema2.uploadsLog (userId,recipeId) values(\'' + data.userid +'\',\''+recipeid+ '\')';
  pool.query(strng3, (error, results) => {
      if (error) {
          throw error
        }
  });
  let ing=data.ingredient.split(',');

  console.log(ing);
  for(var i=0;i<ing.length;i++)
  {
    if(ing[i].trim()==='') continue;
    let x=ing[i];
    let strng4='select * from  naivebakerschema2.ingredients where ingredientname = \''+ing[i]+'\'' ;
    pool.query(strng4, (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows)
      if(results.rows.length===0)
      {
        console.log(x);
        let strng4='insert into naivebakerschema2.ingredients (ingredientname) values(\'' + x + '\')'+ 'returning ingredientid';
        pool.query(strng4, (error, results2) => {
        if (error) {
          throw error
        }
        let strng5='insert into naivebakerschema2.recipeingredient (recipeid,ingredientid,amountrequired ) values (' + recipeid +','+ results2.rows[0].ingredientid+',\''+'0'+ '\')';
        console.log(strng5);
        pool.query(strng5, (error, results3) => {
          if (error) {
              throw error
            }
        
        });
        console.log(results2.rows[0].ingredientid)});
      }
      else
      {
        let strng5='insert into naivebakerschema2.recipeingredient (recipeid,ingredientid,amountrequired ) values (' + recipeid +','+ results.rows[0].ingredientid+',\''+'0'+ '\')';
        console.log(strng5);
        pool.query(strng5, (error, results3) => {
          if (error) {
              throw error
            }
        
        });
      }
    });
    
    //  const res = await pool.query(strin4);
      
    

  }
  });
  }
  catch(error){
    throw error;
  }

  

}

const getCategories = (request, response) => {
  pool.query('SELECT unnest(enum_range(NULL::naivebakerschema2.categoryt)) as category;', (error, results) => {
    if (error) {
      throw error
    }   
    response.status(200).json(results.rows)
   })
}

const getMealTypes = (request, response) => {
  pool.query('SELECT unnest(enum_range(NULL::naivebakerschema2.mealt)) as mealtype;', (error, results) => {
    if (error) {
      throw error
    }   
    response.status(200).json(results.rows)
   })
}

const getCuisines = (request, response) => {
  pool.query('SELECT distinct r.cuisine from naivebakerschema2.recipes as r;', (error, results) => {
    if (error) {
      throw error
    }   
    response.status(200).json(results.rows)
   })
}

const loggedInUser = (request, response) => {
  pool.query('select * from naivebakerschema2.loggedinuser', (error, results) => {
    if (error) {
      throw error
    }   
    response.status(200).json(results.rows)
   })
}

const loginUser = (request, response) => {
  const data=request.body;
  console.log(data);
  pool.query('select usertype from  naivebakerschema2.users where userid='+data.id+';', (error, results) => {
    if (error) {
      throw error
    }   
    console.log(results);
    pool.query('insert into naivebakerschema2.loggedinuser (userid,firstname,usertype) values ('+data.id+',\''+data.userfirstname+'\',\''+results.rows[0].usertype+'\');', (error, results2) => {
      if (error) {
        throw error
      }   
      response.status(200).json(results2.rows)
     })
   })
  
}

const logoutUser = (request, response) => {
  pool.query('delete from naivebakerschema2.loggedinuser;', (error, results) => {
    if (error) {
      throw error
    }   
    response.status(200).json(results.rows)
   })
}

const changePassword = (request,response) => {
  const data=request.body;
  pool.query('update naivebakerschema2.users set userpass='+data.password+' where userid='+data.id, (error, results) => {
    if (error) {
      throw error
    }   
    response.status(200).json(results.rows)
   })
}

module.exports = {
  Search,
  SearchAll,
  getIngredientsList,
  putIngredientsList,
  addUser,
  getUsernameList,
  getUsernameAndPasswordList,
  addRecipe,
  ingredientListFromId,
  likeRecipe,
  disLikeRecipe,
  checkLikedRecipe,
  getCategories,
  getMealTypes,
  getCuisines,
  loggedInUser,
  loginUser,
  logoutUser,
  changePassword
}