import React from 'react';
import MealPeriods from './mealPeriods';
import LinearProgress from '@mui/material/LinearProgress';

export default function calories(props) {
    let progress = (props.consumed / props.dailyGoal) * 100;
    let cal = Math.round(props.breakfastCalories + props.lunchCalories + props.dinnerCalories + props.snackCalories)

    let cssLeftMargin = 0;
    if (progress >= 100) {
        progress = 100;
        cssLeftMargin = 93;
    } else {
        cssLeftMargin = progress;
    }

    return (
        <div style={{paddingLeft: '15px', paddingRight: '15px'}}>
            <h2>Калории</h2>
            <div className="calories">
                <div className="calories__consumed">
          <span className="data">
            {Math.round(props.consumed)}
          </span>
                    <br/>
                    <small className="calories-small-font">употреблено</small>
                </div>
                <div className="calories__goal">
                    <span className="data">{props.dailyGoal}</span>
                    <br/>
                    <small className="calories-small-font">цель на день</small>
                </div>
            </div>
            <LinearProgress
                className="progress-bar"
                variant="determinate"
                color="primary"
                value={Math.round(progress)}
                style={{}}
            />

            <span
                style={{
                    fontWeight: '700',
                    fontSize: '14px',
                    position: 'relative',
                    top: '10px',
                    marginLeft: Math.round(cssLeftMargin) + '%'
                }}
            >
        {Math.round(progress)}%
      </span>
            <MealPeriods
                breakfast={props.breakfastCalories}
                lunch={props.lunchCalories}
                dinner={props.dinnerCalories}
                snack={props.snackCalories}
            />
        </div>
    );
}
