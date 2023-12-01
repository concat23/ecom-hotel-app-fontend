import React, { useEffect, useState } from 'react'
import { RoomCard } from './RoomCard'
import { Container } from '../../items/Container'
import { Row } from '../column/Row'
import { Col } from '../column/Col'
import { RoomFilter } from '../common/RoomFilter'
import { RoomPaginator } from '../common/RoomPaginator'
import { getAllRooms } from '../utils/ApiFunctions'
export const Room = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage, setRoomsPerPage] = useState(5)
    const [filteredData, setFilteredData] = useState([])

    useEffect(() =>{
        setIsLoading(true)
        getAllRooms().then( (data) =>{
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((error) =>{
            setError(error.message)
            setIsLoading(false)
        })
    },[])

    if(isLoading){
        return <div>Loading rooms ...</div>
    }
    
    if(error){
        return <div className='exc-danger'>Error: {error}</div>
    }

    const handlePageChange = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(filteredData.length / roomsPerPage)

    const renderRooms = () =>{
        const startIndex = (currentPage - 1) * roomsPerPage

        const endIndex = startIndex + roomsPerPage

        return filteredData.slice(startIndex, endIndex).map( (room) => <RoomCard key={room.id} room={room} />)
    }


  return (
    <Container>
        <Row>
            <Col md={6}>
                <RoomFilter data={data} setFilteredData={setFilteredData} />
            </Col>
            <Col md={6}>
                <RoomPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}  />
            </Col>
        </Row>
        <Row>
            { renderRooms() }
        </Row>
        <Row>
            <Col md={6}>
                <RoomPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}  />
            </Col>
        </Row>
    </Container>
  )
}
