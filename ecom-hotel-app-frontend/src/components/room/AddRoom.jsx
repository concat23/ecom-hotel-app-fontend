import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import '../room/style.css'
import RoomTypeSelector from '../common/RoomTypeSelector'

export const AddRoom = () => {
    const[newRoom, setNewRoom] = useState({
        photo : null,
        roomType : '',
        roomPrice : ''
},[])

    const[imagePreview, setImagePriview] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    // const handleRoomInputChange = (e) =>{
    //     const name = e.target.name
    //     let value = e.target.value

    //     if (name === "roomPrice" && !isNaN(value)) {
    //         console.log("Value:"+value);
    //         value = parseInt(value, 10);
    //     } else {
    //         value = "";
    //     }
        

    //     setNewRoom({...newRoom, [name]:value})
    // } 


    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if(name === "roomType"){
            value = e.target.value;
        }
        else if (name === "roomPrice" && !isNaN(value)) {
          console.log("Value:" + value);
          value = parseInt(value,10);
        } else {
          value = '';
        }
      
        setNewRoom((prevRoom) => ({
          ...prevRoom,
          [name]: value,
        }));
      };

      
      // ...
      
      <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom.roomType} />
      

      const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
      
        setNewRoom((prevRoom) => ({
          ...prevRoom,
          photo: selectedImage,
        }));
      
        setImagePriview(URL.createObjectURL(selectedImage));
      };
      


    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)

            if(success !== undefined){
                setSuccessMessage("A new room was added to the database.")
                setNewRoom({ 
                                photo: null, 
                                roomType:'',
                                roomPrice:''
                            })
                setImagePriview("")
                setErrorMessage("")
            }
            else
            {
                setErrorMessage("Error adding room !")
            }
        }catch(error){
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
                    <h2 className="mt-5 mb-2">Add a new room</h2>
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
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom.roomType}/>
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
                                    value={newRoom.roomPrice || ''}
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
                                    <img src={imagePreview} alt="Preview Room Photo" style={{maxWidth:"400px",maxHeight:"400px"}}
                                    className="mb-3" />
                                )
                            }
                        </div>

                            <div className="d-grid d-md-flex mt-2">

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

export default AddRoom;