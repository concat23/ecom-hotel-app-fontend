import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Btn } from '../../button/Btn'
import Button from '@mui/material/Button';
import '../booking/style.css'

export const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {

    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numOfDays = checkOutDate.diff(checkInDate, 'days')
    const navigate = useNavigate()

    const[isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const[isProcessingPayment, setIsProcessingPayment] = useState(false)
    
    const handleConfirmBooking  = ()=>{
        setIsProcessingPayment(true)
        setTimeout( () => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        },3000)
    }

    useEffect(() => {
        console.log("payment:", payment);
        console.log("isFormValid:", isFormValid);
        console.log("isBookingConfirmed:", isBookingConfirmed);

        if (isBookingConfirmed) {
            navigate("/booking-success");
        }
    }, [isBookingConfirmed, navigate, payment, isFormValid]);

  return (
        <div className="reservation-summary-container">
            <h4>Reservation Summary</h4>
            <p>
                FullName: <strong>{booking.guestName}</strong>
            </p>
            <p>
                Email: <strong>{booking.guestEmail}</strong>
            </p>
            <p>
                Check-In Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
            </p>
            <p>
                Check-Out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
            </p>
            <p>
                Number Of Days: <strong>{numOfDays}</strong>
            </p>
            <div className="guest-info">
                <h5>Number Of Guests</h5>
                <strong>
                    Adult{booking.numberOfAdults > 1 ? "s" : ""} : {booking.numberOfAdults}
                </strong>
                <strong>
                    Children: {booking.numberOfChildren}
                </strong>
            </div>
            {payment > 0 ? (
                <>
                    <p>
                        Total Payment: <strong>${payment}</strong>
                    </p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button
                            className="confirm-booking-button"
                            variant="success"
                            onClick={handleConfirmBooking}
                        >
                            {isProcessingPayment ? (
                                <>
                                    <span role='status' aria-hidden='true'>
                                        Booking Confirmed, redirecting to payment ...
                                    </span>
                                </>
                            ) : (
                                "Confirm Booking and proceed to payment"
                            )}
                        </Button>
                    ) : isBookingConfirmed ? (
                        <div>
                            <div role='status'>
                                <span>Loading ...</span>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <p>
                    Check-Out date must be after check in date.
                </p>
            )}
        </div>
  )
}
