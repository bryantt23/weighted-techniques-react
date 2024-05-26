import axios from "axios";

export async function getTechniques() {
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
