/**
 * Class representing a console for displaying messages.
 */
class ConsoleController {
    /**
     * Creates an instance of ConsoleController.
     * @param {string} htmlElement - The ID of the container where the console will be attached.
     * @param {string} title - The title of the console.
     * @param {number} width - The width of the console in pixels.
     * @param {number} height - The height of the console in pixels.
     * @param {number} [maxHistory=100] - The maximum number of messages before old ones are removed.
     * @param {string} [bgColor="#202020"] - Background color of the console.
     * @param {string} [bgTitleColor="#00008B"] - Background color of the title bar.
     * @param {string} [titleColor="#FFFFFF"] - Text color of the title.
     */
    constructor(htmlElement, title, width, height, maxHistory = 100, marginLeft="0px", marginTop="0px", bgColor = "#D9D9D9", bgTitleColor = "#021D32", titleColor = "#FFFFFF") {
        this.title = title;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.bgTitleColor = bgTitleColor;
        this.titleColor = titleColor;
        this.maxHistory = maxHistory;
        this.htmlElement = htmlElement;
        this.marginLeft = marginLeft;
        this.marginTop = marginTop;

        this._createConsoleElement();
    }

    /**
     * Creates and initializes the console UI elements.
     * @private
     */
    _createConsoleElement() {
        const container = document.getElementById(this.htmlElement);
        if (!container) {
            console.error(`Container with ID '${this.htmlElement}' not found.`);
            return;
        }

        // Create console container element
        this.consoleElement = document.createElement("div");
        this.consoleElement.style.width = `${this.width}px`;
        this.consoleElement.style.height = `${this.height}px`;
        this.consoleElement.style.backgroundColor = this.bgColor;
        this.consoleElement.style.fontFamily = "monospace";
        this.consoleElement.style.border = "2px solid #333";
        this.consoleElement.style.borderRadius = "4px";
        this.consoleElement.style.overflow = "hidden";
        this.consoleElement.style.marginLeft = this.marginLeft;
        this.consoleElement.style.marginTop = this.marginTop;

        // Create title element for console
        this.titleElement = document.createElement("div");
        this.titleElement.style.fontFamily = "'Lato', sans-serif";
        this.titleElement.style.fontSize = "20px"; 
        this.titleElement.innerText = this.title;
        this.titleElement.style.backgroundColor = this.bgTitleColor;
        this.titleElement.style.color = this.titleColor;
        this.titleElement.style.padding = "8px";
        this.titleElement.style.textAlign = "left"; 
        this.titleElement.style.paddingLeft = "10px";

        // Create scrollable message container element
        this.messageContainer = document.createElement("div");
        this.messageContainer.style.padding = "10px";
        this.messageContainer.style.height = `${this.height - 60}px`;
        this.messageContainer.style.overflowY = "auto";
        this.messageContainer.style.scrollbarWidth = "none"; //hides scrollbar

        // Append elements to console container
        this.consoleElement.appendChild(this.titleElement);
        this.consoleElement.appendChild(this.messageContainer);

        // Append console container to the HTML
        container.appendChild(this.consoleElement);
    }

    /**
     * Adds a message to the console.
     * @param {string} message - The message text.
     * @param {string} color - The color of the message text.
     * @private
     */
    _addMessage(message, color) {
        // Create message element
        const messageElement = document.createElement("div");
        messageElement.style.padding = "5px";

        // Set font family and size of messages
        messageElement.style.fontFamily = "'Lato', sans-serif"; // Fuente Lato
        messageElement.style.fontSize = "20px"; // Tamaño de fuente 20px

        // Format message with ">" in white and the text in the given color
        messageElement.textContent = `> ${message}`;
        messageElement.style.color = color;

        // Append message element to message container
        this.messageContainer.appendChild(messageElement);

        // Check if message container exceeds maxHistory and remove the oldest
        if (this.messageContainer.children.length > this.maxHistory) {
            this.messageContainer.removeChild(this.messageContainer.children[0]);
        }

        // Scroll to the bottom of the message container
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    /**
     * Adds an info message in white to the console.
     * @param {string} message - The message text.
     */
    addInfo(message) {
        this._addMessage(message, "#000000");
    }

    /**
     * Adds a warning message in yellow to the console.
     * @param {string} message - The message text.
     */
    addWarning(message) {
        this._addMessage(message, "#D0B933");
    }

    /**
     * Adds an error message in red to the console.
     * @param {string} message - The message text.
     */
    addError(message) {
        this._addMessage(message, "#FF0035");
    }

    /**
     * Adds a success message in green to the console.
     * @param {string} message - The message text.
     */
    addSuccess(message) {
        this._addMessage(message, "#4D8B31");
    }
}
