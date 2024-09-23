/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  // Provide default values for the post object properties
  const {
    image = "default-image-url.jpg",
    title = "Untitled Event",
    description = "No description available.",
    eventStartDate = new Date(),
    eventEndDate = new Date(),
    location = "Unknown Location",
    eventType = "General",
    _id,
  } = post || {}; // Destructure with fallback to an empty object

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <p className="text-gray-500 mt-2">
          {new Date(eventStartDate).toLocaleDateString()} -{" "}
          {new Date(eventEndDate).toLocaleDateString()}
        </p>
        <p className="text-gray-500">Location: {location}</p>
        <p className="text-gray-500">Type: {eventType}</p>
        <div className="mt-4">
          <Link
            to={`/events/${_id}`} // Link to the event detail page
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

// Prop validation
BlogCard.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    eventStartDate: PropTypes.string.isRequired,
    eventEndDate: PropTypes.string.isRequired,
    location: PropTypes.string,
    eventType: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogCard;
