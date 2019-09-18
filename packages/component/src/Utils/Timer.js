/* eslint react/no-unsafe: off */

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Timer = ({ at, onInternval }) => {
  useEffect(() => {
    if (!isNaN(at)) {
      const timeout = setTimeout(() => {
        onInterval && onInterval();
      }, Math.max(0, at - Date.now()));

      return () => clearTimeout(timeout);
    }
  }, [at, onInternval]);

  return false;
};

Timer.defaultProps = {
  onInterval: undefined
};

Timer.propTypes = {
  at: PropTypes.number.isRequired,
  onInterval: PropTypes.func
};

export default Timer;
