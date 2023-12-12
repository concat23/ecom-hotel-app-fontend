import axios from "axios";

// Create an axios instance with a base URL
export const api = axios.create({
  baseURL: "http://localhost:8066",
});

// Function to add a new room
export async function addRoom(photo,roomCode, roomType, roomPrice) {
  const formData = new FormData();

  formData.append("photo", photo);
  formData.append("roomCode",roomCode);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/api/rooms/add/new-room", formData);

  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

// Function to get room types
export async function getRoomTypes() {
  try {
    const response = await api.get("/api/rooms/room/types");
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}

// Function to get all rooms
export async function getAllRooms() {
  try {
    const resultList = await api.get("/api/rooms/all-rooms");
    return resultList.data;
  } catch (error) {
    throw new Error("Error fetching rooms");
  }
}

// Function to delete a room
export async function deleteDropRoom(id) {
  try {
    const result = await api.delete(`/api/rooms/delete/room/${id}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error, Deleting room ${error.message}`);
  }
}

// Function to delete or update a room with backup and restore
export async function deleteUpdateBackupAndRestoreRoom(id) {
  try {
    const result = await api.delete(`/api/rooms/backup-restore/room/${id}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error, Backup restoring room ${error.message}`);
  }
}

// Function to update a room
export async function updateRoom(id, roomData) {
  const formData = new FormData();

  formData.append("roomCode", roomData.roomCode);
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  const response = await api.put(`/api/rooms/update/${id}`, formData);

  return response;
}

// Function to get a room by ID
export async function getRoomById(id) {
  try {
    const result = await api.get(`/api/rooms/room/${id}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room ${error.message}`);
  }
}

/* ================= Booking Room ================ */

// Function to book a room
export async function bookingRoom(id, booking) {
  try {
    const response = await api.post(`/api/bookings/room/${id}/booking`, booking);
    return response.data;
  } catch (error) {
    console.error("Error booking room:", error);
    if (error.response && error.response.data) {
      console.error("Server response:", error.response.data);
    }
    throw new Error(`Error booking room: ${error.message}`);
  }
}

// Function to get all bookings
export async function getAllBookings() {
  try {
    const resultList = await api.get(`/api/bookings/all-bookings`);
    return resultList.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

// Function to get a booking by confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/api/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error find booking: ${error.message}`);
    }
  }
}

// Function to cancel a booking
export async function cancelBooking(id) {
  try {
    const result = await api.delete(`/api/bookings/booking/${id}/delete`);
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling booking: ${error.message}`);
  }
}
