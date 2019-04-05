import React, { Component } from 'react';
import SearchResult from './SearchResult';
import axios from 'axios';
import SelectionBox from './SelectionBox';
import CheckboxContainer from './CheckboxContainer';
import DisplaySelected from './DisplaySelected';
import classes from './Search.css';

class Search extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {  
            listIngredients: [],
            listCategories: [],
            listMealTypes: [],
            listCuisines: [],
            cookingTime: 0,
            calories: 0,

            selectedIngredients: [],
            fetchedRecipes: []
        }

        this.searchButton = this.searchButton.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.checkboxUpdates = this.checkboxUpdates.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.fetchRecipes = this.fetchRecipes.bind(this); 
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/getIngredientList')
            .then(response => response.data)
            .then(listIngredients => this.setState({listIngredients}));

        axios.get('http://localhost:5000/getCategories')
            .then(response => response.data)
            .then(list => this.setState({
                    listCategories: list.map(listItem => ({...listItem, isChecked: true}))
                })
            );

        axios.get('http://localhost:5000/getMealTypes')
            .then(response => response.data)
            .then(list => this.setState({
                listMealTypes: list.map(listItem => ({...listItem, isChecked: true}))
                })
            );

        axios.get('http://localhost:5000/getCuisines')
            .then(response => response.data)
            .then(list => this.setState({
                listCuisines: list.map(listItem => ({...listItem, isChecked: true}))
                })
            );
    } 

    searchButton()
    {
        const selection = {
            selectedIngredients: this.state.selectedIngredients.map(ingredient => ingredient.ingredientid), 
            selectedCategories: this.state.listCategories.filter(item => item.isChecked).map(item => item.category),
            selectedMealTypes: this.state.listMealTypes.filter(item => item.isChecked).map(item => item.mealtype),
            selectedCuisines: this.state.listCuisines.filter(item => item.isChecked).map(item => item.cuisine),
        };

        this.fetchRecipes(selection);
    }

    updateSelected(update)
    {
        this.setState(prevState => ({
            [update.addList]: [...prevState[update.addList], update.item],
            [update.removeList]:  prevState[update.removeList].filter(item => item !== update.item)
            })
        );
    }

    checkboxUpdates(update)
    {
        this.setState(prevState => {
                let prevItem = {...update.item};
                prevItem.isChecked = !prevItem.isChecked;
                
                const index = prevState[update.identifier].indexOf(prevItem);
                
                if(index !== -1)
                    prevState[update.identifier][index] = update.item.isChecked;
                
                return prevState;
            }
        );
    }

    removeSelected(update)
    {
        this.setState(prevState => ({
            [update.addList]: [...prevState[update.addList], prevState[update.removeList].find(item => item[update.id] === parseInt(update.value))],
            [update.removeList]: prevState[update.removeList].filter(item => item[update.id] !== parseInt(update.value))
            })
        );
    }

    fetchRecipes(selectedItems)
    {
        const body = {
            ingredient: selectedItems.selectedIngredients,
            category: selectedItems.selectedCategories,
            mealType: selectedItems.selectedMealTypes,
            cuisine: selectedItems.selectedCuisines,
            cookingTime: 8000,
            calories: 8000
        }

        axios.post('http://localhost:5000/Search',body)
            .then(response => response.data)
            .then(fetchedRecipes => this.setState({fetchedRecipes}));
    }

    render() 
    {
        return (  
            <div className = {classes.appContainer}>
                <div className = {classes.appSidebar}>
                         <DisplaySelected 
                            placeholder = "Selected Ingredients"
                            removeSelected = {this.removeSelected} 
                            name = "ingredientname"
                            id = "ingredientid"
                            items = {this.state.selectedIngredients}
                            addList = "listIngredients"
                            removeList = "selectedIngredients"
                        />

                        <div className = "app-selectionbox-wrapper">
                        <SelectionBox 
                            placeholder = "Enter Ingredient"
                            updateSelected = {this.updateSelected} 
                            name = "ingredientname"
                            id = "ingredientid"
                            list = {this.state.listIngredients}
                            addList = "selectedIngredients"
                            removeList = "listIngredients"
                        />
                        </div>
                        
                        <CheckboxContainer 
                            placeholder = "Select Category"
                            updateSelected = {this.checkboxUpdates} 
                            name = "category"
                            id = "category"
                            items = {this.state.listCategories}
                            identifier = "listCategories"
                        />
                        <CheckboxContainer 
                            placeholder = "Select Meal type"
                            updateSelected = {this.checkboxUpdates} 
                            name = "mealtype"
                            id = "mealtype"
                            items = {this.state.listMealTypes}
                            identifier = "listMealTypes"
                        />
                        <CheckboxContainer 
                            placeholder = "Select Cuisine"
                            updateSelected = {this.checkboxUpdates} 
                            name = "cuisine"
                            id = "cuisine"
                            items = {this.state.listCuisines}
                            identifier = "listCuisines"
                        />
                        
                        <div className = {classes.appButtonWrapper}>
                        <button 
                            className = {classes.appButton}
                            onClick = {this.searchButton}
                        >
                            Search
                        </button>
                        </div>
                </div>
                <div className = {classes.appResults}>
                        <SearchResult 
                            selectedIngredients = {this.state.selectedIngredients}
                            recipes = {this.state.fetchedRecipes}
                        />
                </div>
            </div>
        );
    }
}
 
export default Search;