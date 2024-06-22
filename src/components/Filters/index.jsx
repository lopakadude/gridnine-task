import styles from './styles.module.css';
import { finalPrice } from '../../utils/finalPrice';
import { useState } from 'react';

export default function Filters({
  currentFlights,
  setCurrentFlights,
  allFlights,
  setSortingByPriceandTime,
}) {
  const [filteredCompaniesByName, setFilteredCompaniesByName] = useState([]);

  async function sortingByMinPrice(evt) {
    if (
      evt.target.valueAsNumber >= minPrice() &&
      evt.target.valueAsNumber <= maxPrice()
    ) {
      const res = currentFlights.filter(
        (currentFlight) => finalPrice(currentFlight) >= evt.target.value
      );
      setCurrentFlights(res);
    }
  }

  async function sortingByMaxPrice(evt) {
    if (
      evt.target.valueAsNumber >= minPrice() &&
      evt.target.valueAsNumber <= maxPrice()
    ) {
      const res = currentFlights.filter(
        (currentFlight) => finalPrice(currentFlight) <= evt.target.value
      );
      setCurrentFlights(res);
    }
    console.log(evt.target.valueAsNumber);
  }

  async function sortingByName(company) {
    if (!filteredCompaniesByName.includes(company)) {
      const res = currentFlights.filter(
        (flight) => flight.flight.carrier.caption === company
      );
      if (filteredCompaniesByName.length < 1) {
        await setCurrentFlights(res);
        await setFilteredCompaniesByName([company]);
      } else {
        await setCurrentFlights(currentFlights.concat(res));
        await setFilteredCompaniesByName([...filteredCompaniesByName, company]);
      }
    } else {
      const res = currentFlights.filter(
        (flight) => flight.flight.carrier.caption !== company
      );
      if (filteredCompaniesByName.length < currentFlights.length) {
        await setCurrentFlights(res);
        console.log('ok');
      }
      await setFilteredCompaniesByName(
        filteredCompaniesByName.filter(
          (filteredCompany) => filteredCompany !== company
        )
      );
    }
  }

  const minPrice = () => {
    const min = Math.min(
      ...currentFlights.map((currentFlight) => finalPrice(currentFlight))
    );
    return min;
  };
  const maxPrice = () => {
    const max = Math.max(
      ...currentFlights.map((currentFlight) => finalPrice(currentFlight))
    );
    return max;
  };

  function allCompanies() {
    let companies = [];
    allFlights.map((flight) => {
      if (!companies.includes(flight.flight.carrier.caption)) {
        companies.push(flight.flight.carrier.caption);
      } else null;
    });
    return companies;
  }

    function currentCompanies() {
    let companies = [];
    currentFlights.map((flight) => {
      if (!companies.includes(flight.flight.carrier.caption)) {
        companies.push(flight.flight.carrier.caption);
      } else null;
    });
    return companies;
  }

  function minPriceOfCompany(company) {
    const flightsOfCompany = allFlights.filter(
      (currentFlight) => currentFlight.flight.carrier.caption === company
    );
    const min = Math.min(
      ...flightsOfCompany.map((currentFlight) => finalPrice(currentFlight))
    );
    return min;
  }

  function sortingByQuantityTransfers(number) {
    if (number === 1) {
      const res = allFlights.filter(
        (currentFlight) =>
          currentFlight.flight.legs[0].segments.length +
            currentFlight.flight.legs[1].segments.length ===
          3
      );
      setCurrentFlights(res);
    }
    if (number === 2) {
      const res = allFlights.filter(
        (currentFlight) =>
          currentFlight.flight.legs[0].segments.length +
            currentFlight.flight.legs[1].segments.length >
          3
      );
      setCurrentFlights(res);
    }
    if (number === 0) {
      const res = allFlights.filter(
        (currentFlight) =>
          currentFlight.flight.legs[0].segments.length === 1 &&
          currentFlight.flight.legs[1].segments.length === 1
      );
      setCurrentFlights(res);
    }
  }

  async function sortingByIncreasePrice() {
    const res = currentFlights.sort((a, b) => finalPrice(a) - finalPrice(b));
    await setSortingByPriceandTime(1);
    await setCurrentFlights(res);
  }

  async function sortingByDecreasePrice() {
    const res = currentFlights.sort((a, b) => finalPrice(b) - finalPrice(a));
    await setSortingByPriceandTime(2);
    await setCurrentFlights(res);
  }

  async function sortingByIncreaseTime() {
    const res = currentFlights.sort(
      (a, b) =>
        a.flight.legs[0].duration +
        a.flight.legs[1].duration -
        b.flight.legs[0].duration -
        b.flight.legs[1].duration
    );
    await setSortingByPriceandTime(3);
    await setCurrentFlights(res);
  }

  const disabledCompany =(company) => {
    if (!currentCompanies().includes(company)) {
      return true;
    } else return false;
  }

  return (
    <form className={styles.filtersForm}>
      <ul className={styles.filtersForm__filtersList}>
        <li className={styles.filtersForm__filter}>
          <h2 className={styles.filtersForm__filterTitle}>Сортировать</h2>
          <div>
            <input
              type="radio"
              name="sort"
              onChange={() => sortingByIncreasePrice()}
            />
            <span>- сначала дешевле</span>
          </div>
          <div>
            <input
              type="radio"
              name="sort"
              onChange={() => sortingByDecreasePrice()}
            />
            <span>- сначала дороже</span>
          </div>
          <div>
            <input
              type="radio"
              name="sort"
              onChange={() => sortingByIncreaseTime()}
            />
            <span>- по времени в пути</span>
          </div>
        </li>
        <li className={styles.filtersForm__filter}>
          <h2 className={styles.filtersForm__filterTitle}>Фильтровать</h2>
          <div>
            <input
              type="radio"
              name="transfer"
              onChange={() => sortingByQuantityTransfers(1)}
            />
            <span>- с 1 пересадкой</span>
          </div>
          <div>
            <input
              type="radio"
              name="transfer"
              onChange={() => sortingByQuantityTransfers(2)}
            />
            <span>- с 2 пересадками</span>
          </div>
          <div>
            <input
              type="radio"
              name="transfer"
              onChange={() => sortingByQuantityTransfers(0)}
            />
            <span>- без пересадок</span>
          </div>
        </li>
        <li className={styles.filtersForm__filter}>
          <h2 className={styles.filtersForm__filterTitle}>Цена</h2>
          <div className="">
            <span>от </span>
            <input
              placeholder={currentFlights.length > 0 ? minPrice() : 0}
              type="number"
              min={minPrice()}
              onChange={(evt) => sortingByMinPrice(evt)}
            />
          </div>
          <div className="">
            <span>до </span>
            <input
              placeholder={currentFlights.length > 0 ? maxPrice() : 0}
              type="number"
              max={maxPrice()}
              onChange={(evt) => sortingByMaxPrice(evt)}
            />
          </div>
        </li>
        <li className={styles.filtersForm__filter}>
          <h2 className={styles.filtersForm__filterTitle}>Авиакомпании</h2>
          <ul className={styles.filtersForm__companies}>
            {allCompanies().map((company) => (
              <li key={company}>
                <input
                  type="checkbox"
                  onChange={() => {
                    sortingByName(company);
                  }}
                  disabled={disabledCompany(company)}
                />
                {company}
                <span> от {minPriceOfCompany(company)} р.</span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </form>
  );
}
