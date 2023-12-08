import React from 'react'

export const BookingSelectDate = () => {
    const [booking, setBooking] = useState({
        checkInDate: '',
        checkOutDate: '',
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking((prevBooking) => ({ ...prevBooking, [name]: value }));

        // Validate dates on input change
        validateDates();
    };

    const validateDates = () => {
        const { checkInDate, checkOutDate } = booking;

        if (!checkInDate || !checkOutDate) {
            setErrorMessage('Please select both check-in and check-out dates.');
            return false;
        }

        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);

        if (startDate >= endDate) {
            setErrorMessage('Check-out date must be after check-in date.');
            return false;
        }

        // Additional validation logic if needed

        setErrorMessage(null); // Reset error message if validation passes
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate dates before submitting the form
        if (validateDates()) {
            // Perform form submission logic here
            console.log('Form submitted successfully');
        } else {
            console.log('Form submission failed due to validation errors');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="form-fieldset">
                <legend className="form-legend">Lodging Period</legend>
                <div className="date-inputs">
                    <div className="form-group">
                        <label className="form-label" htmlFor="checkInDate">
                            Check-In date:
                        </label>
                        <input
                            className="form-control"
                            required
                            type="date"
                            id="checkInDate"
                            name="checkInDate"
                            value={booking.checkInDate}
                            onChange={handleInputChange}
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="checkOutDate">
                            Check-Out date:
                        </label>
                        <input
                            className="form-control"
                            required
                            type="date"
                            id="checkOutDate"
                            name="checkOutDate"
                            value={booking.checkOutDate}
                            onChange={handleInputChange}
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </fieldset>

            <button type="submit">Submit</button>
        </form>
    );
}
