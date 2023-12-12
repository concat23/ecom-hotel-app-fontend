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
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [roomPrice, setRoomPrice] = useState(0);
    const [booking, setBooking] = useState({
        guestFullName: '',
        guestEmail: '',
        checkInDate: '',
        checkOutDate: '',
        numOfAdults: '',
        numOfChildren: '',
    });

    const { id } = useParams();
    console.log('Room ID:', id);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage('');

        handleFieldValidation(name);
    };

    const handleInvalid = (validationResult) => {
        if (!validationResult.isValid && validationResult.errorMessage) {
            setErrorMessage(validationResult.errorMessage);
        }
    };

    const validateFullName = (fullName) => {
        const validationResult = validateFullNameHelper(fullName);
        handleInvalid(validationResult);
    };

    const validateEmail = (email) => {
        const validationResult = validateEmailHelper(email);
        handleInvalid(validationResult);
    };

    const validateDates = () => {
        const validationResult = validateDatesHelper();
        handleInvalid(validationResult);
    };

    const validateFullNameHelper = (fullName) => {
        if (!fullName.trim()) {
            return { isValid: false, errorMessage: 'Please enter your full name.' };
        }
        return { isValid: true, errorMessage: null };
    };

    const validateEmailHelper = (email) => {
        if (!email.trim()) {
            return { isValid: false, errorMessage: 'Please enter your email.' };
        }
        // Add a more robust email validation if needed
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return { isValid: false, errorMessage: 'Please enter a valid email address.' };
        }
        return { isValid: true, errorMessage: null };
    };

    const validateDatesHelper = () => {
        const { checkInDate, checkOutDate } = booking;
        if (!checkInDate || !checkOutDate) {
            return { isValid: false, errorMessage: 'Please select both check-in and check-out dates.' };
        }

        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);

        if (startDate >= endDate) {
            return { isValid: false, errorMessage: 'Check-out date must be after check-in date.' };
        }

        // Additional validation logic if needed

        return { isValid: true, errorMessage: null };
    };

    const getRoomPrinceById = async (id) => {
        try {
            const response = await getRoomById(id);
            console.log(response);
            setRoomPrice(response.roomPrice);
        } catch (error) {
            console.error('Error fetching room:', error);
            throw new Error('Error fetching room. Please try again later.'); // Customize this error message
        }
    };

    useEffect(() => {
        if (id && typeof id === 'string' && id.trim() !== '') {
            getRoomPrinceById(id);
        } else {
            console.error('Invalid or missing room ID:', id);
        }
    }, [id]);

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate);
        const price = roomPrice ? roomPrice : 0;
        console.log(price);
        return diffInDays * price;
    };

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const childrenCount = parseInt(booking.numOfChildren);
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    };

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage('Check-out date must come before check in date');
            return false;
        } else {
            setErrorMessage('');
            return true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
    
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
    
        setIsValidated(true);
        setIsSubmitted(true);
    
        if (validateDates() && validateFullName() && validateEmail()) {
            // Perform form submission logic here
            console.log('Form submitted successfully');
        } else {
            console.log('Form submission failed due to validation errors');
        }
    };
    

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookingRoom(id, booking);
            console.log('Booking successfully. Confirmation code:', confirmationCode);
            setIsSubmitted(true);
            navigate('/booking-success', { state: { message: confirmationCode } });
        } catch (error) {
            console.error('Error booking room:', error);
            setErrorMessage(error.message);
            navigate('/', { state: { error: errorMessage } });
        }
    };



    const renderUnderlineClass = (fieldName) => {
        return isFieldValid(fieldName) || !isSubmitted ? 'is-valid' : 'is-invalid';
    };
    

    const isFieldValid = (field) => {
        switch (field) {
            case 'guestFullName':
                return booking.guestFullName.trim() !== '';
            case 'guestEmail':
                return isEmailValid(booking.guestEmail);
            case 'checkInDate':
                return moment(booking.checkInDate).isValid();
            case 'checkOutDate':
                return moment(booking.checkOutDate).isValid();
            case 'numOfAdults':
                return isAdultCountValid(booking.numOfAdults);
            case 'numOfChildren':
                return isChildrenCountValid(booking.numOfChildren);
            default:
                return true;
        }
    };

    const handleFieldValidation = (field) => {
        if (!isFieldValid(field)) {
            setErrorMessage(`Please provide a valid ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        } else {
            setErrorMessage('');
        }
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isAdultCountValid = (value) => {
        const intValue = parseInt(value);
        return !isNaN(intValue) && intValue >= 1;
    };

    const isChildrenCountValid = (value) => {
        const intValue = parseInt(value);
        return !isNaN(intValue) && intValue >= 0;
    };
    
    
    
    

    return (
        <>
            <div className="booking-container">
                <div className="form-section">
                    <div className="form-header">
                        <h4>Reserve Room</h4>
                    </div>
                    <form className="booking-form" noValidate validated={isValidated.toString()} onSubmit={handleSubmit}>
                    <fieldset className="form-fieldset">
                            <legend className="form-legend">Full Name</legend>
                            <FormGroup className="form-group">
                            <FormLabel className="form-label" htmlFor='guestFullName'>
                                Full Name:
                            </FormLabel>
                            <FormControl
                                className={`form-control ${renderUnderlineClass('guestFullName')}`}
                                required
                                type={'text'}
                                id="guestFullName"
                                name="guestFullName"
                                value={booking.guestFullName}
                                placeholder="Enter your full name ..."
                                onChange={handleInputChange}>
                            </FormControl>
                            <FormControlFeedback isValid={isFieldValid('guestFullName') || isSubmitted} />
                        </FormGroup>


                </fieldset>
                <fieldset className="form-fieldset">
                            <legend className="form-legend">Full Name</legend>
                            <FormGroup className="form-group">
                                <FormLabel className="form-label" htmlFor='guestEmail'>
                                    Email:
                                </FormLabel>
                                <FormControl
                                    className={`form-control ${renderUnderlineClass('guestEmail')}`}
                                    required
                                    type={'text'}
                                    id="guestEmail"
                                    name="guestEmail"
                                    value={booking.guestEmail}
                                    placeholder="Enter your email ..."
                                    onChange={handleInputChange}>
                                </FormControl>
                                <FormControlFeedback isValid={isFieldValid('guestEmail') || isSubmitted} />
                            </FormGroup>
                
                </fieldset>
                       
                 

                        <fieldset className="form-fieldset">
                            <legend className="form-legend">Lodging Period</legend>
                            <div className="date-inputs">
                                <div className="form-group">
                                    <FormLabel className="form-label" htmlFor="checkInDate">
                                        Check-In date:{' '}
                                    </FormLabel>
                                    <FormControl
                                        className={`form-control ${validateDatesHelper().isValid ? '' : 'is-invalid'}`}
                                        required
                                        type={'date'}
                                        id="checkInDate"
                                        name="checkInDate"
                                        value={booking.checkInDate}
                                        placeholder="check-in date"
                                        onChange={handleInputChange}
                                        onInvalid={() => validateDates()}
                                    />
                                    {validateDatesHelper().isValid ? null : (
                                        <FormControlFeedback  isValid={isFieldValid('checkInDate') || isSubmitted} className="error-message" type={'invalid'}>
                                            {validateDatesHelper().errorMessage}
                                        </FormControlFeedback>
                                    )}
                                </div>

                                <div className="form-group">
                                    <FormLabel className="form-label" htmlFor="checkOutDate">
                                        Check-Out date:{' '}
                                    </FormLabel>
                                    <FormControl
                                        className={`form-control ${validateDatesHelper().isValid ? '' : 'is-invalid'}`}
                                        required
                                        type={'date'}
                                        id="checkOutDate"
                                        name="checkOutDate"
                                        value={booking.checkOutDate}
                                        placeholder="check-out date"
                                        onChange={handleInputChange}
                                        onInvalid={() => validateDates()}
                                    />
                                    {validateDatesHelper().isValid ? null : (
                                        <FormControlFeedback isValid={isFieldValid('checkOutDate') || isSubmitted} className="error-message" type={'invalid'}>
                                            {validateDatesHelper().errorMessage}
                                        </FormControlFeedback>
                                    )}
                                </div>
                            </div>
                            {validateDatesHelper().isValid ? null : (
                                <p className="error-message">{validateDatesHelper().errorMessage}</p>
                            )}
                        </fieldset>

                        <fieldset className="form-fieldset">
                            <legend className="form-legend">Number of Guests</legend>
                            <div className="guest-inputs">
                                <div className="form-group">
                                    <FormLabel className="form-label" htmlFor="numOfAdults">
                                        Adults:{' '}
                                    </FormLabel>
                                    <FormControl
                                        className={`form-control ${isGuestCountValid() ? '' : 'is-invalid'}`}
                                        required
                                        type={'text'}
                                        id="numOfAdults"
                                        name="numOfAdults"
                                        value={booking.numOfAdults}
                                        placeholder="0"
                                        min={1}
                                        onChange={handleInputChange}
                                    />
                                    {isGuestCountValid() ? null : (
                                        <FormControlFeedback className="error-message" type={'invalid'} isValid={isFieldValid('numOfAdults') || isSubmitted}>
                                            Number of adults must be at least 1.
                                        </FormControlFeedback>
                                    )}
                                </div>

                                <div className="form-group">
                                    <FormLabel className="form-label" htmlFor="numOfChildren">
                                        Children:{' '}
                                    </FormLabel>
                                    <FormControl
                                        className={`form-control ${isGuestCountValid() ? '' : 'is-invalid'}`}
                                        required
                                        type={'text'}
                                        id="numOfChildren"
                                        name="numOfChildren"
                                        value={booking.numOfChildren}
                                        placeholder="0"
                                        min={0}
                                        onChange={handleInputChange}
                                    />
                                    {isGuestCountValid() ? null : (
                                        <FormControlFeedback className="error-message" type={'invalid'} isValid={isFieldValid('numOfChildren') || isSubmitted}>
                                            Number of children must be 0 or more.
                                        </FormControlFeedback>
                                    )}
                                </div>
                            </div>
                            {isGuestCountValid() ? null : (
                                <p className="error-message">Invalid guest count. Please check the number of guests.</p>
                            )}
                        </fieldset>

                        <div className="form-actions">
                            <button type="submit" className="submit-button">
                                Continue
                            </button>
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
};