import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  name: {
    fontSize: '25px',
  },
};

function TeamCard({ classes, name, logo, points }) {
  return (
    <div className={classes.container}>
      <img src={logo} alt={`Logo of team ${name}`} />
      <span className={classes.name}>{name}</span>
      <span className={classes.points}>{points}</span>
    </div>
  );
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  logo: PropTypes.string,
  points: PropTypes.number,
};

TeamCard.defaultProps = {
  name: undefined,
  logo: undefined,
  points: undefined,
};

export default withStyles(style)(TeamCard);
