import { useEffect, useState } from 'react'
import './Techniques.css'
import { getTechniques } from '../services/techniques'

function Techniques() {
  const [techniques, setTechniques] = useState([])

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

  return (
    <div className="container">
      <h1>Smash the automatic thought techniques</h1>
      <ul className="techniques"></ul>
      <button className="more">Get More Techniques</button>
      <button className="reset">Start over</button>
      {JSON.stringify(techniques)}
    </div>
  )
}

export default Techniques
