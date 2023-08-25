import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isShowModal, setIsShowModal] = useState(true);
    const [isShowSidebar, setIsShowSidebar] = useState(false);

    const showModal = () => {
        setIsShowModal(true);
    };
    const hideModal = () => {
        setIsShowModal(false);
    };

    const showSidebar = () => {
        setIsShowSidebar(true);
    };
    const hideSidebar = () => {
        setIsShowSidebar(false);
    };

    return (
        <AppContext.Provider
            value={{
                isShowModal,
                isShowSidebar,
                showModal,
                hideModal,
                showSidebar,
                hideSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// custom hook
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
