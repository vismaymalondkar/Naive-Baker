DROP SCHEMA IF EXISTS naiveBakerSchema CASCADE;
CREATE SCHEMA naiveBakerSchema; 
SET search_path TO naiveBakerSchema; 

CREATE EXTENSION citext; --For emails
CREATE EXTENSION pgcrypto; --For passwords

CREATE TYPE userT AS ENUM('REGULAR', 'PREMIUM', 'CHEF');
CREATE TYPE categoryT AS ENUM('VEG', 'NON-VEG', 'CONTAINS-EGGS', 'VEGAN');
CREATE TYPE mealT AS ENUM('BREAKFAST', 'LUNCH', 'DINNER');

CREATE TABLE users(
	userId serial,
	userName varchar(100) NOT null,
	userFullName varchar(100) NOT null,
	userPass text NOT null,
	email citext UNIQUE,
	
	PRIMARY KEY(userId)
);

CREATE TABLE recipes(
	recipeId serial,
	recipeName varchar(100) NOT null,
	category categoryT,
	mealType mealT,
	cookingTime integer,
	calories numeric(7,2),
	cuisine varchar(100),
	imageLink text, 
	cookingProcedure text,
	description text,
	numOfViews numeric(15),
	numOfLikes numeric(10),
	numOfComments numeric(10),
	numOfShares numeric(10),
	
	PRIMARY KEY(recipeId)
);

CREATE TABLE uploadsLog(
	userId INT,
	recipeId INT,
	
	PRIMARY KEY(userId, recipeId),
	FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(recipeId) REFERENCES recipes(recipeId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE likesLog(
	userId INT,
	recipeId INT,
	
	PRIMARY KEY(userId, recipeId),
	FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(recipeId) REFERENCES recipes(recipeId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE commentsLog(
	commentId serial,
	userId INT,
	recipeId INT,
	commentText text,
	
	PRIMARY KEY(commentId),
	FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(recipeId) REFERENCES recipes(recipeId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE bookmarksLog(
	userId INT,
	recipeId INT,
	
	PRIMARY KEY(userId, recipeId),
	FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(recipeId) REFERENCES recipes(recipeId) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE ingredients(
	ingredientId serial,
	ingredientName varchar(100) NOT null,
	
	PRIMARY KEY(ingredientId)
);

CREATE TABLE recipeIngredient(
	recipeId serial,
	ingredientId serial,
	amountRequired text,
	
	PRIMARY KEY(recipeId, ingredientId),
	FOREIGN KEY(recipeId) REFERENCES recipes(recipeId) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(ingredientId) REFERENCES ingredients(ingredientId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE userIngredients(
	userId INT,
	ingredientId INT,
	
	PRIMARY KEY(userId,ingredientId),
	FOREIGN KEY(ingredientId) REFERENCES ingredients(ingredientId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE allergies(
	allergyName varchar(100),
	description text,
	
	PRIMARY KEY(allergyName)
);

CREATE TABLE ingredientAllergy(
	ingredientId serial,
	allergyName varchar(100),
	
	PRIMARY KEY(ingredientId, allergyName),
	FOREIGN KEY(ingredientId) REFERENCES ingredients(ingredientId) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(allergyName) REFERENCES allergies(allergyName) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE userAllergy(
	userId serial,
	allergyName varchar(100),
	
	PRIMARY KEY(userId, allergyName),
	FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(allergyName) REFERENCES allergies(allergyName) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE loggedInUser(
	userID int
);