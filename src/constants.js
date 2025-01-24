class Constants {
    static get name() {
        return "SMOTTS DEVELOPER CONSOLE";
    }

    static get socket() {
        return io.connect("http://localhost:8000");
    }
}