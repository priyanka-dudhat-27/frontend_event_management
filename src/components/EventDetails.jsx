/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/event//${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvent(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;
    if (!event) return <div className="text-center py-10">No event found.</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container mx-auto px-4">
                {/* Banner Image */}
                <div className="relative">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-96 object-cover rounded-lg shadow-lg" // Increased height
                    />
                    <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold bg-black bg-opacity-50 rounded-lg">
                        {event.title}
                    </h1>
                </div>

                {/* Event Details */}
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">Event Details</h2>
                    <div className="mt-4 space-y-4 text-center">
                        <p className="text-gray-600">
                            <strong>Start Date:</strong> {new Date(event.eventStartDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            <strong>End Date:</strong> {new Date(event.eventEndDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            <strong>Location:</strong> {event.location}
                        </p>
                        <p className="text-gray-600">
                            <strong>Type:</strong> {event.eventType}
                        </p>
                        <p className="text-gray-600">
                            <strong>Attendees:</strong> {event.attendees}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
