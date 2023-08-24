import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getLocalList = () => {
    const list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(list);
    }
    return [];
};

function App() {
    const [name, setName] = useState('');
    const [list, setList] = useState(getLocalList);
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({
        show: false,
        msg: '',
        type: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            showAlert(true, 'danger', 'please enter value');
        } else if (name && isEditing) {
            showAlert(true, 'success', 'edit item success');
            setList(
                list.map((item, index) => {
                    if (item.id === editID) {
                        item.title = name;
                    }
                    return item;
                })
            );
            setEditID(null);
            setIsEditing(false);
            setName('');
        } else {
            showAlert(true, 'success', 'add item success');
            const newItem = {
                id: new Date().getTime().toString(),
                title: name,
            };
            setList([...list, newItem]);
            setName('');
        }
    };

    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({ show, type, msg });
    };

    const clearList = () => {
        showAlert(true, 'success', 'clear list');
        setList([]);
    };

    const removeItem = (id) => {
        showAlert(true, 'success', 'delete item');
        setList(list.filter((item) => item.id !== id));
    };

    const editItem = (id) => {
        const item = list.find((item) => item.id === id);
        setIsEditing(true);
        setEditID(id);
        setName(item.title);
    };

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    return (
        <section className="section-center">
            <form className="grocery-form" onSubmit={handleSubmit}>
                {alert.show && (
                    <Alert {...alert} removeAlert={showAlert} list={list} />
                )}
                <h3>grocery bud</h3>
                <div className="form-control">
                    <input
                        type="text"
                        className="grocery"
                        placeholder="e.g. eggs"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" className="submit-btn">
                        {isEditing ? 'edit' : 'submit'}
                    </button>
                </div>
            </form>
            {list.length > 0 && (
                <div className="grocery-container">
                    <List
                        items={list}
                        removeItem={removeItem}
                        editItem={editItem}
                    />
                    <button className="clear-btn" onClick={clearList}>
                        clear items
                    </button>
                </div>
            )}
        </section>
    );
}

export default App;
