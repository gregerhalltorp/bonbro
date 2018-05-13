import React from 'react';
import { Link } from 'react-router-dom';

import { secondsToHourMinuteSecondString } from '../utils';

const Episode = ({
  episode,
  description,
  duration,
  title,
  daysLeftInService,
  id,
}) => {
  const linkUrl = `/play/${id}`;
  return (
    <div style={{ marginTop: '5px' }}>
      <Link to={linkUrl}>{title}</Link>
      <div>Beskrivning: {description}</div>
      <div>Längd: {secondsToHourMinuteSecondString(duration)}</div>
      <div>Dagar kvar att titta: {daysLeftInService}</div>
    </div>
  );
};

export default Episode;
