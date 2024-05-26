import { useState, forwardRef } from 'react'

const HIGHLIGHTED_CLASS_NAME = "current";

const Technique = forwardRef(({ technique }, ref) => {
  const [showDescription, setShowDescription] = useState(false)
  const { name, weight, description, _id, isHighlighted } = technique

  const toggleDescription = () => {
    setShowDescription(prev => !prev)
  }

  const handleLikeClick = (e) => {
    e.stopPropagation();
    console.log('Like button clicked for:', _id);
  }

  return (<li
    ref={ref}
    key={_id} className={isHighlighted ? HIGHLIGHTED_CLASS_NAME : ""}
    onClick={toggleDescription}>
    <div>
      {name} ({weight})
    </div>
    {(description && showDescription) && <p className="description">{description}</p>}
    <button className="like-btn" onClick={handleLikeClick}>Like</button>
    {description && <button className="toggle-btn toggle" >Show Description</button>}
  </li>)
})

Technique.displayName = "Technique"

export default Technique
