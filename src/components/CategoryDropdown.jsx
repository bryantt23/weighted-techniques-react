import React from 'react'

function CategoryDropdown({ techniques, setCategory, category }) {
    const categories = ["All", ...Array.from(new Set(techniques.map(technique => technique.category)))]

    const handleChange = (event) => {
        setCategory(event.target.value)
    }

    return (
        <div>
            <select value={category} onChange={handleChange} >
                {categories.map(categoryCur => <option key={categoryCur} value={categoryCur}>{categoryCur}</option>)}
            </select>
        </div>
    )
}

export default CategoryDropdown