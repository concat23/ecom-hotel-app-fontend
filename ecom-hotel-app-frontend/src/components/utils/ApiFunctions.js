import axios from "axios"


export const api = axios.create({
    baseURL :"http://localhost:8066",
});

export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData()
    
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    const response = await api.post("/api/rooms/add/new-room", formData)

    if(response.status === 201){
        return true
    }
    else{
        return false
    }
}

export async function getRoomTypes(){
    try{
        const response = await api.get("/api/rooms/room/types")
        console.log(response)
        return response.data
    }catch(error){
        throw new Error("Error fetching room types")
    }
}