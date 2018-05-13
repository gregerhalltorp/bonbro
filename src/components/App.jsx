import React from 'react';
import Program from './Program.jsx';
import { jsonFetch, valueIn } from '../utils';
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
          errors: valueIn(json, 'errors.length')
            ? json.errors.map(err => err.message)
            : undefined,
        }));
      })
      .catch(error => {
        this.setState(() => ({ error }));
      });
  }

  render() {
    const { data } = this.state;
    const potentialProgram =
      (data && data.program && <Program {...data.program} />) || '';
    const potentialErrors =
      (this.state.errors &&
        this.state.errors.length &&
        this.state.errors.map((err, i) => (
          <div key={i} style={{ color: 'red' }}>
            {err}
          </div>
        ))) ||
      '';
    return (
      <div>
        {potentialProgram}
        {potentialErrors}
      </div>
    );
  }
}

export default App;
