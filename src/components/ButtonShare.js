import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ButtonShare({ page, id, testID }) {
  const [isShare, setIsShare] = useState(false);
  const handleClickShare = () => {
    const url = `http://localhost:3000/${page}/${id}`;
    navigator.clipboard.writeText(url);
    setIsShare(true);
  };

  return (
    <div className="">
      <button
        type="button"
      >
        <input
          type="image"
          src={ shareIcon }
          alt="shareIcon"
          data-testid={ testID }
          onClick={ handleClickShare }
        />
      </button>
      <div>
        { isShare && (
          <p
            className="text-xs px-2"
          >
            Link copied!
          </p>
        ) }
      </div>

    </div>
  );
}
ButtonShare.propTypes = {
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testID: PropTypes.string.isRequired,

};

export default ButtonShare;
