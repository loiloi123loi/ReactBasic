import React, { useState } from 'react';
import data from './data';

function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let amount = parseInt(count);
        if (amount < 1) {
            amount = 1;
        }
        if (amount > data.length) {
            amount = data.length;
        }
        setText(data.slice(0, amount));
    };

    return (
        <section className="section-center">
            <h3>tired of boring lorem ipsum?</h3>
            <form className="lorem-form" onSubmit={handleSubmit}>
                <label htmlFor="amount">paragraphs:</label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    step={1}
                    min={1}
                    max={data.length}
                    value={count === 0 ? 1 : count}
                    onChange={(e) => setCount(e.target.value)}
                />
                <button type="submit" className="btn">
                    generate
                </button>
            </form>
            <article className="lorem-text">
                {text.map((item, index) => {
                    return <p key={index}>{item}</p>;
                })}
            </article>
        </section>
    );
}

export default App;
