import './styles/LocationCards.css'

const LocationCard = ({location}) => {
  return (
    <article className='location'>
      <h2 className="location__name">{location?.name}</h2>
      <ul className="location__list">
        <li className="location__item"><span>Type: </span><span className='location__value'>{location?.type}</span></li>
        <li className="location__item"><span>Dimension: </span><span className='location__value'>{location?.dimension}</span></li>
        <li className="location__item"><span>Population: </span><span className='location__value'>{location?.residents.length}</span></li>
   </ul>
    </article>
  )
}

export default LocationCard