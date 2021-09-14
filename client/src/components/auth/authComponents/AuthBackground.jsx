import React from 'react';
import '../css/fancy-auth-bg.css';
import { PropTypes } from 'prop-types';

const AuthBackground = ({ form }) => {
  const boxes = () => {
    const array = [];
    const numberOfBox = 15;
    for (let i = 0; i < numberOfBox; i++) array.push(i);
    return array;
  };

  const styles = {
    container: {
      position: 'relative',
      top: 0,
      minHeight: '50vh',
    },
    form: {
      zIndex: 1,
      position: 'absolute',
      width: '100%',
      top: '15%',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        {form}
      </div>
      <div className="area">
        <ul className="circles">
          {boxes().map((i) => (
            <li key={i} />
          ))}
        </ul>
      </div>
    </div>
  );
};

// props validation
AuthBackground.propTypes = {
  form: PropTypes.element,
};
AuthBackground.defaultProps = {
  form: undefined,
};

export default AuthBackground;
