import React, { useEffect, useState } from 'react'
import { bookingRoom, getRoomById } from '../../utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { BookingSummary } from './BookingSummary'
import '../booking/style.css'
import { FormLabel } from '../../form/FormLabel'
import { FormControl } from '../../form/FormControl'
import { FormGroup } from '../../form/FormGroup'
import { FormControlFeedback } from '../../form/FormControlFeedback'

export const BookingForm = () => {
  
    const[isValidated, setIsValidated] = useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessage, setErrorMessage] = useState("")
    const[roomPrice, setRoomPrice] = useState(0)
    const[booking, setBooking] = useState({
        guestFullName:"",
        guestEmail:"",
        checkInDate:"",
        checkOutDate:"",
        numOfAdults:"",
        numOfChildren: "",
    })

    const { id } = useParams();
    console.log("Room ID:", id);

    const navigate = useNavigate()

    const handleInputChange = (e) =>{
        const{name, value} = e.target
        setBooking({...booking, [name]:value})
        setErrorMessage("")
    }

    const[roomInfo, setRoomInfo] = useState({
        photo:"",
        roomType:"",
        roomPrice:"",
    })

    // const getRoomPrinceById = async(id) =>{
    //     try {
    //         const response = await getRoomById(id)
    //         setRoomPrice(response.roomPrice)
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }
    const getRoomPrinceById = async (id) => {
        try {
            const response = await getRoomById(id);
            console.log(response)
            setRoomPrice(response.roomPrice);
        } catch (error) {
            console.error("Error fetching room:", error);
            throw new Error("Error fetching room. Please try again later."); // Customize this error message
        }
    };
    

    useEffect(() => {
    if (id && typeof id === 'string' && id.trim() !== '') {
        getRoomPrinceById(id);
    } else {
        console.error("Invalid or missing room ID:", id);
    }
    }, [id]);

    const calculatePayment = () =>{
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate)
        const price = roomPrice ? roomPrice : 0
        return diffInDays * price
    }

    const isGuestCountValid = () =>{
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = ()=>{
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check-out date must come before check in date")
            return false
        }else{
            setErrorMessage("")
            return true
        }

    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity()===false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        }else{
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }


    const handleBooking = async() => {
        try {
            const confirmationCode = await bookingRoom(id, booking);
            console.log("Booking successfully. Confirmation code:", confirmationCode);
            setIsSubmitted(true);
            navigate("/", { state: { message: confirmationCode } });
        } catch (error) {
            console.error("Error booking room:", error);
            setErrorMessage(error.message);
            navigate("/", { state: { error: errorMessage } });
        }
    };
    
    return (
        <>
            <div className="booking-container">
                <div className="form-section">
                    <div className="form-header">
                        <h4>Reserve Room</h4>
                    </div>
                    <form className="booking-form" noValidate validated={isValidated.toString()} onSubmit={handleSubmit}>
                        <FormGroup className="form-group">
                            <FormLabel className="form-label" htmlFor='guestFullName'>Full Name: </FormLabel>
                            <FormControl 
                                className="form-control"
                                required type={'text'} 
                                id="guestFullName" 
                                name="guestFullName" 
                                value={booking.guestFullName}
                                placeholder="Enter your full name ..."
                                onChange={handleInputChange}>
                            </FormControl>
                            <FormControlFeedback className="error-message" type={"invalid"}>Please enter your fullname</FormControlFeedback>
                        </FormGroup>
    
                        <FormGroup className="form-group">
                            <FormLabel className="form-label" htmlFor='guestEmail'>Email: </FormLabel>
                            <FormControl 
                                className="form-control"
                                required type={'text'}  
                                id="guestEmail" 
                                name="guestEmail" 
                                value={booking.guestEmail}
                                placeholder="Enter your email ..."
                                onChange={handleInputChange}>
                            </FormControl>
                            <FormControlFeedback className="error-message" type={"invalid"}>Please enter your email</FormControlFeedback>
                        </FormGroup>
    
                        <fieldset className="form-fieldset">
                            <legend className="form-legend">Lodging Period</legend>
                            <div className="date-inputs">
                                <div className="form-group">
                                    <FormLabel className="form-label" htmlFor='checkInDate'>Check-In date: </FormLabel>
                                    <FormControl 
                                        className="form-control"
                                        required type={'date'} 
                                        id="checkInDate" 
                                        name="checkInDate" 
                                        value={booking.checkInDate}
                                        placeholder="check-in date"
                                        onChange={handleInputChange}>
                                    </FormControl>
                                    <FormControlFeedback className="error-message" type={"invalid"}>Please select a check-in date</FormControlFeedback>
                                </div>
    
                                <div className="form-group">
                                    <FormLabel className="form-label" htmlFor='checkOutDate'>Check-Out date: </FormLabel>
                                    <FormControl 
                                        className="form-control"
                                        required type={'date'} 
                                        id="checkOutDate" 
                                        name="checkOutDate" 
                                        value={booking.checkOutDate}
                                        placeholder="check-out date"
                                        onChange={handleInputChange}>
                                    </FormControl>
                                    <FormControlFeedback className="error-message" type={"invalid"}>Please select a check-out date</FormControlFeedback>
                                </div>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </fieldset>
    
                        <fieldset className="form-fieldset">
                            <legend className="form-legend">Number of Guests</legend>
                            <div className="guest-inputs">
                                <div className="form-group">
                                    <FormLabel className="form-label" htmlFor='numOfAdults'>Adults: </FormLabel>
                                    <FormControl 
                                        className="form-control"
                                        required type={'text'} 
                                        id="numOfAdults" 
                                        name="numOfAdults" 
                                        value={booking.numOfAdults}
                                        placeholder="0"
                                        min={1}
                                        onChange={handleInputChange}>
                                    </FormControl>
                                    <FormControlFeedback className="error-message" type={"invalid"}>Please select at least 1 adult</FormControlFeedback>
                                </div>
    
                                <div className="form-group">
                                    <FormLabel className="form-label" htmlFor='numOfChildren'>Children: </FormLabel>
                                    <FormControl 
                                        className="form-control"
                                        required type={'text'} 
                                        id="numOfChildren" 
                                        name="numOfChildren" 
                                        value={booking.numOfChildren}
                                        placeholder="0"
                                        min={0}
                                        onChange={handleInputChange}>
                                    </FormControl>
                                </div>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </fieldset>
    
                        <div className="form-actions">
                            <button type='submit' className="submit-button">Continue</button>
                        </div>
    
                    </form>
                </div>
                <div className="booking-summary-section">
                    {isSubmitted && (
                        <BookingSummary
                            booking={booking} 
                            payment={calculatePayment()} 
                            isFormValid={isValidated} 
                            onConfirm={handleBooking}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
