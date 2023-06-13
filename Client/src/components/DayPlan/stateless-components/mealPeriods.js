import React from 'react';

export default function mealPeriods(props) {
  return (
    <div className="meal-periods">
      <div className="meal-period">
        <span className="meal-period__title">{Math.round(props.breakfast)}</span>
        <br />
        <small className="calories-small-font">завтрак</small>
      </div>
      <div className="meal-period">
        <span className="meal-period__title">{Math.round(props.lunch)}</span>
        <br />
        <small className="calories-small-font">обед</small>
      </div>
      <div className="meal-period">
        <span className="meal-period__title">{Math.round(props.dinner)}</span>
        <br />
        <small className="calories-small-font">ужин</small>
      </div>
      <div className="meal-period">
        <span className="meal-period__title">{Math.round(props.snack)}</span>
        <br />
        <small className="calories-small-font">перекус</small>
      </div>
    </div>
  );
}
