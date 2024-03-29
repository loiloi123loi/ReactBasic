import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
    const [people, setPeople] = useState(data);
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (value > people.length - 1) {
            setValue(0);
        }
        if (value < 0) {
            setValue(people.length - 1);
        }
    }, [value, people]);

    useEffect(() => {
        let slider = setInterval(() => {
            setValue(value + 1);
        }, 3000);
        return () => clearInterval(slider);
    }, [value]);

    return (
        <section className="section">
            <div className="title">
                <h2>
                    <span>/</span>reviews
                </h2>
            </div>
            <div className="section-center">
                {people.map((person, index) => {
                    const { id, name, title, image, quote } = person;
                    let postion = 'nextSlide';
                    if (index === value) {
                        postion = 'activeSlide';
                    }
                    if (
                        index === value - 1 ||
                        (value === 0 && index === people.length - 1)
                    ) {
                        postion = 'lastSlide';
                    }

                    return (
                        <article key={id} className={postion}>
                            <img
                                src={image}
                                alt={name}
                                className="person-img"
                            />
                            <h4>{name}</h4>
                            <p className="title">{title}</p>
                            <p className="text">{quote}</p>
                            <FaQuoteRight className="icon" />
                        </article>
                    );
                })}
                <button className="prev">
                    <FiChevronLeft onClick={() => setValue(value - 1)} />
                </button>
                <button className="next">
                    <FiChevronRight onClick={() => setValue(value + 1)} />
                </button>
            </div>
        </section>
    );
}

export default App;
