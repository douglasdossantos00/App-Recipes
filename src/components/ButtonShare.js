import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ButtonShare({ page, id, testID }) {
  const [isShare, setIsShare] = useState(false);
  const handleClickShare = () => {
    const url = `http://localhost:3000/${page}/${id}`;
    navigator.clipboard.writeText(url);
    setIsShare(true);
  };

  return (
    <div>
      <button type="button">
        <input
          type="image"
          src={ shareIcon }
          alt="shareIcon"
          data-testid={ testID }
          onClick={ handleClickShare }
        />
      </button>
      {isShare && <span>Link copied!</span>}
    </div>
  );
}
ButtonShare.propTypes = {
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testID: PropTypes.string.isRequired,

};

export default ButtonShare;
