import { useState, forwardRef } from 'react'
import { handleLike } from '../services/techniquesApi'

const HIGHLIGHTED_CLASS_NAME = "current";

const Technique = forwardRef(({ technique }, ref) => {
  const [showDescription, setShowDescription] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { name, weight, description, _id, isHighlighted } = technique

  const toggleDescription = () => {
    setShowDescription(prev => !prev)
  }

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    console.log('Like button clicked for:', _id);
    try {
      await handleLike(_id)
      setIsLiked(true)
      setTimeout(() => {
        setIsLiked(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }

  return (<li
    ref={ref}
    key={_id} className={isHighlighted ? HIGHLIGHTED_CLASS_NAME : ""}
    onClick={toggleDescription}>
    <div>
      {name} ({weight})
    </div>
    {(description && showDescription) && <p className="description">{description}</p>}
    <button
      className={`like-btn ${isLiked && "liked"}`}
      disabled={isLiked}
      onClick={handleLikeClick}>
      {isLiked ? "Like 👍" : "Like"}
    </button>
    {description && <button className="toggle-btn toggle" >Show Description</button>}
  </li>)
})

Technique.displayName = "Technique"

export default Technique
