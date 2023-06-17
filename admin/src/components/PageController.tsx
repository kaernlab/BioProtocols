import React, { useContext, useState } from 'react';
import { TPageState } from '../utils/types';
import { Dashboard, LabEdit, LabNew } from './Pages';
import { EditableContent } from '../utils/interfaces';
import { AppContext } from '../context/AppContextProvider';
import PageControllerLoading from './Style/PageControllerLoading';
import { GenericError, PageNotFoundError } from './Errors';

function PageController() {
  const { data, onChange, error } = useContext(AppContext);
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

  const handleWriteToDB = (labId:string, obj: EditableContent) => {
    onChange({ action: 'set_data', payload: { labId, content: obj } });
    console.log('Written to db!');
  };

  // TODO: Check if error has been raised
  // Currently not being activated, just shows loading
  if (error) {
    <GenericError msg={JSON.stringify(error)} />;
  }

  // Check if data is empty
  if (Object.keys(data).length === 0) {
    return <PageControllerLoading />;
  }

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
      return (<PageNotFoundError />);
  }
}

export default PageController;
