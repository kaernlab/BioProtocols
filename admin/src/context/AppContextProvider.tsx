import React, {
  useState, useCallback, useEffect, ReactNode, useMemo,
} from 'react';
import axios from 'axios';
import { ILabData } from '../utils/interfaces';

export const AppContext = React.createContext<{
  data: Record<string, ILabData>;
  onChange:({ action, payload }: { action: string; payload?: {} }) => void,
  error: Object,
}>({
      onChange: ({ action, payload }) => {
        // Default behavior for onChange function
        console.log(action, payload);
      },
      data: {},
      error: {},
    });

const BASE_URL = 'http://localhost:3005'; // Change later

function AppContextProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Record<string, ILabData>>({});
  const [error, setError] = useState({});

  const onChange = useCallback(
    (
      { action, payload }:
      {
        action: string,
        payload?: {}
      },
    ) => {
      switch (action) {
        case 'set_data':
          axios
            .put(`${BASE_URL}/v1/put/data/`, payload)
            .then((res) => {
              setData(res.data);
            })
            .catch((e) => {
              setError(e);
            });
          break;
        default:
          setError('Action not recognized'); // TODO: Handle this error
      }
    },
    [data],
  );

  useEffect(() => {
    axios
      .get(`${BASE_URL}/v1/get/data/`)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  const value = useMemo(
    () => ({ data, onChange, error }),
    [data, onChange, error],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
