
import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFecht from './hooks/UseFecht'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/residentCard'
import './components/styles/ResidentCard.css'
import './components/styles/LocationCards.css'



function App() {
  const locationId = getRandomNumber(126)
  const [inputValue, setInputValue] = useState(locationId)
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [location, getLocation, hasError] = useFecht(url)


  useEffect(() => {
    getLocation()
  }, [inputValue])

  const inputLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputLocation.current.value)
  }

  return (
    <div>
      <img className='header__img' src="https://c8.alamy.com/compes/p4jaap/el-titulo-de-la-pelicula-original-rick-y-morty-titulo-en-ingles-rick-y-morty-el-director-de-cine-dan-harmon-justin-roiland-ano-2013-credito-adult-swim-album-p4jaap.jpg" alt="" />
     
      <form className='header__form' onSubmit={handleSubmit}>
        <input ref={inputLocation} type="text" />
        <button>Search</button>
      </form>
      {
        hasError
          ? <h2 className='resident__error'>❌ Hey! you must provide an id from 1 to 126 😞 </h2>
          : (
            <>
              <LocationCard 
                location={location}
              />

              <div className='resident__container'>
                {
                  location?.residents.map(url => (
                    < ResidentCard
                      key={url}
                      url={url}
                    />
                  ))
                }
              </div>
            </>
          )
      }


    </div>
  )
}

export default App
