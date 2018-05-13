import React from 'react';
import EpisodePanel from './EpisodePanel.jsx';

const Program = ({ name, episodePanels, ...rest }) => {
  if (
    !name ||
    !episodePanels ||
    episodePanels.constructor !== Array ||
    !episodePanels.length
  ) {
    return false;
  }
  const episodeSections = episodePanels.map(ep => (
    <EpisodePanel key={ep.name} {...ep} />
  ));
  return (
    <div>
      <h1>{name}</h1>
      {episodeSections}
    </div>
  );
};

export default Program;
