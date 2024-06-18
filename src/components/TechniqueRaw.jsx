import React, { useState } from 'react'

function TechniqueRaw({ technique, index }) {
    const [showDescription, setShowDescription] = useState(false)
    const { name, weight, description, _id } = technique

    return (
        <div>
            {index + 1}. {name} ({weight}) <button onClick={() => setShowDescription(!showDescription)}>{showDescription ? "Hide" : "Show"} Description</button>
            {showDescription && description}
        </div>
    )
}

export default TechniqueRaw