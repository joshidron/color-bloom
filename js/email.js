// Initialize EmailJS with your API Key
(function() {
    emailjs.init("6kT55AamM6JAPlrOi"); // Your API Key
})();

function sendFeedbackEmail(formData) {
    // Your Service ID and Template ID
    const serviceID = "service_4761qvo";
    const templateID = "template_w9fbiqk"; // Your confirmed Template ID

    return emailjs.send(serviceID, templateID, {
        from_name: formData.name || "Anonymous User",
        from_email: formData.name, // Using name field as email (consider renaming to 'email' in your HTML)
        rating: formData.rating || "Not rated",
        feeling: formData.feeling || "No selection",
        favorite: formData.favorite || "Not specified",
        message: formData.message || "No message provided"
    });
}

// Optional: Make function globally available
window.sendFeedbackEmail = sendFeedbackEmail;