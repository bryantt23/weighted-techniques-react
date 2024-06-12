import { useEffect, useState, useRef } from 'react'
import './Techniques.css'
import { loadCurrentTechniques } from '../services/techniquesApi'
import { weightedRandomSamplingUntilEmpty } from '../services/techniquesHelper'
import Technique from './Technique'
import CategoryDropdown from './CategoryDropdown'

const PAGE_SIZE = 7;

function Techniques() {
  const [techniques, setTechniques] = useState([])
  const [techniquesWithWeightedRandomization, setTechniquesWithWeightedRandomization] = useState([])
  const [techniquesWithWeightedRandomizationCategorized, setTechniquesWithWeightedRandomizationCategorized] = useState([])
  const [techniquesDisplayed, setTechniquesDisplayed] = useState([])
  const [curPos, setCurPos] = useState(0)
  const [firstItemElementId, setFirstItemElementId] = useState()
  const ref = useRef(null)
  const [category, setCategory] = useState("All")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const techniquesFromApi = await loadCurrentTechniques()
        setTechniques(techniquesFromApi)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (techniques.length > 0) {
      const shuffledTechniques = weightedRandomSamplingUntilEmpty([...techniques]).map(technique => ({ ...technique, isHighlighted: false }))
      setTechniquesWithWeightedRandomization(shuffledTechniques)
    }
  }, [techniques])

  useEffect(() => {
    setCurPos(0)
    setTechniquesDisplayed([])
    if (category === "All") {
      setTechniquesWithWeightedRandomizationCategorized([...techniquesWithWeightedRandomization])
    }
    else {
      const filteredTechniques = techniquesWithWeightedRandomization.filter(technique => technique.category === category)
      setTechniquesWithWeightedRandomizationCategorized([...filteredTechniques])
    }
  }, [category, techniquesWithWeightedRandomization])

  useEffect(() => {
    if (techniquesWithWeightedRandomizationCategorized.length > 0 && techniquesDisplayed.length === 0) {
      displayMoreTechniques()
    }
  }, [techniquesWithWeightedRandomizationCategorized])

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [techniquesDisplayed])

  const displayMoreTechniques = () => {
    const endPos = Math.min(curPos + PAGE_SIZE, techniquesWithWeightedRandomizationCategorized.length);
    const currentTechniquesRemovedHighlighting = techniquesDisplayed.map(technique => ({ ...technique, isHighlighted: false }))
    const nextTechniques = techniquesWithWeightedRandomizationCategorized.slice(curPos, endPos).map(technique => ({ ...technique, isHighlighted: true }))
    if (nextTechniques.length > 0) {
      setFirstItemElementId(nextTechniques[0]._id)
      setTechniquesDisplayed([...currentTechniquesRemovedHighlighting, ...nextTechniques])
      setCurPos(endPos);
    }
  }

  const reshuffleTechniques = () => {
    setCurPos(0)
    setTechniquesDisplayed([])
    setTechniques([...techniques])
  }

  return (
    <div className="container">
      <h1>Smash the automatic thought techniques</h1>

      <CategoryDropdown techniques={techniques} setCategory={setCategory} category={category} />
      <ul className="techniques">
        {techniquesDisplayed.map(technique =>
          <Technique
            key={technique._id}
            technique={technique}
            ref={firstItemElementId === technique._id ? ref : null}
          />)}
      </ul>
      <button className="more" onClick={displayMoreTechniques}>Get More Techniques</button>
      <button className="reset" onClick={reshuffleTechniques}>Start over</button>
    </div>
  )
}

export default Techniques
