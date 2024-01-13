
import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFecht from './hooks/useFecht'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'
import './components/styles/ResidentCard.css'
import './components/styles/LocationCards.css'
import Pagination from '@mui/material/Pagination';





function App() {
  const locationId = getRandomNumber(126)
  const [inputValue, setInputValue] = useState(locationId)

  const [page, setPage] = useState(1)
  const [totalResidents, setTotalResidents] = useState(0)
  const [limitResidents, setLimitResidents]=useState(9)

  


  const handleChange = (event, value) => {
    event.preventDefault()
    setPage(value)
  }
  
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [location, getLocation, hasError] = useFecht(url)

  

  const inputPagination= useRef()
  
  useEffect(() => {
    getLocation()
  }, [inputValue])

  const [residentes, setResidentes] = useState(location?.residents)

  useEffect(() => {
    setTotalResidents(location?.residents.length)
    
  }, [page, handleChange])
  
  useEffect(() => {
    const residents = location?.residents
  }, [inputPagination])
  console.log('-----------------');
  console.log(residentes);

  
  const inputLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputLocation.current.value)
  }
  let startIndex = (page - 1) * limitResidents; // Índice inicial del slice
  let endIndex = startIndex + limitResidents; // Índice final del slice
  let residents = location?.residents.slice(startIndex, endIndex) || [];
  console.log(limitResidents);

  

  const handlePagination=(event)=>{
    event.preventDefault()
    const inputValue = inputPagination.current.value
    console.log(inputPagination);
    setLimitResidents(parseInt(inputValue))
    setPage(1)
  }

  return (
    <div>
      <img className='header__img' src="https://c8.alamy.com/compes/p4jaap/el-titulo-de-la-pelicula-original-rick-y-morty-titulo-en-ingles-rick-y-morty-el-director-de-cine-dan-harmon-justin-roiland-ano-2013-credito-adult-swim-album-p4jaap.jpg" alt="" />
     <form className='header__form'>
      <input ref={inputPagination} type="text"/>
      <button onClick={handlePagination}>Residents</button>
     </form>

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
                residents?.map(url => (
                    < ResidentCard
                      key={url}
                      url={url}
                    />
                  ))
                }
              </div>
              <Pagination className='resident__pagination'
                count={parseInt(Math.ceil(totalResidents / limitResidents), 10)}
                page={page}
                onChange={handleChange} 
              />
            </>
          )
      }


    </div>
  )
}

export default App;
