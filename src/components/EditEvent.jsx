/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditEvent = () => {
    const { eventId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        image: null,
        eventStartDate: '',
        eventEndDate: '',
        location: '',
        eventType: '',
        attendees: 1,
    });
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventData = async () => {
            if (!eventId) {
                setMessage('Event ID is missing.');
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('You have to log in first.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/event/getEventById/${eventId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFormData(response.data);
                setImagePreview(response.data.image);
            } catch (error) {
                console.error('Error fetching event data:', error);
                if (error.response && error.response.status === 401) {
                    setMessage('You have to log in first.');
                    navigate('/login');
                } else {
                    setMessage('Failed to load event data.');
                }
            }
        };

        fetchEventData();
    }, [eventId, navigate]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const uploadImage = async (image) => {
        const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/cantacloudy2/image/upload';
        const uploadFormData = new FormData();
        uploadFormData.append('file', image);
        uploadFormData.append('upload_preset', 'instaclone');

        try {
            const response = await axios.post(cloudinaryUrl, uploadFormData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Image upload failed:', error);
            throw new Error('Image upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            let imageUrl = formData.image;
            if (formData.image instanceof File) {
                imageUrl = await uploadImage(formData.image);
            }

            const updatedEvent = {
                title: formData.title,
                eventStartDate: formData.eventStartDate,
                eventEndDate: formData.eventEndDate,
                location: formData.location,
                eventType: formData.eventType,
                attendees: formData.attendees,
                image: imageUrl,
            };

            const response = await axios.put(`${BASE_URL}/event/editEvent/${eventId}`, updatedEvent, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setMessage('Event updated successfully!');
            navigate('/my-events');
        } catch (error) {
            console.error('Error updating event:', error);
            if (error.response && error.response.status) {
                setMessage(`Failed to update event: ${error.response.status} - ${error.response.data.message}`);
            } else {
                setMessage('Failed to update event.');
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-center mb-6">Edit Event</h2>
            {message && <p className="text-red-500 text-center">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Event Title"
                />
                <div>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Event preview" className="mt-2 max-w-full h-auto" />
                    )}
                </div>
                <input
                    type="date"
                    name="eventStartDate"
                    value={formData.eventStartDate ? formData.eventStartDate.split('T')[0] : ''}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="date"
                    name="eventEndDate"
                    value={formData.eventEndDate ? formData.eventEndDate.split('T')[0] : ''}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Location"
                />
                <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <input
                    type="number"
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Number of Attendees"
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                >
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default EditEvent;