import React from 'react';
import Episode from './Episode.jsx';

const EpisodePanel = ({ episodePanel }) => {
  const { name, videoList } = episodePanel;
  const { videoAssets } = videoList;
  const episodes = videoAssets.map(asset => <Episode key={asset.id} asset={asset} />);
  return (
    <div style={{ marginTop: '25px' }}>
      <h2>{name}</h2>
      {episodes}
    </div>
  );
};

export default EpisodePanel;
