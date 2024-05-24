import { useEffect, useState, useRef } from 'react'
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
  const [firstItemElementId, setFirstItemElementId] = useState()
  const ref = useRef(null)

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
      const shuffledTechniques = weightedRandomSamplingUntilEmpty(techniques).map(technique => ({ ...technique, isHighlighted: false }))
      console.log("🚀 ~ useEffect ~ shuffledTechniques:", shuffledTechniques)
      setTechniquesWithWeightedRandomization(shuffledTechniques)
    }
  }, [techniques])

  useEffect(() => {
    if (techniquesWithWeightedRandomization.length > 0 && techniquesDisplayed.length === 0) {
      console.log('hii')
      getMoreTechniques()
    }
  }, [techniquesWithWeightedRandomization])

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [techniquesDisplayed])

  const getMoreTechniques = () => {
    console.log("🚀 ~ getMoreTechniques ~ techniquesWithWeightedRandomization:", techniquesWithWeightedRandomization)

    const endPos = Math.min(curPos + PAGE_SIZE, techniquesWithWeightedRandomization.length);

    console.log("🚀 ~ getMoreTechniques ~ endPos:", endPos)
    const currentTechniquesRemovedHighlighting = techniquesDisplayed.map(technique => ({ ...technique, isHighlighted: false }))
    const nextTechniques = techniquesWithWeightedRandomization.slice(curPos, endPos).map(technique => ({ ...technique, isHighlighted: true }))
    console.log("🚀 ~ getMoreTechniques ~ nextTechniques:", nextTechniques)
    setFirstItemElementId(nextTechniques[0]._id)
    setTechniquesDisplayed([...currentTechniquesRemovedHighlighting, ...nextTechniques])
    setCurPos(endPos);
    // ref.current.scrollIntoView({
    //   behavior: "smooth"
    // })
  }

  return (
    <div className="container">
      <h1>Smash the automatic thought techniques</h1>
      <ul className="techniques">
        {techniquesDisplayed.map(technique =>
          <Technique
            key={technique._id}
            technique={technique}
            ref={firstItemElementId === technique._id ? ref : null}
          />)}
      </ul>
      <button className="more" onClick={getMoreTechniques}>Get More Techniques</button>
      <button className="reset">Start over</button>
    </div>
  )
}

export default Techniques
