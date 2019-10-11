import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundImage: props => `url(${props.logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  text: {
    fontSize: '7vw',
    borderRadius: '15px',
    padding: '10px',
    backgroundColor: props => props.color,
  },
  logo: {
    height: '35%',
  },
};

function TeamCard({ classes, name, points }) {
  return (
    <div className={classes.container}>
      <span className={classes.text}>{name}</span>
      <span className={classes.text}>{points}</span>
    </div>
  );
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  points: PropTypes.number,
};

TeamCard.defaultProps = {
  name: undefined,
  points: undefined,
};

export default withStyles(style)(TeamCard);
