import { io } from "socket.io-client";

const SOCKET_URL = "http://52.57.23.48:3001"


class WSService {
    initializeSocket = async () => {
        try {
            this.socket = io(SOCKET_URL);
            // console.log("Initialize Socket", this.socket)

            this.socket.on("connect", (data) => {
                console.log('data',data)
                console.log("=====Socket Connected=====")
                // console.log("Initialize Socket", this.socket)
            })

            this.socket.on("disconnect", (data) => {
                console.log("=====Socket Disconnected=====",data)
            })

            this.socket.on("error", (data) => {
                console.log("=====Socket Error=====")
            })
        }
        catch (error) {
            console.log('Socket is not initialized', error);
        }
    }

    emit(event, data = {}) {
        this.socket.emit(event, data)
    }
    on(event, cb) {
        this.socket.on(event, cb)
    }
    removeListner(listnerName) {
        this.socket.removeListner(listnerName)
    }
    offListner(eventName) {
        this.socket.off(eventName)
    }
}

const socketServices = new WSService()

export default socketServices