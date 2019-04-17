import React, { Component } from "react";
import '../../materializecss/materialize.css';
import '@progress/kendo-theme-material/dist/all.css';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import axios from 'axios';
import SearchResult from "./SearchResult";
import './Search.css';

class Search extends Component {

    constructor(props)
    {
        super(props);
        this.searchButton = this.searchButton.bind(this);
    }
  state = {
    data: [],
    events: [],
    selectedItems: [],
    listCategories: [],
    listMealTypes: [],
    listCuisines: [],
    cookingTime: null,
    calories: null,
    fetchedRecipes: [],
    ingredients: []
  };

  componentWillMount() {
        axios.get('http://localhost:8000/getIngredientList')
            .then( response => {
            var tmp=this.state.data;
            let tmp2=this.state.ingredients;
            for(var i=0; i<response.data.length;i++)
            {
            tmp.push(response.data[i].ingredientname);
            tmp2.push(response.data[i]);
            }
            this.setState({
            data: tmp,
            ingredients: tmp2
            });
        })
        .catch(function (error) {
            console.log(error);
        }).then(()=> {
            var temp=this.state.data;
            temp.sort();
            this.setState({data:temp});
        });
        axios.get('http://localhost:8000/getCategories')
        .then(response => response.data)
        .then(list => this.setState({
                listCategories: list.map(listItem => ({...listItem, isChecked: true}))
            })
        );

        axios.get('http://localhost:8000/getMealTypes')
            .then(response => response.data)
            .then(list => this.setState({
                listMealTypes: list.map(listItem => ({...listItem, isChecked: true}))
                })
            );

        axios.get('http://localhost:8000/getCuisines')
            .then(response => response.data)
            .then(list => this.setState({
                listCuisines: list.map(listItem => ({...listItem, isChecked: true}))
                })
            );
    }

    searchButton= async()=>
    {
        const selection = {
            selectedIngredients: [],
            selectedCategories: this.state.listCategories.filter(item => item.isChecked).map(item => item.category),
            selectedMealTypes: this.state.listMealTypes.filter(item => item.isChecked).map(item => item.mealtype),
            selectedCuisines: this.state.listCuisines.filter(item => item.isChecked).map(item => item.cuisine),
        };
        this.state.selectedItems.map(ingredient=>{
            let x=this.state.ingredients.find(ele=>ele.ingredientname===ingredient)
            selection.selectedIngredients.push(x.ingredientid);
        });
        this.fetchRecipes(selection);
    }

    fetchRecipes=(selectedItems)=>
    {
        const body = {
            ingredient: selectedItems.selectedIngredients,
            category: selectedItems.selectedCategories,
            mealType: selectedItems.selectedMealTypes,
            cuisine: selectedItems.selectedCuisines,
            cookingTime: this.state.cookingTime,
            calories: this.state.calories
        }

        axios.post('http://localhost:8000/Search',body)
            .then(response => response.data)
            .then(fetchedRecipes => this.setState({fetchedRecipes}));
    }

    handleChangeCategory = async(event) =>
    {
        let name = event.target.name;
        let checked = event.target.checked;
        await this.setState(prevState => {
                let prevItem = {'category': name ,'isChecked': checked };
                
                prevState['listCategories'].map(ele=>{
                    if(ele.category===prevItem.category)
                        ele.isChecked=checked;
                    return ele;
                });
                
                return prevState;
            }
        ,this.searchButton);
    }

    handleChangeMealType = async(event) => {
        let name = event.target.name;
        let checked = event.target.checked;
        await this.setState(prevState => {
                let prevItem = {'mealtype': name ,'isChecked': checked };
                
                prevState['listMealTypes'].map(ele=>{
                    if(ele.mealtype===prevItem.mealtype)
                        ele.isChecked=checked;
                    return ele;
                });
                
                return prevState;
            }
        ,this.searchButton);
    }

    handleChangeCuisines = async(event) => {
        let name = event.target.name;
        let checked = event.target.checked;
        await this.setState(prevState => {
                let prevItem = {'cuisine': name ,'isChecked': checked };
                
                prevState['listCuisines'].map(ele=>{
                    if(ele.cuisine===prevItem.cuisine)
                        ele.isChecked=checked;
                    return ele;
                });
                
                return prevState;
            }
        ,this.searchButton);
    }

    onChange = (event) => { this.setState({selectedItems:[...event.target.value]}); }

    onFilterChange = (event) => { console.log('filterChange', event.filter.value); }

    render() {
        return (
            <div className="row" style={{height:'100%'}}>
                <div className="col s4" style={{borderRight:'2px solid #1E88E5',height:'100%'}}>
                    <div className='row' style={{padding:'0 10px'}}>
                        <h4><strong>Select Ingredients:</strong></h4>
                        <hr/>
                        <MultiSelect
                            id="Auto"
                            data={this.state.data}
                            onChange={this.onChange}
                            onFilterChange={this.onFilterChange}
                            filterable={true}
                            value={this.state.selectedItems}
                            style={{ width: '100%',border:'2px groove #1E88E5',borderRadius:'10px'}}
                        />
                    </div>
                    <div className='row' style={{padding:'0 10px'}}>
                        <h5><strong>Category:</strong></h5>
                        <hr/>
                        {this.state.listCategories.map(category=>(<div key={category.category} className='col s6'>
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in checkbox-blue-grey" name={category.category} defaultChecked onChange={this.handleChangeCategory} />
                                    <span>{category.category}</span>
                                </label>
                            </p>
                        </div>
                        ))}
                    </div>
                    <div className='row' style={{padding:'0 10px'}}>
                        <h5><strong>Meal types:</strong></h5>
                        <hr/>
                        {this.state.listMealTypes.map(mealtype=>(<div key={mealtype.mealtype} className='col s6'>
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in checkbox-blue-grey" name={mealtype.mealtype} defaultChecked onChange={this.handleChangeMealType} />
                                    <span>{mealtype.mealtype}</span>
                                </label>
                            </p>
                        </div>
                        ))}
                    </div>
                    <div className='row' style={{padding:'0 10px'}}>
                        <h5><strong>Cuisines:</strong></h5>
                        <hr/>
                        {this.state.listCuisines.map(cuisine=>(<div key={cuisine.cuisine} className='col s6'>
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in checkbox-blue-grey" name={cuisine.cuisine} defaultChecked onChange={this.handleChangeCuisines} />
                                    <span>{cuisine.cuisine}</span>
                                </label>
                            </p>
                        </div>
                        ))}
                    </div>
                    <div className='row' style={{padding:'0 10px'}}>
                        <hr/>
                        <div className="col s6">
                            <label>Calories</label>
                            <input type="number" value={this.state.calories} onChange={(event) => this.setState({calories: event.target.value},this.searchButton)}/>
                        </div>
                        <div className="col s6">
                            <label>Cooking Time<em style={{fontWeight:'100'}}>(minutes)</em></label>
                            <input type="number" value={this.state.cookingTime} onChange={(event) => this.setState({cookingTime: event.target.value},this.searchButton)}/>
                        </div><br/>
                    </div>
                    <center>
                        <button type="submit" className="btn blue" onClick={this.searchButton} value="Search">Search</button>
                    </center>
                </div>
                <div className="col s8">
                    <SearchResult recipes={this.state.fetchedRecipes} ingredients={this.state.selectedItems}/>
                </div>
            </div>
        );
    }
    
}

export default Search;
