import React, {Component} from 'react';
import axios from 'axios';
import {debounce} from 'lodash';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import  Modal from '@mui/material'
import Search from '../../components/DayPlan/search';
import SearchResults from '../../components/DayPlan/searchResults';
import AddItem from '../../components/DayPlan/addItem';

import UserDetails from '../../components/DayPlan/stateless-components/userDetails';
import HistoryNavigator from '../../components/DayPlan/stateless-components/historyNavigator';
import Calories from '../../components/DayPlan/stateless-components/calories';
import Bzu from '../../components/DayPlan/stateless-components/bzu';
import DailyFoodList from '../../components/DayPlan/stateless-components/dailyFoodList';
import DataPoints from '../../dataPoints';
import {Navigate} from 'react-router-dom';
import {foodSearchResult} from '../../data/foodSearchResult';
import {toast} from 'react-toastify';


class DayPlan extends Component {
    constructor() {
        super();
        import('./DayPlan.css');
        this.state = {
            navigate: null,
            user: null,
            width: window.innerWidth,
            hasSearchResults: false,
            searchDetailsSelected: false,
            searchFocused: false,
            searchDetailItem: [],
            searchResults: [],
            searchResultsCommon: [],
            searchResultsBranded: [],
            searchTerm: true,
            dailyGoal: 1500,
            dailyIntake: [],
            dataPoints: DataPoints,
            intakeHistory: [
                'Сегодня',
                'yesterday',
                moment(Date.now())
                    .subtract(2, 'days')
                    .format('DD,MMM')
                    .split(',')
                    .join(' ')
            ],
            intakeHistoryPosition: 0
        };

        this.state.dataPoints.data_points[0].date = 'Сегодня';
        this.state.dataPoints.data_points[1].date = 'Yesterday';
        this.state.dataPoints.data_points[2].date = moment(Date.now())
            .subtract(2, 'days')
            .format('DD,MMM')
            .split(',')
            .join(' ');

        // we need  extra props for calculating totals
        this.state.dataPoints.data_points.forEach((item, index) => {
            let tmpObj = {
                total_grams: 0,
                total_calories: 0,
                breakfastCalories: 0,
                lunchCalories: 0,
                dinnerCalories: 0,
                snackCalories: 0,
                b: 0,
                z: 0,
                u: 0,
                ...this.state.dataPoints.data_points[index]
            };
            tmpObj.intake_list.forEach(item => {
                tmpObj.total_grams += item.serving_weight_grams;
                tmpObj.total_calories += item.nf_calories;
                switch (item.meal_type) {
                    case 'Завтрак':
                        tmpObj.breakfastCalories += item.nf_calories;
                        break;

                    case 'Обед':
                        tmpObj.lunchCalories += item.nf_calories;
                        break;

                    case 'Ужин':
                        tmpObj.dinnerCalories += item.nf_calories;
                        break;

                    case 'Перекус':
                        tmpObj.snackCalories += item.nf_calories;
                        break;

                    default:
                        break;
                }
            });
            tmpObj.breakfastCalories = Math.round(tmpObj.breakfastCalories);
            tmpObj.lunchCalories = Math.round(tmpObj.lunchCalories);
            tmpObj.dinnerCalories = Math.round(tmpObj.dinnerCalories);
            tmpObj.snackCalories = Math.round(tmpObj.snackCalories);
            tmpObj.total_grams = Math.round(tmpObj.total_grams);
            tmpObj.total_calories = Math.round(tmpObj.total_calories);
            this.state.dataPoints.data_points[index] = tmpObj;
        });

        this.navigateHistory = this.navigateHistory.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handelFocusSearch = this.handelFocusSearch.bind(this);
    }

    componentDidUpdate() {
        console.log('App component updated:');
        console.log(this.state);
    }


    async componentDidMount() {
        console.log('App component did mount');
        window.addEventListener('resize', this.handleWindowSizeChange);
        if (!this.state.user) {
            try {
                const resp = await axios.get('https://localhost:44366/auth/user', {withCredentials: true})
                this.setState({user: resp.data})
                const resp2 = await axios.get(`https://localhost:44366/user/GetUserBodyProporties/${resp.data.id}`)
                this.setState({proportions: resp2.data})

                let newdatapoints = this.state.dataPoints;
                let data_point = JSON.parse(localStorage.getItem(`${new Date().toDateString()}/${resp.data.id}`))

                if (data_point) {
                    newdatapoints.data_points[0] = data_point
                    this.setState({dataPoints: newdatapoints})

                }
            } catch {
                this.setState({navigate: <Navigate to='/login'/>})
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth});
    };

    custom_headers = {
        headers: {'x-app-id': '8f344a08', 'x-app-key': '2e9e174ee9d6b855ab32fdbe36b242fb', 'x-remote-user-id': '0'}
    };

    launchSearchResults = () => {
        this.setState({
            hasSearchResults: true
        });
    };

    handleSearch = debounce(text => {
        this.setState({searchTerm: true});
        const res = {
            common: foodSearchResult.common.filter(c => c.russian_name.toLowerCase().includes(text.toLowerCase())),
            branded: foodSearchResult.branded.filter(b => b.russian_name.toLowerCase().includes(text.toLowerCase()) || b.brand_name.toLowerCase().includes(text.toLowerCase()))
        }
        if (res.common.length === 0 && res.branded.length === 0) {
            toast.warning('по вашему запросу ничего не нашлось');
            this.setState({searchTerm: false});
        } else {
            this.setState({
                searchResultsCommon: res.common,
                searchResultsBranded: res.branded,
                hasSearchResults: true,
                searchTerm: false
            });
        }

        // axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=` + text, this.custom_headers).then(res => {
        //   if (res.data.common.length === 0 && res.data.branded.length === 0) {
        //     alert('по вашему запросу ничего не нашлось');
        //     this.setState({ searchTerm: false });
        //   } else {
        //     this.setState({
        //       searchResultsCommon: res.data.common,
        //       searchResultsBranded: res.data.branded,
        //       hasSearchResults: true,
        //       searchTerm: false
        //     });
        //   }
        // });
    }, 1000);

    openSearchDetails = (food_name, id = null, russian_name) => {
        switch (id) {
            case null:
                this.getCommonFoodItemDetails(food_name, russian_name);
                break;

            default:
                this.getBrandedFoodItemDetails(id, russian_name);
                break;
        }
    };

    getCommonFoodItemDetails(food_name, russian_name) {
        axios
            .post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {query: food_name}, this.custom_headers)
            .then(res => {
                const itemDetail = {
                    russian_name: russian_name,
                    food_name: res.data.foods[0].food_name,
                    serving_unit: res.data.foods[0].serving_unit,
                    serving_weight_grams: res.data.foods[0].serving_weight_grams,
                    serving_qty: res.data.foods[0].serving_qty,
                    nf_calories: res.data.foods[0].nf_calories,
                    meal_type: res.data.foods[0].meal_type,
                    thumb: res.data.foods[0].photo.thumb,
                    total_grams: res.data.foods[0].serving_weight_grams,
                    total_calories: res.data.foods[0].nf_calories,
                    b: res.data.foods[0].nf_protein,
                    z: res.data.foods[0].nf_total_fat,
                    u: res.data.foods[0].nf_total_carbohydrate
                };
                this.setState({
                    searchDetailsSelected: true,
                    searchDetailItem: itemDetail
                });
            });
    }

    getBrandedFoodItemDetails(nx_item_id, russian_name) {
        axios
            .get(`https://trackapi.nutritionix.com/v2/search/item?nix_item_id=` + nx_item_id, this.custom_headers)
            .then(res => {
                const itemDetail = {
                    russian_name: russian_name,
                    food_name: res.data.foods[0].food_name,
                    serving_unit: res.data.foods[0].serving_unit,
                    serving_weight_grams: res.data.foods[0].serving_weight_grams,
                    serving_qty: res.data.foods[0].serving_qty,
                    nf_calories: res.data.foods[0].nf_calories,
                    meal_type: res.data.foods[0].meal_type,
                    thumb: res.data.foods[0].photo.thumb,
                    total_grams: res.data.foods[0].serving_weight_grams,
                    total_calories: res.data.foods[0].nf_calories,
                    b: res.data.foods[0].nf_protein,
                    z: res.data.foods[0].nf_total_fat,
                    u: res.data.foods[0].nf_total_carbohydrate
                };

                this.setState({
                    searchDetailsSelected: true,
                    searchDetailItem: itemDetail
                });
            });
    }

    closeSearchDetails = () => {
        this.setState({
            searchDetailsSelected: false,
            searchDetailItem: []
        });
    };

    closeSearchResults = () => {
        this.setState({
            searchDetailsSelected: false,
            hasSearchResults: false,
            searchDetailItem: []
        });
    };

    addItem(item) {
        const newDataPointsObj = {data_points: [...this.state.dataPoints.data_points]};
        const newDataPoint = {...this.state.dataPoints.data_points[this.state.intakeHistoryPosition]};

        newDataPoint[`${item.meal_type}Calories`] += item.total_calories
        if (!(isNaN(item.b) || isNaN(item.z) || isNaN(item.u))) {
            newDataPoint.b += item.b
            newDataPoint.z += item.z
            newDataPoint.u += item.u
        }

        newDataPointsObj.data_points[this.state.intakeHistoryPosition] = newDataPoint;
        newDataPointsObj.data_points[this.state.intakeHistoryPosition].total_calories += item.total_calories;
        if (!(isNaN(item.b) || isNaN(item.z) || isNaN(item.u))) {
            newDataPointsObj.data_points[this.state.intakeHistoryPosition].b += item.b;
            newDataPointsObj.data_points[this.state.intakeHistoryPosition].z += item.z;
            newDataPointsObj.data_points[this.state.intakeHistoryPosition].u += item.u;
        }
        newDataPointsObj.data_points[this.state.intakeHistoryPosition].intake_list.push(item);

        localStorage.setItem(`${new Date().toDateString()}/${this.state.user.id}`, JSON.stringify(newDataPointsObj.data_points[0]))
        this.setState({
            dataPoints: newDataPointsObj
        });

        this.closeSearchResults();
    }

    clearItems() {
        if(localStorage.length>0) {
            localStorage.clear()
            window.location.reload();
        }

    }

    handelFocusSearch() {
        this.setState({
            searchFocused: true
        });
    }

    navigateHistory(action) {
        if (action === '+') {
            if (this.state.intakeHistoryPosition < this.state.intakeHistory.length - 1) {
                this.setState(prevState => ({
                    intakeHistoryPosition: this.state.intakeHistoryPosition + 1
                }));
            }
        }
        if (action === '-') {
            if (this.state.intakeHistoryPosition > 0) {
                this.setState(prevState => ({
                    intakeHistoryPosition: this.state.intakeHistoryPosition - 1
                }));
            }
        }
    }

    render() {
        const {width} = this.state;
        const isMobile = width < 768;
        if (!!this.state.navigate)
            return this.state.navigate
        if (isMobile) {
            return (
                <>
                    <div className="App Mobile">
                        <div>
                            <header className="header">
                                <Search onSearch={this.handleSearch} focused={this.state.searchFocused}/>

                                <UserDetails user={this.state.user}/>
                            </header>
                        </div>

                        {/* <nav>
              <HistoryNavigator
                navigate={this.navigateHistory}
                dailyIntake={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].date}
              />
            </nav> */}
                        <article>
                            <Bzu
                                b={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].b}
                                bgoal={this.state.proportions?.dailyBelok}
                                z={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].z}
                                zgoal={this.state.proportions?.dailyJir}
                                u={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].u}
                                ugoal={this.state.proportions?.dailyYglevod}/>
                            <Calories
                                consumed={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].total_calories}
                                dailyGoal={this.state.proportions?.dailyNormalCaloriesMiffanSanJeora}
                                breakfastCalories={
                                    this.state.dataPoints.data_points[this.state.intakeHistoryPosition].breakfastCalories
                                }
                                lunchCalories={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].lunchCalories}
                                dinnerCalories={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].dinnerCalories}
                                snackCalories={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].snackCalories}
                            />
                        </article>
                        <section>
                            <DailyFoodList
                                dailyIntake={this.state.dataPoints.data_points[this.state.intakeHistoryPosition]}/>
                        </section>
                        {this.state.hasSearchResults && (
                            <SearchResults
                                common={this.state.searchResultsCommon}
                                branded={this.state.searchResultsBranded}
                                onClose={this.closeSearchResults}
                                onSearchItemSelected={this.openSearchDetails}
                            />
                        )}
                        {this.state.searchDetailsSelected && (
                            <AddItem
                                data={this.state.searchDetailItem}
                                onSearchItemAdded={this.addItem}
                                onClose={this.closeSearchDetails}
                            />
                        )}
                        <div>
                            <div className="add-button">
                                <Fab aria-label="add" color="primary" onClick={this.handelFocusSearch}>
                                    <AddIcon/>
                                </Fab>
                            </div>
                        </div>
                    </div>
                </>
            )
                ;
        } else {
            return (
                <>
                    <div className="App Desktop">
                        <header className="header">
                            <Search onSearch={this.handleSearch} focused={this.state.searchFocused}/>
                            {/* <nav>
                <HistoryNavigator
                  navigate={this.navigateHistory}
                  dailyIntake={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].date}
                />
              </nav> */}
                        </header>
                        <section className="section" style={{minHeight: '100vh'}}>
                            <article className="sidebar">
                                <UserDetails user={this.state.user}/>
                                <Bzu
                                    b={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].b}
                                    bgoal={this.state.proportions?.dailyBelok}
                                    z={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].z}
                                    zgoal={this.state.proportions?.dailyJir}
                                    u={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].u}
                                    ugoal={this.state.proportions?.dailyYglevod}/>
                                <Calories
                                    consumed={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].total_calories}
                                    dailyGoal={this.state.proportions?.dailyNormalCaloriesMiffanSanJeora}
                                    breakfastCalories={
                                        this.state.dataPoints.data_points[this.state.intakeHistoryPosition].breakfastCalories
                                    }
                                    lunchCalories={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].lunchCalories}
                                    dinnerCalories={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].dinnerCalories}
                                    snackCalories={this.state.dataPoints.data_points[this.state.intakeHistoryPosition].snackCalories}
                                />
                            </article>
                            <main className="main">
                                <DailyFoodList
                                    dailyIntake={this.state.dataPoints.data_points[this.state.intakeHistoryPosition]}/>
                            </main>
                            {this.state.hasSearchResults && (
                                <SearchResults
                                    common={this.state.searchResultsCommon}
                                    branded={this.state.searchResultsBranded}
                                    onClose={this.closeSearchResults}
                                    onSearchItemSelected={this.openSearchDetails}
                                />
                            )}
                            {this.state.searchDetailsSelected && (
                                <AddItem
                                    data={this.state.searchDetailItem}
                                    onSearchItemAdded={this.addItem}
                                    onClose={this.closeSearchDetails}
                                />
                            )}
                        </section>
                        <div className="add-button">
                            <Fab aria-label="add" color="primary" onClick={this.clearItems}>
                                <AddIcon/>
                            </Fab>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default DayPlan;