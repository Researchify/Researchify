import React from 'react';
import '../css/fancy-auth-bg.css';

const AuthBackground = () => {
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
  };

  return (
    <div style={styles.container}>
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

export default AuthBackground;
