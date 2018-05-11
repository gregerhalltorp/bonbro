import React from 'react';
import { hot } from 'react-hot-loader';
import Program from './Program.jsx';

// const App = ({ data } = {}) => <div>{data.text}</div>;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const queryBody = `{
      program(nid:"kommissarien-och-havet") {
        name
        image
        episodePanels {
          name
          videoList {
            videoAssets {
              id
              episode
              description
              duration
              daysLeftInService
              expire_date_time
              expireDateTime
              image
              program {
                name
              }
              season
              title
            }
          }
        }
      }
    }`;

    fetch('https://tv4-graphql-prod.herokuapp.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryBody,
      }),
    })
      .then(response => response.json())
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
    console.log('this.state', this.state);
    const potentialProgram =
      (data && data.program && <Program program={data.program} />) || '';
    return <div>{potentialProgram}</div>;
  }
}

export default hot(module)(App);
