import React, { useEffect, useState } from 'react';
import Home from './Home';
import { type PageState } from '../utils/types';

import Lab from './Lab/Lab';

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
    setCurrentLabId(selectedLabId);
    setCurrentPage('LAB_START');
  };

  const handleGoHome = () => {
    setCurrentLabId(""); //clear selected
    setCurrentPage('HOME');
  }

  return (
    <div>
      {currentPage === 'HOME' ? (
        <Home handleSelectLab={handleSelectLab} />
      ) : (
        <Lab
          currentPage={currentPage}
          currentLabId={currentLabId}
          goHome={handleGoHome}
          handleFinishLab={() => setCurrentPage("LAB_FINISHED")}
          handleStartLab={() => setCurrentPage('LAB_DOING')}
          handleRestartLab={() => setCurrentPage('LAB_START')}
        />
      )
      }
    </div>
  );
}

export default PageController;
