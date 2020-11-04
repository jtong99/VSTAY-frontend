import useSWR from 'swr';
import { useState } from 'react';
import compose from '@helper/compose';
import { mapBoxToken } from '@helper/vars';
import { serverFetcher } from 'helper';

async function useDataFromGeocode(params, config) {
  //   const [error, setError] = useState({ state: false, message: '' });
  //   const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState('');
  //   const { data, error, revalidate } = useSWR(
  //     [
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${params.longitude},${params.latitude}.json?access_token=${mapBoxToken}`,
  //       mapBoxToken || '',
  //     ],
  //     config,
  //   );
  const data = await serverFetcher(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${params.longitude},${params.latitude}.json?access_token=${mapBoxToken}`,
  );
  return data;
}

export default useDataFromGeocode;
