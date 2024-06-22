import styles from './styles.module.css';
import Flight from '../Flight';
import { useEffect, useState } from 'react';

export default function FlightsList({ currentFlights, sortingByPriceandTime }) {
  const [visibleFlights, setVisibleFlights] = useState(3);

  useEffect(() => {}, [currentFlights, sortingByPriceandTime]);
  return (
    <div className={styles.flightListContainer}>
      {currentFlights.length === 0 ? (
        <p>По вашему запросу ничего не найдено</p>
      ) : (
        <ul className={styles.flightList}>
          {currentFlights.map((currentFlight, index) => {
            if (index < visibleFlights) {
              return (
                <Flight
                  key={currentFlight.flightToken}
                  currentFlight={currentFlight}
                />
              );
            }
          })}
        </ul>
      )}

      {currentFlights.length > visibleFlights && (
        <button
          className={styles.showMore}
          onClick={() => setVisibleFlights(visibleFlights + 3)}
        >
          Показать еще
        </button>
      )}
    </div>
  );
}
