import React, { useState } from 'react';
import { TPageState } from '../utils/types';
import { Dashboard, LabEdit, LabNew } from './Pages';
import Error from './Pages/Error';
import jsonData from '../data/data2.json';
import { EditableContent, ILabData } from '../utils/interfaces';

function PageController() {
  // TODO: Call API HERE instead of importing jsonData
  const data: Record<string, ILabData> = jsonData;
  const [currentPage, setCurrentPage] = useState<TPageState>('HOME');
  const [currentLabId, setCurrentLabId] = useState('');

  const handleSelectLab = (labId: string) => {
    setCurrentLabId(labId);
    setCurrentPage('LAB_EDIT');
  };

  const handleGoHome = () => {
    setCurrentLabId(''); // clear selected lab
    setCurrentPage('HOME');
  };

  const handleCreateNewLab = () => {
    // Get labId here
    setCurrentPage('LAB_NEW');
  };

  const handleWriteToDB = (obj: EditableContent) => {
    console.log(obj);
    // Write to DB
  };

  switch (currentPage) {
    case 'HOME':
      return (
        <Dashboard
          data={data}
          handleSelectLab={handleSelectLab}
          handleCreateNewLab={handleCreateNewLab}
        />
      );
    case 'LAB_EDIT':
      return (
        <LabEdit
          data={data[currentLabId]}
          labId={currentLabId}
          handleGoHome={handleGoHome}
          handleWriteToDB={handleWriteToDB}
        />
      );
    case 'LAB_NEW':
      return (<LabNew handleGoHome={handleGoHome} />);
    default:
      return (<Error />);
  }
}

export default PageController;
