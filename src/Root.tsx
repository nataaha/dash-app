
import { ComponentType, StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const defaultQueryFn = async ({ queryKey }:any) => {
    const response = await fetch(`../../${queryKey}`);
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json();
};
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
      },
    },
});
  /**
   * Initialize the Platform Application
   */
  const initApp = (App:ComponentType) => {
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <HelmetProvider>
                        <App/>
                    </HelmetProvider>
                </RecoilRoot>
            </QueryClientProvider>
        </StrictMode>
    );
};
  
export default initApp;
  
  