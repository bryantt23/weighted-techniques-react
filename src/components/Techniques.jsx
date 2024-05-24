import { useEffect, useState } from 'react'
import './Techniques.css'
import { getTechniques } from '../services/techniquesApi'
import { weightedRandomSamplingUntilEmpty } from '../services/techniquesHelper'
import Technique from './Technique'

const PAGE_SIZE = 3;

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
      const shuffledTechniques = weightedRandomSamplingUntilEmpty(techniques).map(technique => ({ ...technique, isHighlighted: false }))
      console.log("🚀 ~ useEffect ~ shuffledTechniques:", shuffledTechniques)
      setTechniquesWithWeightedRandomization(shuffledTechniques)
      getMoreTechniques()
    }
  }, [techniques])

  function getMoreTechniques() {
    const endPos = Math.min(curPos + PAGE_SIZE, techniquesWithWeightedRandomization.length);
    console.log("🚀 ~ getMoreTechniques ~ techniquesWithWeightedRandomization:", techniquesWithWeightedRandomization)

    const currentTechniquesRemovedHighlighting = techniquesDisplayed.map(technique => ({ ...technique, isHighlighted: false }))
    const nextTechniques = techniquesWithWeightedRandomization.slice(curPos, endPos).map(technique => ({ ...technique, isHighlighted: true }))
    setTechniquesDisplayed([...currentTechniquesRemovedHighlighting, ...nextTechniques])
    setCurPos(endPos);
  }

  return (
    <div className="container">
      <h1>Smash the automatic thought techniques</h1>
      <ul className="techniques">
        {techniquesDisplayed.map(technique => <Technique key={technique._id} technique={technique} />)}
      </ul>
      <button className="more" onClick={getMoreTechniques}>Get More Techniques</button>
      <button className="reset">Start over</button>
    </div>
  )
}

export default Techniques
