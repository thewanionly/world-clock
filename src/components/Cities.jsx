import CityCard from './CityCard'
import Button from './Button'

const Cities = ({ baseCity, cities = [], handleShowModal }) => {
  return (
    <section className='cities'>
      <div className='container cities__container'>
        <Button
          className='cities__add-button button__primary'
          onClick={() => handleShowModal('add')}
          disabled={cities.length >= 4}
        >
          Add city
        </Button>
        <div className='cities__city-list' data-testid='city-list'>
          {cities.map((city) => (
            <CityCard
              key={city.timezone}
              className='cities__city-item'
              city={city}
              baseCity={baseCity}
              handleShowModal={handleShowModal}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cities
