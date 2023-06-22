/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState, useCallback, useEffect, ReactNode, useMemo,
} from 'react';
import axios from 'axios';
import { ILabData } from '../utils/interfaces';
import useToken from '../hooks/useToken';
import { API_URL } from '../config';

export const AppContext = React.createContext<{
  data: Record<string, ILabData>;
  onChange:({
    action,
    payload,
  }: {
    action: string;
    payload?: {};
  }) => void; // Update the return type to Promise<any> or Promise<unknown>
  error: Record<string, any>;
}>(
    {
      onChange: async ({
        action,
        payload,
      }: {
        action: string;
        payload?: {};
      }) => { },
      data: {},
      error: {},
    });

const BASE_URL = API_URL;

function AppContextProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Record<string, ILabData>>({});
  const [error, setError] = useState({});
  const { setToken } = useToken();

  const onChange = useCallback(
    async (
      { action, payload }:
      {
        action: string,
        payload?: {}
      },
    ) => {
      switch (action) {
        case 'login':
          try {
            const response = await axios.post(`${BASE_URL}/v1/user/login`, payload);
            setToken(response.data);
            console.log('Logged in!');
          } catch (e: any) {
            setError(e);
          }
          break;
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
          console.log('Some error occurred');
          setError('Action not recognized'); // TODO: Handle this error
      }
    },
    [data],
  );

  useEffect(() => {
    axios
      .get(`${BASE_URL}/v1/labs/all`)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  const value = useMemo(
    () => ({
      data, onChange, error, BASE_URL,
    }),
    [data, onChange, error],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
