import { useEffect, useState } from "react";
import "./App.css";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { data } from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(people.length - 1);
    }

    if (index > people.length - 1) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 2000);

    return () => clearInterval(slider);
  }, [index]);

  return (
    <div className="container">
      <div className="container__heading">
        <h2>Slider</h2>
      </div>

      <div className="container-flex">
        {people.map(({ id, name, img, about }, personIndex) => {
          let position = "nextSlide";
          if (index === personIndex) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article key={id} className={position}>
              <div className="user__container">
                <div className="user__image-container">
                  <img src={img} alt="user" />
                  <div className="user__quotes__container">
                    <FaQuoteRight className="user__quotes" />
                  </div>
                </div>
                <h2>{name}</h2>
                <p>{about}</p>
              </div>
            </article>
          );
        })}
        <button
          className="preButton"
          type="button"
          onClick={() => setIndex(index - 1)}
        >
          <FiChevronLeft />
        </button>

        <button
          className="nextButton"
          type="button"
          onClick={() => setIndex(index + 1)}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default App;
