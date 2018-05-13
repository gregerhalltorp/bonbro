import React from 'react';
import Program from './Program.jsx';
import { jsonFetch } from '../utils';
import config from '../configuration';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    jsonFetch(config.graphQlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: config.queryBody,
      }),
    })
      .then(json => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            ...json.data,
          },
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { data } = this.state;
    const potentialProgram = (data && data.program && <Program program={data.program} />) || '';
    return <div>{potentialProgram}</div>;
  }
}

export default App;
