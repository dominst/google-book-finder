import React from "react";
import PropTypes from "prop-types";

import defaultCover from "../assets/images/bookcover.png";

import "./BookRecord.css";

export const BookRecord = ({
  imageLinks,
  title,
  description,
}: {
  imageLinks?: { thumbnail: string };
  title: string;
  description: string;
}) => {
  const bookTitle = title || "No title provided";
  const shortDescription = description
    ? description.slice(0, 90)
    : "No description provided.";
  const thumbnail = imageLinks?.thumbnail || defaultCover;

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

// https://stackoverflow.com/a/43187969 - reason for using propTypes with TypeScript
BookRecord.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageLinks: { thumbnail: PropTypes.string },
};
