import React, { useState, useEffect } from 'react'
import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './App.css';
import data from './data'

function App() {
  //eslint-disable-next-line
  const [people, setPeople] = useState(data);
  //set index for slider
  const [index, setIndex] = useState(0)

  //next slide
  const nextSlide = () => {
    //check for index boundaries
    if (index >= people.length - 1) {
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

  // AUTOSLIDE
  useEffect(() => {
    const timerId = setInterval(() => {
      setIndex(index + 1)
    }, 5000)
    //need clear function so we wont create a ton of setIntervals then we change index
    //and call useEffect
    return () => clearInterval(timerId)

  }, [index])

  //need to add another useEffect so autoslide wont go out of bounds
  useEffect(() => {
    if (index > people.length - 1) {
      setIndex(0)
    }
    if (index < 0) {
      setIndex(people.length - 1)
    }
    //eslint-disable-next-line
  }, [index])

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          let clsNames = 'nextSlide';
          //show active slide based on what index we have in our state,
          //if it matches with current iterated index of person, then show it
          if (personIndex === index) {
            clsNames = 'activeSlide'
          }
          //only change previous slide name to 'lastSlide when we arent on 0 element
          //because we will get -1 so it wont work
          //with this statement 'lastslide' class will stay on last element
          if (personIndex === index - 1 || ((index === 0) && (personIndex === people.length - 1))) {
            clsNames = 'lastSlide'
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


//slider logic
//active last
//0       3
//1       0
//2       1
//3       2