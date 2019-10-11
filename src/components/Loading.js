import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import loader from '../assets/loading/loading.png';

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: '$slideRight 1s linear infinite',
  },
  '@keyframes slideRight': {
    from: {},
    to: { transform: 'rotate(360deg)' },
  },
};

function Loading({ classes }) {
  return (
    <div className={classes.container}>
      <img src={loader} alt='Loading...' />
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
