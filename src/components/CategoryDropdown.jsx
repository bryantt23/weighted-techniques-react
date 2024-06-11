import React from 'react'
import "./CategoryDropdown.css"

function CategoryDropdown({ techniques, setCategory, category }) {
    const categories = ["All", ...Array.from(new Set(techniques.map(technique => technique.category)))]

    const handleChange = (event) => {
        setCategory(event.target.value)
    }

    return (
        <div className="category-dropdown-container">
            <div className="category-dropdown">
                <select value={category} onChange={handleChange} >
                    {categories.map(categoryCur => <option key={categoryCur} value={categoryCur}>{categoryCur}</option>)}
                </select>
            </div>
        </div>
    )
}

export default CategoryDropdown