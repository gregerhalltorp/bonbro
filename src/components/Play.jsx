import React from 'react';
import Hls from 'hls.js';

const valueIn = (target, path) => {
  if (typeof target === 'undefined' || target === null) {
    return undefined;
  }

  const pathArr = path.split('.');
  if (!pathArr.length) {
    return target;
  }

  let ptr = target;
  while (pathArr.length) {
    if (ptr === undefined || ptr === null) {
      return undefined;
    }

    ptr = ptr[pathArr.shift()];
  }

  return typeof ptr === 'undefined' || ptr === null ? undefined : ptr;
};

const jsonFetch = url => {
  return fetch(url)
    .then(response => response.json())
    .catch(err => {
      throw err;
    });
};

class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      render: true,
    };

    this.hls = null;
  }

  async componentDidMount() {
    const assetId = valueIn(this.props, 'match.params.assetId');
    console.log(assetId, typeof assetId);
    if (!assetId && assetId !== 0) {
      this.setState(() => ({ render: false, message: 'Cannot render video without an ID' }));
      return;
    }

    if (!Hls.isSupported()) {
      this.setState(() => ({ render: false, message: 'HLS not supported, sorry' }));
      return;
    }

    let res;
    try {
      res = await jsonFetch(`https://prima.tv4play.se/api/web/asset/${assetId}/play.json?protocol=hls3`);
    } catch (error) {
      this.setState(() => ({ render: false, message: 'Error fetching manifest' }));
      return;
    }

    const manifestUrl = valueIn(res, 'playback.items.item.0.url');

    if (!manifestUrl) {
      this.setState(() => ({ render: false, message: 'No manifest url found' }));
      return;
    } else {
      this.setState(prevState => ({ ...prevState, assetId, manifestUrl }));
    }

    if (manifestUrl && this.video) {
      console.log('attaching');
      const hlsPtr = new Hls();
      this.hls = hlsPtr;
      hlsPtr.attachMedia(this.video);
      hlsPtr.on(Hls.Events.MEDIA_ATTACHED, function() {
        console.log('mainfestUrl', manifestUrl);
        console.log('video and hls.js are now bound together !');
        hlsPtr.loadSource(manifestUrl);
        hlsPtr.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
          console.log('manifest loaded, found ' + data.levels.length + ' quality level');
        });
      });
      hlsPtr.on(Hls.Events.ERROR, function(event, data) {
        console.log(event);
      });
    }
  }

  componentWillMount() {
    console.log('componentWillUnmont');
  }

  render() {
    const { render, assetId, message } = this.state;

    if (!render) {
      return <div>{message}</div>;
    }

    return (
      <div>
        Rendering player here soon, assetId is {assetId}
        <video
          ref={video => {
            this.video = video;
          }}
        />
      </div>
    );
  }
}

export default Play;
