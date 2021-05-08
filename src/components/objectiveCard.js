import React from 'react';
import PropTypes from 'prop-types';

import './objectiveCard.css';

function ObjectiveCard(props) {
  const classNames = ['objectiveCard'];
  if (props.hasChildren) {
    classNames.push('parentCard');
  }
  return (
    <div className={classNames.join(' ')}>
      <div className="title">
        <p>{props.data.title}</p>
      </div>
    </div>
  );
}

ObjectiveCard.defaultProps = {
  hasChildren: false,
  level: 0
};

ObjectiveCard.propTypes = {
  data: PropTypes.object.isRequired,
  hasChildren: PropTypes.bool,
  level: PropTypes.number
};

export default ObjectiveCard;
