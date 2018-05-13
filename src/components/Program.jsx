import React from 'react';
import EpisodePanel from './EpisodePanel.jsx';

const Program = ({ program }) => {
  const { name, image, episodePanels } = program;
  if (!name || !image || !episodePanels) {
    return false;
  }
  const episodeSections = episodePanels.map(ep => <EpisodePanel episodePanel={ep} key={ep.name} />);
  return (
    <div>
      <h1>{name}</h1>
      {episodeSections}
    </div>
  );
};

export default Program;
