import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import Home from './Home';
import { type TPageState } from '../utils/types';
import Lab from './Lab';
import jsonData from '../data/data.json';
import { ILabData } from '../utils/interfaces';
import { API_URL } from '../config';
import PageControllerLoading from './Style/PageControllerLoading';

function PageController() {
  const [typedData, setTypedData] = useState<Record<string, ILabData>>({});

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/labs/all`)
      .then((res) => {
        setTypedData(res.data);
      })
      .catch(() => {
        setTypedData(jsonData); // set default data
      });
  }, []);

  const storedLabId = localStorage.getItem('currentLabId');
  const [currentLabId, setCurrentLabId] = useState(
    storedLabId || '',
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

  // Check if data is empty
  if (Object.keys(typedData).length === 0) {
    return <PageControllerLoading />;
  }

  return (
    <Box sx={{ m: 2 }}>
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
    </Box>
  );
}

export default PageController;
