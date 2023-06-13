import React from 'react';
import {Button} from "@mui/material";

export default function dailyFoodList(props) {
    let dailyIntake = props.dailyIntake;

    console.log(dailyIntake)
    return (
        <div className="foodlist">
            {dailyIntake.intake_list.map((item, index) => (
                <div key={index} className="foodlist__item">
                    <div className="foodlist__item-image">
                        <img src={item.thumb} alt={item.food_name} title={item.food_name}/>
                    </div>
                    <div className="foodlist__item-name">
                        {/* <span>{item.food_name}</span> */}
                        <span>{item.russian_name}</span>
                        <small>
                            {/* {item.serving_qty} {item.serving_unit} ({item.serving_weight_grams} g) */}
                            {Math.round(item.serving_qty * item.serving_weight_grams)} грамм
                        </small>
                    </div>
                    <div className="foodlist__item-info">
                        <span>{Math.round(item.serving_qty * item.nf_calories)} Кал</span>
                        <small style={{textTransform: 'capitalize'}}>{item.meal_type}</small>
                    </div>
                </div>
            ))}
        </div>
    );
}
