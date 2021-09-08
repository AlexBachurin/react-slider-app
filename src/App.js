import React, { useState } from 'react'
import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './App.css';
import data from './data'

function App() {
  const [people, setPeople] = useState(data);
  //set index for slider
  const [index, setIndex] = useState(0)

  //next slide
  const nextSlide = () => {
    //check for index boundaries
    if (index > people.length - 2) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }

  }

  const prevSlide = () => {
    if (index === 0) {
      setIndex(people.length - 1)
    } else {
      setIndex(index - 1)
    }
  }
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          let clsNames = 'article';
          //show active slide based on what index we have in our state,
          //if it matches with current iterated index of person, then show it
          if (personIndex === index) {
            clsNames += ' activeSlide'
          }
          const { id, image, name, title, quote } = person;
          return <article key={id} className={clsNames}>
            <img src={image} alt={name} className="person-img" />
            <h4>{name}</h4>
            <p className="title">{title}</p>
            <p className="text">
              {quote}
            </p>
            <FaQuoteRight className='icon' />
          </article>
        })}
        <button className='prev' onClick={() => prevSlide()}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={() => nextSlide()}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
