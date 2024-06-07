import axios from "axios";

export async function loadCurrentTechniques() {
    try {
        const techniquesFromApi = await getTechniques(); // Attempt to load from API
        return techniquesFromApi
    } catch (apiError) {
        console.error("Failed to fetch techniques from API:", apiError);
        try {
            const techniquesFromLocalStorage = await fetchFromLocalStorage(); // Fallback to local storage
            return techniquesFromLocalStorage
        } catch (localStorageError) {
            console.error("Failed to fetch techniques from local storage:", localStorageError);
            throw new Error("No techniques available offline or online.");
        }
    }
}

function fetchFromLocalStorage() {
    try {
        const storedData = localStorage.getItem("techniques")
        if (!storedData) {
            throw new Error("No data found in local storage")
        }
        return JSON.parse(storedData)
    } catch (error) {
        console.error("Error fetching from local storage:", error);
        throw error;  // Re-throw to handle it in the main logic
    }
}

async function getTechniques() {
    try {
        const response = await axios.get("https://thought-techniques-api-git-main-bryantt23s-projects.vercel.app/techniques")
        const { data } = response
        localStorage.setItem("techniques", JSON.stringify(data)); // Cache new data
        return data
    } catch (error) {
        console.error("Error fetching from API:", error);
        throw error;  // Re-throw to handle it in the main logic or another helper
    }
}

export async function handleLike(id) {
    try {
        const response = await axios(`https://thought-techniques-api-git-main-bryantt23s-projects.vercel.app/techniques/${id}`, {
            method: 'PATCH',  // Specify the method
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const { data } = response
        console.log("Data updated from API:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}
