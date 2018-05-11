import React from 'react';
import EpisodePanel from './EpisodePanel.jsx';

const Program = ({ program }) => {
  const { name, image, episodePanels } = program;
  const episodeSections = episodePanels.map(ep => (
    <EpisodePanel episodePanel={ep} key={ep.name} />
  ));
  return (
    <div>
      <h1>{name}</h1>
      {/* <img src={image} /> */}
      {episodeSections}
    </div>
  );
};

export default Program;
