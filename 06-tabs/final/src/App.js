import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project';

function App() {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [value, setValue] = useState(0);

    const fetchJobs = async () => {
        const res = await fetch(url);
        const data = await res.json();
        setJobs(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    if (loading) {
        return (
            <section className="section loading">
                <h1>Loading...</h1>
            </section>
        );
    }

    const { title, dates, duties, company } = jobs[value];
    return (
        <section className="section">
            <div className="title">
                <h2>expierence</h2>
                <div className="underline"></div>
            </div>

            <div className="jobs-center">
                <div className="btn-container">
                    {jobs.map((item, index) => {
                        return (
                            <button
                                key={item.id}
                                className={`job-btn ${
                                    index === value && 'active-btn'
                                }`}
                                onClick={() => setValue(index)}
                            >
                                {item.company}
                            </button>
                        );
                    })}
                </div>
                <article className="job-info">
                    <h3>{title}</h3>
                    <h4>{company}</h4>
                    <p className="job-dates">{dates}</p>
                    {duties.map((duty, index) => {
                        return (
                            <div key={index} className="job-desc">
                                <FaAngleDoubleRight className="job-icon" />
                                <p>{duty}</p>
                            </div>
                        );
                    })}
                </article>
            </div>
        </section>
    );
}

export default App;
