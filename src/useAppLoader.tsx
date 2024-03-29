import { fetcher, queryClient } from '@alkuip/core';

export const useAppLoader = ()=>{
  return queryClient.fetchQuery({
    queryKey: [`AppConfig.json`],
    queryFn: async() =>fetcher('AppConfig.json',undefined)
  });
}