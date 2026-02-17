document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("loadUsers");
    const userContainer = document.getElementById("userContainer");
    const errorMessage = document.getElementById("errorMessage");

    
    button.addEventListener("click", fetchUsers);

    async function fetchUsers() {
        try {
            userContainer.innerHTML = "";
            errorMessage.textContent = "";

            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) throw new Error("Failed to fetch users");

            const users = await response.json();
            displayUsers(users);

        } catch (error) {
            errorMessage.textContent = "Error loading users.";
            console.error(error);
        }
    }

    function displayUsers(users) {
        users.forEach((user, index) => {
            const card = document.createElement("div");
            card.classList.add("user-card", "slide-in");
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">${user.name}</div>
                    <div class="card-back">
                        <p>Email: ${user.email}</p>
                        <p>City: ${user.address.city}</p>
                    </div>
                </div>
            `;

            
            let avoidTimeout;
            card.addEventListener("mouseenter", () => {
                if (Math.random() < 0.25) {
                    card.classList.add("avoiding");
                    clearTimeout(avoidTimeout);
                    avoidTimeout = setTimeout(() => {
                        card.classList.remove("avoiding");
                    }, 400);
                }
            });

            
            card.addEventListener("click", () => {
                if (!card.classList.contains("avoiding")) {
                    card.classList.toggle("active"); 
                }
            });

            userContainer.appendChild(card);
        });
    }
});