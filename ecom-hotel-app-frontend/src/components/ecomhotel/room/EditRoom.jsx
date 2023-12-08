import React, { useEffect  } from "react";
import { useState } from "react";
import { getRoomById } from '../../utils/ApiFunctions';
import RoomTypeSelector from '../../common/RoomTypeSelector'
import {Link, useParams} from 'react-router-dom'
import { updateRoom } from "../../utils/ApiFunctions";
export const EditRoom = () => {
  const[room, setRoom] = useState({
    roomType : '',
    roomPrice : '',
    photo : null 
  })


const[imagePreview, setImagePreview] = useState("")
const[successMessage, setSuccessMessage] = useState("")
const[errorMessage, setErrorMessage] = useState("")
const { id } = useParams()

const handleImageChange = (e) => {
  const selectedImage = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

  if (selectedImage) {
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  } else {
    console.error("No file selected");
  }
};

const handleRoomInputChange = (e) => {
    const {name, value} = e.target
    setRoom({...room, [name]: value})
};

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(id);
        setRoom(roomData);
        setImagePreview(roomData.photo);
      } catch (error) {
        // console.error(error)
        setErrorMessage(error.message);
      }
  };
  

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try{
        const response = await updateRoom(id, room)

        if(response.status === 200){
            setSuccessMessage("Room updated successfully.")
            const updatedRoomData = await getRoomById(id)
            console.log(updatedRoomData)
            setRoom(updatedRoomData)
            setImagePreview(updatedRoomData.photo)
            setErrorMessage("")
        }
        else
        {
            setErrorMessage("Error updating room !")
        }
    }catch(error){
      console.error(error)
        setErrorMessage(error.message)
    }

    setTimeout(() =>{
        setSuccessMessage("")
        setErrorMessage("")
    },3000)
}

  return (
    <>
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Update room</h2>
                    { successMessage && (
                        <div className='alert alert-success fade show'>
                                {successMessage}
                        </div>
                    )
                    }

                    {
                        errorMessage && (
                            <div className='alert alert-error fade show'>
                                {errorMessage}
                            </div>
                        )
                    }



                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label">
                                Room Type
                            </label>
                            <input type="text" className="form-control" id="roomType" name="roomType" value={room.roomType} onChange={handleRoomInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label">
                                Room Price
                            </label>
                           <input 
                                    type="number"
                                    className="form-control"
                                    required
                                    id="roomPrice"
                                    name="roomPrice"
                                    value={room.roomPrice || ''}
                                    onChange={handleRoomInputChange}>

                           </input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">
                                Room Photo
                            </label>
                           <input 
                                    type="file"
                                    className="form-control"
                                    required
                                    id="photo"
                                    name="photo"
                                    onChange={handleImageChange} />             
                            {
                                imagePreview && (
                                    <img src={`data:image/jpeg;base64,${imagePreview}`} alt="Preview Room Photo" style={{maxWidth:"400px",maxHeight:"400px"}}
                                    className="mb-3" />
                                )
                            }
                        </div>

                            <div className="d-grid d-md-flex mt-2">
                                <Link to={"/existing-rooms"}  className="btn btn-outline-info ml-5">
                                </Link>
                            </div>
                            <button className="btn btn-outline-primary ml-5">
                                Save Room
                            </button>

                    </form>
                </div>
            </div>
        </section>
    </>
  )
}
