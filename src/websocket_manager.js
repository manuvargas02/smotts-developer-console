class WebSocketManager {
    #ip;
    #port;
    constructor(ip, port) {
        this.#ip = ip;
        this.#port = port;
        this.socket = io.connect(`http://${this.#ip}:${this.#port}`);
    };
}
