import React from 'react';

export default function userDetails(props) {
  return (
    <div className="user">
      <div className="order-item user__avatar" 
      style={{backgroundImage: `url(https://localhost:44366/api/picture/${props.user?.image})`}} />
      <div className="order-item user__name">
        {props.user?.firstName} <span className="surname">{props.user?.lastName}</span>
      </div>
      <div className="order-item user__weight">
        <h2>{props.user?.userBodyProporties?.weight}</h2>кг
      </div>
      <div className="order-item user__height">
        <h2>{props.user?.userBodyProporties?.height}</h2>см
      </div>
    </div>
  );
}
