interface signupI {
    username: string,
    password: string
}
interface signinI {
    username: string,
    password: string
}
interface createRoomI {
    name: string
}

interface deleteRoomI {
    roomId: string
}
interface roomMsgI {
    roomId: string
};

const backend_url = "http://localhost:4000/api";
import axios from "axios";


export async function signup(data: signupI){
    const { username, password } = data;
    
    const result = await fetch(`${backend_url}/signup`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            username: username, 
            password: password
        })
    });

    const response = await result.json();

    if (!result.ok) {
        throw new Error(response.message || "Signup failed");
    }

    return response;
};

export const signin = async(data: signinI) => {
    const { username, password } = data;

    const result = await fetch(`${backend_url}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username, 
            password
        })
    });

    const response = await result.json();
    
    if (!result.ok) {
        throw new Error(response.message || "Signin failed");
    }

    localStorage.setItem("Authorization", `Bearer ${response.token}`);
    
    return response;
}

export const getUserInfo = async () => {
    const token = localStorage.getItem("Authorization");

    const result = await fetch(`${backend_url}/user`, {
        method: "GET",
        headers: {
            'authorization': `${token}`
        }
    })

     if (!result.ok) {
        const error = await result.json();
        throw new Error(error.message || `Request failed: ${result.status}`);
    }
    const response = await result.json();
  
    return response;
}

export const getUserbyId = async (data: {id: string}) => {
    const token = localStorage.getItem('Authorization');

    const result = await axios.get(`${backend_url}/user/${data.id}`, {
          headers: {
            'authorization': `${token}`
        }
    })

     if (result.status != 200) {
        throw new Error(result.data || `Request failed: ${result.status}`);
    }

    return result.data.user.username;
}

export const getRoomById = async (data: {id: string}) => {
    const token = localStorage.getItem('Authorization');

    const result = await axios.get(`${backend_url}/room/${data.id}`, {
          headers: {
            'authorization': `${token}`
        }
    })

     if (result.status != 200) {
        throw new Error(result.data || `Request failed: ${result.status}`);
    }

    return result.data.room.name;

}

export const createRoom = async (data: createRoomI) => {
    const token = localStorage.getItem('Authorization');
    const { name } = data;

    const result = await fetch(`${backend_url}/room`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${token}`
        },
        body: JSON.stringify({name})
    });

    const response = await result.json();

    if (!result.ok) {
        throw new Error(response.message || "Failed to create room");
    }

    return response;
}
export const getAllRooms = async() => {
    const token = localStorage.getItem('Authorization');

    const result = await fetch(`${backend_url}/rooms`, {
        method: "GET",
        headers: {
            'authorization': `${token}`
        }
    });

    const response = await result.json();

    if(!result.ok){
        throw new Error(response.message || "Failed to fetch rooms");
    }

    return response;
}

export const getRoomMessages = async(data: roomMsgI) => {
    const { roomId } = data;

    const token = localStorage.getItem('Authorization');
       
    if (!token) {
        throw new Error("Authorization token is missing. Please log in again.");
    }

    const result = await fetch(`${backend_url}/room/${roomId}/messages`, {
        method: "GET",
        headers: {
            'authorization': `${token}`
        }
    });

    const response = await result.json();

    if(!result.ok){
        throw new Error(response.message || "Failed to fetch room messages");
    }

    return response;
}

export const deleteRoom = async(data: deleteRoomI) => {
    const { roomId } = data;
    const token = localStorage.getItem('Authorization');
    const result = await fetch(`${backend_url}/room/${roomId}`,{
        method: "DELETE",
        headers: {
            'authorization': `${token}`
        }
    });

    const response = await result.json();

    if (!result.ok) {
        throw new Error(response.message || "Failed to delete room");
    }

    return response;
}


