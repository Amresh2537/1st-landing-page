document.querySelector("#contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: document.querySelector('input[name="name"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        email: document.querySelector('input[name="email"]').value,
        address: document.querySelector('input[name="address"]').value,
        comment: document.querySelector('textarea[name="comment"]').value
    };

    try {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        document.querySelector("#responseMessage").textContent = data.message;
        
        // Clear form after successful submission
        if (response.ok) {
            document.querySelector("#contactForm").reset();
        }
    } catch (error) {
        document.querySelector("#responseMessage").textContent = "Error sending email!";
    }
});
