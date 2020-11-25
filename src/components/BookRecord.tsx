import * as React from "react";
import PropTypes from "prop-types";

import "./BookRecord.css";

import defaultCover from "../assets/images/bookcover.png";

export const BookRecord = ({ imageLinks, title, description }) => {
  const bookTitle = title || "No title provided";
  const shortDescription = description
    ? description.slice(0, 90)
    : "No description provided.";
  const thumbnail = imageLinks.thumbnail || defaultCover;

  return (
    <div className="bookrecord">
      <img src={thumbnail} alt={bookTitle} className="bookcover" />
      <div>
        <h2>{bookTitle}</h2>
        <div>{shortDescription}</div>
      </div>
    </div>
  );
};

BookRecord.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageLinks: { thumbnail: PropTypes.string },
};
