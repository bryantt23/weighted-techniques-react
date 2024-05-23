import { useState } from 'react'

const HIGHLIGHTED_CLASS_NAME = "current";
function Technique({ technique }) {
  const [showDescription, setShowDescription] = useState(false)
  const { name, weight, description, _id } = technique

  const toggleDescription = () => {
    setShowDescription(prev => !prev)
  }

  const handleLikeClick = (e) => {
    e.stopPropagation();
    console.log('Like button clicked for:', _id);
  }

  return (<li key={_id} className={HIGHLIGHTED_CLASS_NAME} onClick={toggleDescription}>
    <div>
      {name} ({weight})
    </div>
    {(description && showDescription) && <p className="description">{description}</p>}
    <button className="like-btn" onClick={handleLikeClick}>Like</button>
    {description && <button className="toggle-btn toggle" >Show Description</button>}
  </li>)
}


export default Technique
