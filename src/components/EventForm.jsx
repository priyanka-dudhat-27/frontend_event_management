/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const EventForm = () => {
    // Base URL for API
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token');

    // State for form data
    const [formData, setFormData] = useState({
        title: '',
        user: '',
        eventStartDate: '',
        eventEndDate: '',
        location: '',
        eventType: '',
        attendees: 1,
    });

    // State for selected image file
    const [selectedImage, setSelectedImage] = useState(null);

    // State for feedback messages
    const [message, setMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    // Upload image to Cloudinary
    const uploadImage = async (image) => {
        const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/cantacloudy2/image/upload';
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'instaclone');
        
        try {
            const response = await axios.post(cloudinaryUrl, formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Image upload failed:', error);
            throw new Error('Image upload failed');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setMessage('Please log in to create an event.');
            return;
        }

        try {
            let imageUrl = '';
            if (selectedImage) {
                imageUrl = await uploadImage(selectedImage);
            }

            // Construct form data object for submission
            const eventData = {
                ...formData,
                image: imageUrl,
            };

            // API request to create event
            const response = await axios.post(`${BASE_URL}/event/createEvent`, eventData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            

            if (response.status === 201 || response.status === 200) {
                toast.success('Event created successfully!');
                setMessage('Event created successfully!');
                setFormData({
                    title: '',
                    user: '',
                    eventStartDate: '',
                    eventEndDate: '',
                    location: '',
                    eventType: '',
                    attendees: 1,
                });
                setSelectedImage(null);
            } else {
                toast.error('Failed to create event. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
                toast.error(`Error: ${error.response.data.message || 'An error occurred. Please try again.'}`);
            } else if (error.request) {
                console.error('No response received:', error.request);
                toast.error('No response from server. Please check your network connection.');
            } else {
                console.error('Error setting up request:', error.message);
                toast.error('Unexpected error. Please try again.');
            }
        }
        
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Create a New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Event Start Date:</label>
                    <input
                        type="date"
                        name="eventStartDate"
                        value={formData.eventStartDate}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Event End Date:</label>
                    <input
                        type="date"
                        name="eventEndDate"
                        value={formData.eventEndDate}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Event Type:</label>
                    <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Event Type</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Conference">Conference</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Panel Discussion">Panel Discussion</option>
                        <option value="Meetup">Meetup</option>
                        <option value="Networking Event">Networking Event</option>
                        <option value="Festival">Festival</option>
                        <option value="Party">Party</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Attendees:</label>
                    <input
                        type="number"
                        name="attendees"
                        value={formData.attendees}
                        onChange={handleChange}
                        min="1"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="block w-full py-2 px-4 text-center bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
                >
                    Create Event
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default EventForm;
