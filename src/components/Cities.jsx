import CityCard from './CityCard'

const Cities = ({ baseCity, cities = [], handleShowModal }) => {
  return (
    <section className='cities'>
      <div className='container cities__container'>
        <button
          className='cities__add-button'
          onClick={handleShowModal}
          disabled={cities.length >= 4}
        >
          Add city
        </button>
        <div className='cities__city-list' data-testid='city-list'>
          {cities.map((city) => (
            <CityCard
              key={city.timezone}
              className='cities__city-item'
              city={city}
              baseCity={baseCity}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cities
