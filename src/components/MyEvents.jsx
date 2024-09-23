/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MyEvents = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            if (!user) return; 
            try {
                const response = await axios.get(`${BASE_URL}/event/getMyEvents/${user.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEvents(response.data.events || []); 
            } catch (error) {
                console.error('Error fetching events:', error);
                setMessage('Failed to load events.');
            }
        };

        fetchEvents();
    }, [user]);

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await axios.delete(`${BASE_URL}/event/deleteEvent/${eventId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEvents(events.filter(event => event._id !== eventId)); // Update state to remove deleted event
                setMessage('Event deleted successfully!');
            } catch (error) {
                console.error('Error deleting event:', error);
                setMessage('Failed to delete event.');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-600">My Events</h2>
            {message && <p className="text-red-500 text-center">{message}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(events) && events.length === 0 ? (
                    <p className="text-center text-lg">No events found.</p>
                ) : (
                    events.map(event => (
                        <div key={event._id} className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                                <p className="text-gray-600"><strong>Date:</strong> {new Date(event.eventStartDate).toLocaleDateString()} - {new Date(event.eventEndDate).toLocaleDateString()}</p>
                                <p className="text-gray-600"><strong>Location:</strong> {event.location}</p>
                                <p className="text-gray-600"><strong>Type:</strong> {event.eventType}</p>
                                <p className="text-gray-600"><strong>Attendees:</strong> {event.attendees}</p>
                                <div className="mt-4 flex justify-between">
                                    <Link to={`/edit-event/${event._id}`} className="text-blue-500 hover:underline">Edit</Link>
                                    <button onClick={() => handleDelete(event._id)} className="text-red-500 hover:underline">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyEvents;
