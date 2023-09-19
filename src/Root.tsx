
import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { axiosClient, useToken } from '@alkuip/core';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

export const defaultQueryFn = async ({ queryKey }:any) => {
    const token: any = useToken();
    const response = await axiosClient({
        url: `../../${queryKey}`,
        withCredentials: true,
        headers:{
            Authorization: `Bearer ${ token?.accessToken??""}`
        }
    });
    return response?.data;
};
const queryClient = new QueryClient();
  /**
   * Initialize the Platform Application
   */
  //Disabled StrictMode
const initApp = (App:ComponentType) => {
    root.render(
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <HelmetProvider>
                        <App/>
                    </HelmetProvider>
                </RecoilRoot>
            </QueryClientProvider>
    );
};
  
export default initApp;
  
  