import React from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../../common/Header'
import '../booking/style.css'

export const BookingSuccess = () => {
    const location = useLocation();
    const message = location.state?.message;
    const error = location.state?.error;

    return (
        <div className="booking-success-container">
            <Header title={"Booking success"} className="booking-header">
                <div className="booking-content">
                    {message ? (
                        <div className="success-message">
                            <h3>Booking Success.</h3>
                            <p>{message}</p>
                        </div>
                    ) : (
                        <div className="error-message">
                            <h3>Error Booking Room!</h3>
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </Header>
        </div>
    );
};

