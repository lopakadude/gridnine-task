import styles from './styles.module.css';
import Filters from '../Filters';
import FlightsList from '../FlightsList';
import data from '../../utils/mockData.json';
import { useEffect, useState } from 'react';

export default function App() {
  const flights = data.result.flights
  const [currentFlights, setCurrentFlights] = useState(flights);
    const [sortingByPriceandTime, setSortingByPriceandTime] = useState(0);
  return (
    <section className={styles.main}>
      <Filters
        currentFlights={currentFlights}
        allFlights={flights}
        setCurrentFlights={setCurrentFlights}
        setSortingByPriceandTime={setSortingByPriceandTime}
      />
      <FlightsList currentFlights={currentFlights} sortingByPriceandTime={sortingByPriceandTime}/>
    </section>
  );
}
