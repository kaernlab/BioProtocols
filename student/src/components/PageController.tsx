import React, { useEffect, useState } from 'react';
import Home from './Home';
import { type PageState } from '../utils/types';
import Lab from './Lab/Lab';
import jsonData from '../data/data.json';
import { ILabData } from '../utils/interfaces';

function PageController() {
  // Assuming the structure of the JSON data is compatible with Record<string, ILabData>
  // TODO: Call API HERE
  const typedData: Record<string, ILabData> = jsonData;

  const [currentPage, setCurrentPage] = useState<PageState>('HOME');
  const [currentLabId, setCurrentLabId] = useState("");

  useEffect(() => {
    // TODO: Set the page in localstorage so that when a user refreshes, they stay on the same page
    // Retrieve data from localStorage on component mount
    const storedPage = localStorage.getItem('currentPage');

    if (storedPage) {
      console.log(storedPage)
      setCurrentPage(storedPage as PageState);
    }
    localStorage.setItem('currentPage', currentPage)
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
        <Home
          data={typedData}
          handleSelectLab={handleSelectLab}
        />
      ) : (
        <Lab
          data={typedData}
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
