import React, { useEffect, useState } from 'react';
import Home from './Home';
import { type PageState } from '../types';
import LabDoing from './LabDoing';
import LabStart from "./LabStart";
import LabEnd from "./LabEnd";
import Error from './Error';

function PageController() {
  const [currentPage, setCurrentPage] = useState<PageState>('HOME');
  const [currentLabId, setCurrentLabId] = useState("");

  useEffect(() => {
    // TODO: Set the page in localstorage so that when a user refreshes, they stay on the same page
    // Retrieve data from localStorage on component mount
    const storedData = localStorage.getItem('currentPage');

    if (storedData) {
      setCurrentPage(storedData as PageState);
    }
  }, [])

  const handleSelectLab = (selectedLabId: string) => {
    console.log("User has selected ", selectedLabId)
    setCurrentLabId(selectedLabId);
    setCurrentPage('LAB_START');
  };

  const handleStartLab = () => {
    setCurrentPage('LAB_DOING')
  }

  const handleGoHome = () => {
    setCurrentLabId(""); //clear selected
    setCurrentPage('HOME');
    console.log("Back at home, current Lab ID is", currentLabId)
  }

  const handleFinishLab = () => {
    setCurrentPage("LAB_FINISHED")
  }

  const handleRestartLab = () => {
    setCurrentLabId('LAB_START')
  }

  return (
    <div>
      {currentPage === 'HOME' ? (
        <Home handleSelectLab={handleSelectLab} />
      ) : currentPage === 'LAB_START' ? (
        <LabStart currentLabId={currentLabId} goHome={handleGoHome} handleStartLab={handleStartLab} />
      ) : currentPage === 'LAB_DOING' ? (
        <LabDoing currentLabId={currentLabId} handleSubmit={handleFinishLab} />
      ) : currentPage === 'LAB_FINISHED' ? (
        <LabEnd restartLab={handleRestartLab} goHome={handleGoHome} />
      ) : (
        <Error />
      )}
    </div>
  );
}

export default PageController;
