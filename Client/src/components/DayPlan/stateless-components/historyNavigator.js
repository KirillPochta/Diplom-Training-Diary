import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

export default function historyNavigator(props) {
  return (
    <div className="paginator">
      <div className="paginator__previous" onClick={() => props.navigate('+')}>
        <ChevronLeft titleAccess="search icon" className="material-icon">
          chevron_left
        </ChevronLeft>
      </div>
      <div className="paginator__current">{props.dailyIntake}</div>
      <div className="paginator__next" onClick={() => props.navigate('-')}>
        <ChevronRight titleAccess="search icon" className="material-icon">
          chevron_left
        </ChevronRight>
      </div>
    </div>
  );
}
