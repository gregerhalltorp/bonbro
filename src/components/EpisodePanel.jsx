import React from 'react';
import Asset from './Asset.jsx';

const EpisodePanel = ({ episodePanel }) => {
  const { name, videoList } = episodePanel;
  const { videoAssets } = videoList;
  const assets = videoAssets.map(asset => <Asset key={asset.id} asset={asset} />);
  return (
    <div style={{ marginTop: '25px' }}>
      <h2>{name}</h2>
      {assets}
    </div>
  );
};

export default EpisodePanel;
