import React from 'react';

const Asset = ({ asset }) => {
  console.log('asset', asset);
  const { episode, description, duration, title, daysLeftInService } = asset;
  const seconds = duration % 60;
  const durationMinutes = (duration - seconds) / 60;
  const minutes = durationMinutes % 60;
  const hours = (durationMinutes - minutes) / 60;
  const durationString = `${hours}:${minutes}:${seconds}`;
  return (
    <div style={{ marginTop: '5px' }}>
      <div>{title}</div>
      <div>Beskrivning: {description}</div>
      <div>Längd: {durationString}</div>
      <div>Dagar kvar att titta: {daysLeftInService}</div>
    </div>
  );
};

export default Asset;
