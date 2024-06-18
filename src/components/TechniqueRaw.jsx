import React, { useState } from 'react'

function TechniqueRaw({ technique, index }) {
    const [showDescription, setShowDescription] = useState(false)
    const { name, weight, description } = technique

    return (
        <div>
            {index + 1}. {name} ({weight})
            {description && <span>{" "}
                <button onClick={() => setShowDescription(!showDescription)}>{showDescription ? "Hide" : "Show"} Description</button>
            </span>}
            {showDescription && description}
        </div>
    )
}

export default TechniqueRaw