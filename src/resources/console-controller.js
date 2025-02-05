class ConsoleController {
    constructor(title, width, height, maxHistory=3, bgColor = "#202020", bgTitleColor = "#00008B", titleColor="#FFFFFF") {
        this.title = title;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.bgTitleColor = bgTitleColor;
        this.titleColor = titleColor;
        this.maxHistory = maxHistory;

        this.createConsoleElement();
    }

    createConsoleElement() {
        // Create console container element
        this.consoleElement = document.createElement("div");    
        this.consoleElement.style.width = `${this.width}px`;
        this.consoleElement.style.height = `${this.height}px`;
        this.consoleElement.style.backgroundColor = this.bgColor;   
        this.consoleElement.style.color = this.titleColor;
        this.consoleElement.style.overflowY = "auto";
        this.consoleElement.style.fontFamily = "monospace";
        this.consoleElement.style.border = "2px solid #333";
        this.consoleElement.style.borderRadius = "8px";

        // Create title element for console
        this.titleElement = document.createElement("div");
        this.titleElement.innerText = this.title;
        this.titleElement.style.backgroundColor = this.bgTitleColor;
        this.titleElement.style.color = this.titleColor;
        this.titleElement.style.padding = "4px";
        this.titleElement.style.textAlign = "center";

        // Create message container element
        this.messageContainer = document.createElement("div");
        this.messageContainer.style.padding = "10px";

        // Append elements to console container
        this.consoleElement.appendChild(this.titleElement);
        this.consoleElement.appendChild(this.messageContainer);

        // Append console container to body of the html
        document.body.appendChild(this.consoleElement);
    }

    addMessage(message, color) {
        // Create message element
        const messageElement = document.createElement("div");
        messageElement.style.padding = "4px";

        messageElement.innerHTML = `<span style="color: white;">&gt; </span><span style="color: ${color};">${message}</span>`;

        // Append message element to message container
        this.messageContainer.appendChild(messageElement);

        // Check if message container has more messages than the maximum history
        if (this.messageContainer.children.length > this.maxHistory) {
            this.messageContainer.removeChild(this.messageContainer.children[0]);
        }

        // Scroll to the bottom of the message container
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    addInfo(message) {
        this.addMessage(message, "#FFFFFF"); 
    }

    addWarning(message) {
        this.addMessage(message, "#FFFF00");
    }

    addError(message) {
        this.addMessage(message, "#FF0000"); 
    }

    addSuccess(message) {
        this.addMessage(message, "#00FF00");
    }
}
