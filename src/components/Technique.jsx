import { useState } from 'react'

const HIGHLIGHTED_CLASS_NAME = "current";
function Technique({ technique }) {
  const [showDescription, setShowDescription] = useState(false)
  const { name, weight, description, _id } = technique
  let descriptionBtn, descriptionElement;
  if (description) {
    descriptionBtn = <button className="toggle-btn toggle">Show Description</button>
    descriptionElement = <p className="description">{description}</p>
  }

  const toggleDescription = () => {

  }

  const handleLikeClick = (e) => {
    e.stopPropagation();
    console.log('Like button clicked for:', _id);
  }

  return (<li key={_id} className={HIGHLIGHTED_CLASS_NAME} onClick={() => setShowDescription(!showDescription)}>
    <div>
      {name} ({weight})
    </div>
    {showDescription && descriptionElement}
    <button className="like-btn" onClick={handleLikeClick}>Like</button>{description && descriptionBtn}
  </li>)
}


export default Technique
