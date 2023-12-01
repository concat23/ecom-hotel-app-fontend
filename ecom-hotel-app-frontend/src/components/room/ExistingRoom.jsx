import React, { useEffect } from "react";
import { useState } from "react";
import { getAllRooms, deleteDropRoom, deleteUpdateBackupAndRestoreRoom } from "../utils/ApiFunctions";
import { RoomFilter } from "../common/RoomFilter";
import { RoomPaginator } from "../common/RoomPaginator";
import "../room/style.css";
import { Col } from "../column/Col";
import { Row } from "../column/Row";
import { Btn } from "../button/Btn";
import { FaEdit, FaEye, FaFlushed, FaPlus, FaTrashAlt, FaTrashRestore } from "react-icons/fa"
import { Link } from "react-router-dom";




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


  const handleDeleteDrop = async(id) =>{
    try{
      const result = await deleteDropRoom(id)
      if(result === ""){
          setSuccessMessage(`Room No ${id} was delete`)
          fetchRooms()
      }
    }catch(error){
      setErrorMessage(error.message)
    }

    setTimeout(()=>{
      setSuccessMessage("")
      setErrorMessage("")
    },3000)
  }


  const handleDeleteBackupRestore = async(id) =>{
    try{
      const result = await deleteUpdateBackupAndRestoreRoom(id)
      if(result === ""){
          setSuccessMessage(`Room No ${id} was update restore`)
          fetchRooms()
      }
    }catch(error){
      setErrorMessage(error.message)
    }

    setTimeout(()=>{
      setSuccessMessage("")
      setErrorMessage("")
    },3000)
  }

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

              <Row>
                <Col md={6} className="mb-3 md-md-0">
                    <Link to={"/add-room"} className="link-add-room">
                      <FaPlus className="icon-add-room" /> Add room
                    </Link>
                  </Col>
                  <Col md={6} className="mb-3 md-md-0">
                      <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                </Col>
              </Row>
          
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
                      <td className="group-features">
                        <Link to={`/edit-room/${room.id}`} className="btn-vw-edt">
                          <span className="btn">
                            <FaEye />
                          </span>
                          <span className="btn">
                             <FaEdit />
                          </span>
                        </Link>
                        <button className="btn-del" onClick={() => handleDeleteDrop(room.id)}>
                            <FaTrashAlt />
                        </button>
                        <button className="btn-del" style={{display: 'none' }} onClick={() => handleDeleteBackupRestore(room.id)}>
                            <FaTrashRestore />
                        </button>
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
