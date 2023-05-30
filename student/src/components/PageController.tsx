import React, { useEffect, useState } from 'react';
import Home from './Home';
import { type TPageState } from '../utils/types';
import Lab from './Lab';
import jsonData from '../data/data.json';
import { ILabData } from '../utils/interfaces';

function PageController() {
  // Assuming the structure of the JSON data is compatible with Record<string, ILabData>
  // TODO: Call API HERE
  const typedData: Record<string, ILabData> = jsonData;

  const storedLabId = localStorage.getItem('currentLabId');
  const [currentLabId, setCurrentLabId] = useState(
    storedLabId
      ? (storedLabId as TPageState)
      : '',
  );

  const storedPage = localStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState<TPageState>(
    storedPage
      ? (storedPage as TPageState)
      : 'HOME',
  );

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('currentLabId', currentLabId);
  }, [currentPage, currentLabId]);

  const handleSelectLab = (selectedLabId: string) => {
    setCurrentLabId(selectedLabId);
    setCurrentPage('LAB_START');
  };

  const handleGoHome = () => {
    setCurrentLabId(''); // clear selected lab
    setCurrentPage('HOME');
  };

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
          handleFinishLab={() => setCurrentPage('LAB_FINISHED')}
          handleStartLab={() => setCurrentPage('LAB_DOING')}
          handleRestartLab={() => setCurrentPage('LAB_START')}
        />
      )}
    </div>
  );
}

export default PageController;
