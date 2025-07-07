// Form Submission with Validation
feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');
    const favorite = document.getElementById("favorite").value;
    const message = document.getElementById("message").value.trim();
    const feeling = emojiValueInput.value;

    if (!name) {
        alert("Please enter your email.");
        return;
    }
    if (!rating) {
        alert("Please rate how much fun you had.");
        return;
    }
    if (!feeling) {
        alert("Please select an emoji that best describes your feeling.");
        return;
    }
    if (!favorite) {
        alert("Please select your favorite thing.");
        return;
    }
    if (!message) {
        alert("Please tell us more about your experience.");
        return;
    }

    // Prepare form data
    const formData = {
        name: name,
        rating: rating.value,
        feeling: feeling,
        favorite: favorite,
        message: message
    };

    // Send email via EmailJS
    sendFeedbackEmail(formData)
        .then(() => {
            // Hide form and show Thank You message
            feedbackForm.style.display = "none";
            thankYouDiv.style.display = "block";
            
            // Create Confetti Celebration
            createConfetti();

            // Redirect to index.html after 5 seconds
            setTimeout(() => {
                window.location.href = "index.html";
            }, 5000);
        })
        .catch((error) => {
            console.error("Failed to send feedback:", error);
            alert("Oops! Something went wrong. Please try again later.");
        });
});