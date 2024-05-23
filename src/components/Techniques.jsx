import { useEffect, useState } from 'react'
import './Techniques.css'
import { getTechniques } from '../services/techniquesApi'
import { weightedRandomSamplingUntilEmpty } from '../services/techniquesHelper'

const PAGE_SIZE = 16;
const HIGHLIGHTED_CLASS_NAME = "current";

function Techniques() {
  const [techniques, setTechniques] = useState([])
  const [techniquesWithWeightedRandomization, setTechniquesWithWeightedRandomization] = useState([])
  const [techniquesDisplayed, setTechniquesDisplayed] = useState([])
  const [curPos, setCurPos] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const techniquesFromApi = await getTechniques()
        setTechniques(techniquesFromApi)
      } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (techniques.length > 0) {
      console.log("🚀 ~ Techniques ~ techniques:", techniques)
      const shuffledTechniques = weightedRandomSamplingUntilEmpty(techniques)
      setTechniquesWithWeightedRandomization(shuffledTechniques)
      getMoreTechniques()
    }
  }, [techniques])

  function getMoreTechniques() {
    const endPos = Math.min(curPos + PAGE_SIZE, techniquesWithWeightedRandomization.length);
    console.log("🚀 ~ getMoreTechniques ~ techniquesWithWeightedRandomization:", techniquesWithWeightedRandomization)

    setTechniquesDisplayed(prev => [...prev, ...techniquesWithWeightedRandomization.slice(curPos, endPos)])
    setCurPos(endPos);
  }

  return (
    <div className="container">
      <h1>Smash the automatic thought techniques</h1>
      <ul className="techniques">
        {techniquesDisplayed.map(({ name, weight, description, _id }) => {
          let descriptionBtn, descriptionElement;
          if (description) {
            descriptionBtn = <button className="toggle-btn toggle">Show Description</button>
            descriptionElement = <p className="description">{description}</p>
          }

          return (<li key={_id} className={HIGHLIGHTED_CLASS_NAME}>
            <div>
              {name} ({weight})
            </div>
            <button className="like-btn">Like</button>{description && descriptionBtn}
          </li>)
        }
        )}
      </ul>
      <button className="more">Get More Techniques</button>
      <button className="reset">Start over</button>
      {/* TODO create Technique component */}
      {JSON.stringify(techniquesDisplayed.length)}
      {JSON.stringify(techniquesDisplayed)}
    </div>
  )
}

export default Techniques
