import React from 'react';
import { Link } from 'react-router-dom';

const Asset = ({ asset }) => {
  console.log('asset', asset);
  const { episode, description, duration, title, daysLeftInService, id } = asset;
  const seconds = duration % 60;
  const durationMinutes = (duration - seconds) / 60;
  const minutes = durationMinutes % 60;
  const hours = (durationMinutes - minutes) / 60;
  const durationString = `${hours}:${minutes}:${seconds}`;
  const linkUrl = `/play/${id}`;
  return (
    <div style={{ marginTop: '5px' }}>
      <Link to={linkUrl}>{title}</Link>
      <div>Beskrivning: {description}</div>
      <div>Längd: {durationString}</div>
      <div>Dagar kvar att titta: {daysLeftInService}</div>
    </div>
  );
};

export default Asset;
