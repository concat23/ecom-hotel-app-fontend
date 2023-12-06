import React from 'react'
import { useState } from 'react'
import '../common/style.css'
import { FaFilter } from 'react-icons/fa'

export const RoomFilter = ({data, setFilteredData}) => {
 
    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) =>{
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        const filteredRooms = data.filter( (room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
        setFilteredData(filteredRooms)
    }

    const clearFilter = () =>{
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]

  return (
    <div>
        <div className='input-group mb-3'>
        <span className='input-group-text' id="room-type-filter"><FaFilter style={{ color:"#28a745"}}/></span>
        <select name="" id="" value={filter} onChange={handleSelectChange} className='form-select' >
            <option value={""}>Select a room type to filter ...</option>     
            {   roomTypes.map( (type,index) =>(
                    <option key={index} value={String(type)}> {String(type)} </option>
                )) 
            }
        </select>
        <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear</button>
        </div>
    </div> 
  )
}
