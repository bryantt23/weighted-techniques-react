import axios from "axios";

export async function getTechniques() {
    try {
        const response = await axios.get("https://thought-techniques-api-git-main-bryantt23s-projects.vercel.app/techniques")
        const { data } = response
        console.log("Data fetched from API:", data);
        localStorage.setItem("techniques", JSON.stringify(data)); // Cache new data
        return data
    } catch (error) {
        console.error("Error fetching from API:", error);
        throw error;  // Re-throw to handle it in the main logic or another helper
    }
}