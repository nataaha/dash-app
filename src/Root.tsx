import { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { axiosClient, getToken } from '@alkuip/core';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

export const defaultQueryFn = async ({ queryKey }:any) => {
    const token: any = getToken();
    const response = await axiosClient({
        url: `../../${queryKey}`,
        withCredentials: true,
        headers:{
            Authorization: `Bearer ${ token?.accessToken??""}`
        }
    });
    return response?.data;
};
export const queryClient = new QueryClient();
  /**
   * Initialize the Platform Application
   */
  //Disabled StrictMode
const initApp = (App:ComponentType) => {
    root.render(
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
    );
};
  
export default initApp;
  
  