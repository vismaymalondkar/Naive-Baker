SET search_path TO naiveBakerSchema2; 

--CREATE EXTENSION citext; --For emails
--CREATE EXTENSION pgcrypto; --For passwords

--CREATE TYPE userT AS ENUM('REGULAR', 'PREMIUM', 'CHEF');
--CREATE TYPE categoryT AS ENUM('VEG', 'NON-VEG', 'CONTAINS-EGGS', 'VEGAN');
--CREATE TYPE mealT AS ENUM('BREAKFAST', 'LUNCH', 'DINNER');

INSERT INTO ingredients(ingredientName)
VALUES
('milk'),
('flour'),
('lentils'),
('bread'),
('butter'),
('soda'),
('tofu'),
('oil'),
('sugar'),
('cocoa powder'),
('salt'),
('egg'),
('pasta'),
('bell pepper'),
('tomatoes'),
('olives'),
('onions'),
('cilantro'),
('raisins'),
('buttermilk'),
('parmesan cheese'),
('basil'),
('oats'),
('almonds'),
('honey'),
('pacons'),
('turkey'),
('apple'),
('pita'),
('pork tenderloin'),
('soy sauce'),
('lasagna noodles');

INSERT INTO recipes (recipeName, category, mealType, cookingTime, calories, cuisine, imageLink, cookingProcedure, description, numOfViews, numOfLikes, numOfComments, numOfShares)
VALUES
('Cake', 'CONTAINS-EGGS', 'DINNER', 180, 273, 'American', 'https://images.media-allrecipes.com/userphotos/720x405/1117116.jpg', 'Preheat oven to 350 degrees F (175 degrees C). Grease and flour two 9 inch round cake pans or one 9x13 inch pan.
In large bowl combine flour, sugar, cocoa, baking soda, baking powder and salt. Make a well in the center.
Add eggs, coffee, buttermilk, oil and vanilla. Beat for 2 minutes on medium speed. Batter will be thin. Pour into prepared pans.
Bake at 350 degrees F (175 degrees C) for 30 to 40 minutes, or until toothpick inserted into center of cake comes out clean. Cool for 10 minutes, then remove from pans and finish cooling on a wire rack. Fill and frost as desired.', 'Super spooky dark chocolate cake. Suitable for all your black magic get-togethers.', 0, 0, 0, 0),


('Pasta', 'VEG', 'DINNER', 45, 131, 'Italian', 'https://images.media-allrecipes.com/userphotos/720x405/3512373.jpg', 'In a large pot of salted boiling water, cook pasta until al dente, rinse under cold water and drain.
Whisk together the salad spice mix and Italian dressing.
In a salad bowl, combine the pasta, cherry tomatoes, bell peppers and olives. Pour dressing over salad; toss and refrigerate overnight.', 'Savour this lip-smacking Italian snack any time of the day', 0, 0, 0, 0),


('Lentil Salad', 'VEG', 'LUNCH', 30, 106, 'Indian', 'https://images.media-allrecipes.com/userphotos/250x250/116841.jpg', 'Place lentils and water in a pot. Bring water to boil, reduce to simmer. Cook for 30 minutes or until tender.
In a medium size mixing bowl combine lentils, chickpeas, tomatoes, green onions, green chilies, bell peppers, lime juice, olive oil, cilantro, and salt to taste. Toss well. Chill for 20 minutes. Serve chilled.', 'A quick, colorful and spicy protein-rich salad or side dish', 0, 0, 0, 0),


('Soda bread muffins', 'VEG', 'BREAKFAST', 30, 68, 'Irish', 'https://images.media-allrecipes.com/userphotos/720x405/4462122.jpg', 'Preheat oven to 400 degrees F (200 degrees C). Line a muffin tin with paper liners.
Mix flour, raisins, 1/2 cup plus 2 tablespoons sugar, caraway seeds, baking powder, salt, and baking soda in a large bowl.
Whisk buttermilk and egg together in a small bowl. Stir into flour mixture. Fold butter into the batter.
Spoon batter into the prepared muffin tin.
Bake in the preheated oven until a toothpick inserted into the center comes out clean, 20 to 30 minutes.', 'One bowl, mix, bake for 20 minutes, and you have tasty muffins!', 0, 0, 0, 0),


('Tofu nuggets', 'VEGAN', 'LUNCH', 50, 182, 'American', 'https://images.media-allrecipes.com/userphotos/560x315/5119678.jpg', 'Cut each tofu slice into thirds, widthwise. Press each slice between paper towels to drain as much liquid as possible. Place on a plate and freeze, about 1 hour.
Place bread in a food processor. Add Parmesan cheese, garlic powder, oregano, thyme, rosemary, basil, and marjoram. Blend to make fine bread crumbs. Pour into a small bowl.
Coat tofu slices in bread crumbs. Place breaded tofu on a plate. Season with salt and pepper.
Heat oil in a large skillet over medium heat. Place 1/3 of the tofu into the pan. Cook, turning over halfway, until browned, about 4 minutes per side. Drain on paper towels. Repeat with the remaining tofu.', 'Crispy fried tofu with a tangy mustard dippy sauce is the kind of snack that is hard to stop eating.', 0, 0, 0, 0),


('Honey nut granola', 'VEG', 'BREAKFAST', 30, 188, 'British', 'https://images.media-allrecipes.com/userphotos/560x315/883609.jpg', 'Preheat oven to 300 degrees F (150 degrees C).
In a large bowl, stir oats, nuts and sunflower kernels together. In a separate bowl, mix together oil, honey, vanilla and cinnamon. Add to dry ingredients; mix well. Spread mixture onto two ungreased baking sheets.
Bake in preheated oven, for 10 minutes, remove from oven and stir. Return to oven and continue baking until golden, about 10 minutes. Remove from oven and let cool completely before storing.', 'Yummy, crunchy breakfast treat. Good on ice cream too.', 0, 0, 0, 0),


('Apple curry turkey pita', 'NON-VEG', 'LUNCH', 20, 428, 'Canadian', 'https://images.media-allrecipes.com/userphotos/560x315/3087557.jpg', 'Heat oil in a skillet over medium-high heat. Stir in onion and lemon juice. Cook until onion is tender. Mix in turkey, season with curry powder and continue cooking until heated through.
Remove from heat. Stir in apple. Stuff pitas with the mixture. Drizzle with yogurt to serve.', 'This is great for turkey leftovers. Simple, quick and flavorful.', 0, 0, 0, 0),


('Grilled Cheese sandwich', 'VEG', 'LUNCH', 20, 400, 'British', 'https://images.media-allrecipes.com/userphotos/720x405/2206436.jpg', 'Preheat skillet over medium heat. Generously butter one side of a slice of bread. Place bread butter-side-down onto skillet bottom and add 1 slice of cheese. Butter a second slice of bread on one side and place butter-side-up on top of sandwich. Grill until lightly browned and flip over; continue grilling until cheese is melted. Repeat with remaining 2 slices of bread, butter and slice of cheese.', 'Bread, butter and Cheddar cheese - here''s a way to make this classic sandwich in a nonstick pan.', 0, 0, 0, 0),


('Pork tenderloin', 'NON-VEG', 'DINNER', 180, 239, 'Russian', 'https://images.media-allrecipes.com/userphotos/560x315/2352972.jpg', 'Mix together soy sauce, bourbon, brown sugar, and garlic. Pour over pork, cover, and refrigerate at least 2 hours, turning occasionally.
Preheat oven to 325 degrees F (165 degrees C). Remove pork from marinade, and place on rack of shallow roasting pan.
Bake for 45 minutes or until a meat thermometer registers 145 degrees F (63 degrees C).', 'Tender pork marinated in soy sauce, bourbon and more. May also be grilled.', 0, 0, 0, 0),


('Lasagna', 'VEG', 'DINNER', 195, 448, 'Italian', 'https://images.media-allrecipes.com/userphotos/720x405/3359675.jpg', 'In a Dutch oven, cook sausage, ground beef, onion, and garlic over medium heat until well browned. Stir in crushed tomatoes, tomato paste, tomato sauce, and water. Season with sugar, basil, fennel seeds, Italian seasoning, 1 tablespoon salt, pepper, and 2 tablespoons parsley. Simmer, covered, for about 1 1/2 hours, stirring occasionally.
Bring a large pot of lightly salted water to a boil. Cook lasagna noodles in boiling water for 8 to 10 minutes. Drain noodles, and rinse with cold water. In a mixing bowl, combine ricotta cheese with egg, remaining parsley, and 1/2 teaspoon salt.
Preheat oven to 375 degrees F (190 degrees C).
To assemble, spread 1 1/2 cups of meat sauce in the bottom of a 9x13 inch baking dish. Arrange 6 noodles lengthwise over meat sauce. Spread with one half of the ricotta cheese mixture. Top with a third of mozzarella cheese slices. Spoon 1 1/2 cups meat sauce over mozzarella, and sprinkle with 1/4 cup Parmesan cheese. Repeat layers, and top with remaining mozzarella and Parmesan cheese. Cover with foil: to prevent sticking, either spray foil with cooking spray, or make sure the foil does not touch the cheese.
Bake in preheated oven for 25 minutes. Remove foil, and bake an additional 25 minutes. Cool for 15 minutes before serving.', 'It takes a little work, but it is worth it.', 0, 0, 0, 0);



INSERT INTO recipeIngredient(recipeId, ingredientId, amountRequired)
VALUES
(1, 2, '1.75 cups'),
(1, 9, '2 cups'),
(1, 10, '0.75 cups'),
(1, 6, '2 teaspoons'),
(1, 12, '2 numbers'),
(1, 20, '1 cup'),
(2, 13, '1 pound'),
(2, 15, '2 cups (diced)'),
(2, 14, '2 numbers (chopped)'),
(2, 16, '2.25 ounces'),
(3, 3, '0.5 cup'),
(3, 15, '2 numbers'),
(3, 8, '2 tablespoons'),
(3, 14, '3 numbers'),
(4, 2, '3 cups'),
(4, 9, '2 tablespoons'),
(4, 19, '1 cup'),
(4, 5, '0.5 cup (melted)'),
(5, 7, '12 ounces'),
(5, 4, '2 slices'),
(5, 22, '0.5 teaspoon'),
(6, 23, '4 cups'),
(6, 24, '1 cup'),
(6, 25, '1 cup'),
(6, 26, '0.5 cup'),
(7, 8, '2 tablespoons'),
(7, 28, '1 number'),
(7, 27, '0.5 pound'),
(7, 29, '3 numbers'),
(8, 4, '4 slices'),
(8, 5, '3 tablespoons'),
(8, 21, '2 slices'),
(9, 30, '3 pounds'),
(9, 31, '0.25 cup'),
(9, 9, '2 tablespoons'),
(10, 32, '12 numbers'),
(10, 17, '0.5 cup (minced)'),
(10, 15, '28 ounces (crushed)'),
(10, 9, '2 tablespoon'),
(10, 21, '0.75 cup (grated)');