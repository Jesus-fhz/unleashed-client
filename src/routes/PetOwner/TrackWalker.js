import React, { useEffect, useState } from 'react';
import Map from '../../components/Map';
import TrackWalkerSidebar from '../../components/TrackWalkerSidebar';

const TrackWalker = () => {
  const [data, setData] = useState();

  useEffect(() => {
    // fetch the walk, and the walker's data
    // and need to track walker in the map
  }, []);

  return (
    <div className="trackWalker">
      <TrackWalkerSidebar />
      <Map />
    </div>
  )
}

export default TrackWalker;