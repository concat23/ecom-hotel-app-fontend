import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'
import '../common/style.css'


export const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    
    const [roomTypes, setRoomTypes]  = useState([])

    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)

    const [newRoomType, setNewRoomType] = useState("")

    const defaultRoomType = "Default Room Type";

    useEffect(() =>{
        getRoomTypes().then((data) =>{
            setRoomTypes(data)
        })
    },[])


    const handleNewRoomTypeInputChange = (e) =>{
        setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () =>{
            console.log("newRoomType: "+newRoomType)
            if(newRoomType !== ""){
                setRoomTypes([...roomTypes, newRoomType])
                setNewRoomType("")
                setShowNewRoomTypeInput(false)
            }
    }

  return (
    <>
            {roomTypes && roomTypes.length > 0 ? (
                <div>
                    <select
                        name="roomType"
                        id="roomType"
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if (e.target.value === "Add new") {
                                setShowNewRoomTypeInput(true);
                            } else {
                                handleRoomInputChange(e);
                            }
                        }}
                    >
                        <option value={""}>Select a room type</option>
                        <option value={"Add new"}> Add new</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter a new room type"
                                onChange={handleNewRoomTypeInputChange}
                            />

                            <button
                                className="btn btn-hotel"
                                type="button"
                                onClick={handleAddNewRoomType}
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <select
                        name="roomType"
                        id="roomType"
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if (e.target.value === "Add new") {
                                setShowNewRoomTypeInput(true);
                            } else {
                                handleRoomInputChange(e);
                            }
                        }}
                    >
                        <option value={""}>Select a room type</option>
                        <option value={"Add new"}> Add new</option>
                        <option value={defaultRoomType}>{defaultRoomType}</option>
                    </select>
                    {showNewRoomTypeInput && (
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter a new room type"
                                onChange={handleNewRoomTypeInputChange}
                            />

                            <button
                                className="btn btn-hotel"
                                type="button"
                                onClick={handleAddNewRoomType}
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
  )
}


export default RoomTypeSelector;