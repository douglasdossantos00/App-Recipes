import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../images/notFound.png';

function NotFound() {
  return (
    <div
      className="not-found
    flex flex-col l items-center justify-center bg-opacity-60"
    >
      <div className="flex font-sans font-bold mb-20">
        <h1>Not Found</h1>
        <img
          src={ notFound }
          alt="lupa triste"
          className="w-16"
        />
      </div>
      <Link classname="" to="/">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="btn btn-not-found"
        >
          return
        </button>
      </Link>
    </div>
  );
}
export default NotFound;
