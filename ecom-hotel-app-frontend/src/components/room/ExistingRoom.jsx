import React, { useEffect } from "react";
import { useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { RoomFilter } from "../common/RoomFilter";
import { RoomPaginator } from "../common/RoomPaginator";
import "../room/style.css";
import { Col } from "../column/Col";
import { Btn } from "../button/Btn";

export const ExistingRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRooms(filtered);
      console.log("Filtered: " + filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const calculateTotalPage = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    console.log("Total rooms: " + totalRooms);
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading existing rooms</p>
      ) : (
        <>
          <section className="container mt-5 mb-5 ">
            <div className="col-md-8 col-lg-6">
              <div className="d-flex justify-content-center mb-3 mt-5">
                <h2>Existing rooms</h2>
              </div>
              <Col md={6} className="mb-3 md-md-0">
                <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
              </Col>

              <table className="table table-bordered table-hover">
                <thead>
                  <tr className="text-center">
                    <th>Room ID</th>
                    <th>Room Type</th>
                    <th>Room Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRooms.map((room) => (
                    <tr key={room.id} className="text-center">
                      <td>{room.id}</td>
                      <td>{room.roomType}</td>
                      <td>{room.roomPrice}</td>
                      <td>
                        <button className="btn-vw-edt">View / Edit</button>
                        <button className="btn-del">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <RoomPaginator
                currentPage={currentPage}
                totalPages={calculateTotalPage(
                  filteredRooms,
                  roomsPerPage,
                  rooms
                )}
                onPageChange={handlePaginationClick}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};
