import { useEffect, useRef, useState } from 'react'
import { loadCurrentTechniques } from '../services/techniquesApi'
import CategoryDropdown from './CategoryDropdown'
import TechniqueRaw from './TechniqueRaw'

function TechniquesListRaw() {
    const [techniques, setTechniques] = useState([])
    const [techniquesDisplayed, setTechniquesDisplayed] = useState([])
    const ref = useRef(null)
    const scrollButtonRef = useRef(null)
    const [category, setCategory] = useState("All")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const techniquesFromApi = await loadCurrentTechniques()
                console.log("🚀 ~ fetchData ~ techniquesFromApi:", techniquesFromApi)
                setTechniques(techniquesFromApi)
                setTechniquesDisplayed(techniquesFromApi)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
        window.addEventListener("scroll", scrollFunction)
        return () => {
            window.removeEventListener("scroll", scrollFunction)
        }
    }, [])

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollButtonRef.current.style.display = "block"
        }
        else {
            scrollButtonRef.current.style.display = "none"
        }
    }

    function topFunction() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        setTechniquesDisplayed([])
        if (category === "All") {
            setTechniquesDisplayed([...techniques])
        }
        else {
            const filteredTechniques = techniques.filter(technique => technique.category === category)
            setTechniquesDisplayed([...filteredTechniques])
        }
    }, [category])

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [techniquesDisplayed])

    return (
        <div className="container">
            <h1>Smash the automatic thought techniques</h1>

            <CategoryDropdown techniques={techniques} setCategory={setCategory} category={category} />
            <p>{techniquesDisplayed.length} techniques found</p>
            <ul className="techniques">
                {techniquesDisplayed.map((technique, index) => <TechniqueRaw key={technique._id} technique={technique} index={index} />)}
            </ul>
            <button className="go-to-top" onClick={topFunction} ref={scrollButtonRef}>Go to Top</button>
        </div>
    )
}

export default TechniquesListRaw
