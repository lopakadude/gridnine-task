import styles from './styles.module.css';
import { finalPrice } from '../../utils/finalPrice';
import { formatDate } from '../../utils/formatDate';
import { toHoursAndMinutes } from '../../utils/toHoursAndMinutes';

export default function Flight({ currentFlight }) {

  const isTransfer = (way) =>
    currentFlight.flight.legs[way].segments.length > 1;

  function defineWay(info, way) {
    if (!isTransfer(way)) {
      if (info === 'departureCity') {
        return currentFlight.flight.legs[way].segments[0].departureCity.caption;
      }
      if (info === 'departureAirport') {
        return currentFlight.flight.legs[way].segments[0].departureAirport
          .caption;
      }
      if (info === 'departureAirportUid') {
        return currentFlight.flight.legs[way].segments[0].departureAirport.uid;
      }
      if (info === 'arrivalCity') {
        return currentFlight.flight.legs[way].segments[0].arrivalCity.caption;
      }
      if (info === 'arrivalAirport') {
        return currentFlight.flight.legs[way].segments[0].arrivalAirport
          .caption;
      }
      if (info === 'arrivalAirportUid') {
        return currentFlight.flight.legs[way].segments[0].arrivalAirport.uid;
      }
    }
    if (isTransfer(way)) {
      if (info === 'departureCity') {
        return currentFlight.flight.legs[way].segments[0].departureCity.caption;
      }
      if (info === 'departureAirport') {
        return currentFlight.flight.legs[way].segments[0].departureAirport
          .caption;
      }
      if (info === 'departureAirportUid') {
        return currentFlight.flight.legs[way].segments[0].departureAirport.uid;
      }
      if (info === 'arrivalCity') {
        return currentFlight.flight.legs[way].segments[1].arrivalCity.caption;
      }
      if (info === 'arrivalAirport') {
        return currentFlight.flight.legs[way].segments[1].arrivalAirport
          .caption;
      }
      if (info === 'arrivalAirportUid') {
        return currentFlight.flight.legs[way].segments[1].arrivalAirport.uid;
      }
    }
  }
  return (
    currentFlight && (
      <li className={styles.flight}>
        <div className={styles.flight__header}>
          <img src="" alt="logo" className={styles.flight__logo} />
          <div className={styles.flight__aboutPrice}>
            <p className={styles.flight__price}>
              {finalPrice(currentFlight)} &#8381;
            </p>
            <p className={styles.flight__quantity}>
              Стоимость для 1 взрослого пассажира
            </p>
          </div>
        </div>
        <div className={styles.flight__body}>
          <div className={styles.flight__transfer}>
            <p className={styles.flight__places}>
              <span className={styles.flight__cityAirport}>
                {defineWay('departureCity', 0)},{' '}
                {defineWay('departureAirport', 0)}{' '}
              </span>
              <span className={styles.flight__airportUid}>
                ({defineWay('departureAirportUid', 0)}) &#8594;
              </span>
              <span className={styles.flight__cityAirport}>
                {' '}
                {defineWay('arrivalCity', 0)}, {defineWay('arrivalAirport', 0)}{' '}
              </span>
              <span className={styles.flight__airportUid}>
                ({defineWay('arrivalAirportUid', 0)})
              </span>
            </p>
            <div className={styles.flight__timeWay}>
              <span>
                {formatDate(
                  currentFlight.flight.legs[0].segments[0].departureDate,
                  'long',
                  true
                )}
              </span>
              {toHoursAndMinutes(
                currentFlight.flight.legs[0].duration.toString()
              )}{' '}
              <span>
                {!isTransfer(0) &&
                  formatDate(
                    currentFlight.flight.legs[0].segments[0].arrivalDate,
                    'long',
                    true
                  )}
                {isTransfer(0) &&
                  formatDate(
                    currentFlight.flight.legs[0].segments[1].arrivalDate,
                    'long',
                    true
                  )}
              </span>
            </div>
            {currentFlight.flight.legs[0].segments.length > 1 && (
              <p className={styles.flight__transfers}>
                {currentFlight.flight.legs[0].segments.length - 1} пересадка
              </p>
            )}
            <p className={styles.flight__carrier}>
              Рейс выполняет: {currentFlight.flight.carrier.caption}
            </p>
          </div>
          <div className={styles.flight__transfer}>
            <p className={styles.flight__places}>
              <span className={styles.flight__cityAirport}>
                {defineWay('departureCity', 1)},{' '}
                {defineWay('departureAirport', 1)}{' '}
              </span>
              <span className={styles.flight__airportUid}>
                ({defineWay('departureAirportUid', 1)}) &#8594;
              </span>
              <span className={styles.flight__cityAirport}>
                {' '}
                {defineWay('arrivalCity', 1)}, {defineWay('arrivalAirport', 1)}{' '}
              </span>
              <span className={styles.flight__airportUid}>
                ({defineWay('arrivalAirportUid', 1)})
              </span>
            </p>
            <div className={styles.flight__timeWay}>
              <span>
                {formatDate(
                  currentFlight.flight.legs[1].segments[0].departureDate,
                  'long',
                  true
                )}
              </span>
              {toHoursAndMinutes(
                currentFlight.flight.legs[1].duration.toString()
              )}{' '}
              <span>
                {!isTransfer(1) &&
                  formatDate(
                    currentFlight.flight.legs[1].segments[0].arrivalDate,
                    'long',
                    true
                  )}
                {isTransfer(1) &&
                  formatDate(
                    currentFlight.flight.legs[1].segments[1].arrivalDate,
                    'long',
                    true
                  )}
              </span>
            </div>
            {currentFlight.flight.legs[1].segments.length > 1 && (
              <p className={styles.flight__transfers}>
                {currentFlight.flight.legs[1].segments.length - 1} пересадка
              </p>
            )}
            <p className={styles.flight__carrier}>
              Рейс выполняет: {currentFlight.flight.carrier.caption}
            </p>
          </div>
        </div>
        <button type="button" className={styles.flight__submit}>
          Забронировать
        </button>
      </li>
    )
  );
}
