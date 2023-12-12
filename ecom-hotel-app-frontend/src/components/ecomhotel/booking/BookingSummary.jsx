import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Btn } from '../../button/Btn'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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
      
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <p className="summary-item">
                Full Name: <strong>{booking.guestFullName}</strong>
              </p>
              <p className="summary-item">
                Email: <strong>{booking.guestEmail}</strong>
              </p>
              <p className="summary-item">
                Check-In Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
              </p>
              <p className="summary-item">
                Check-Out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
              </p>
              <p className="summary-item">
                Number Of Days: <strong>{numOfDays}</strong>
              </p>
            </Grid>
      
            <Grid item xs={12} md={6}>
              <div className="guest-info">
                <h5>Number Of Guests</h5>
                <p className="summary-item">
                  <strong>
                    Adults{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}
                  </strong>
                </p>
                <p className="summary-item">
                  <strong>
                    Children: {booking.numOfChildren}
                  </strong>
                </p>
              </div>
            </Grid>
          </Grid>
      
          {payment > 0 ? (
            <>
              <p className="summary-item">
                Total Payment: <strong>${payment}</strong>
              </p>
      
              {isFormValid && !isBookingConfirmed ? (
                <Button
                  className="confirm-booking-button"
                  variant="contained"
                  color="success"
                  onClick={handleConfirmBooking}
                  disabled={isProcessingPayment}
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
                <div className="loading-indicator">
                  <span role='status'>Loading...</span>
                </div>
              ) : null}
            </>
          ) : (
            <p className="error-message">
              Check-Out date must be after check-in date.
            </p>
          )}
        </div>
      );
}
