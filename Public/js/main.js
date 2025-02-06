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
        const response = await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        document.querySelector("#responseMessage").textContent = data.message;
    } catch (error) {
        document.querySelector("#responseMessage").textContent = "Error sending email!";
    }
});
