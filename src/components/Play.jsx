import React from 'react';
import Hls from 'hls.js';
import { valueIn, jsonFetch } from '../utils';

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

    this.hls && this.hls.destroy();

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
      const video = this.video;
      const hlsPtr = new Hls();
      this.hls = hlsPtr;
      hlsPtr.attachMedia(video);
      hlsPtr.on(Hls.Events.MEDIA_ATTACHED, function() {
        console.log('video and hls.js are now bound together !');
        hlsPtr.loadSource(manifestUrl);
        hlsPtr.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
          console.log('manifest loaded, found ' + data.levels.length + ' quality level');
          video.play();
        });
      });
      hlsPtr.on(Hls.Events.ERROR, function(event, data) {
        console.log(event);
        this.setState(() => ({ render: false, message: 'event' }));
      });
    }
  }

  componentWillUnmount() {
    this.hls && this.hls.destroy();
  }

  render() {
    const { render, assetId, message } = this.state;

    if (!render) {
      return <div>{message}</div>;
    }

    return (
      <div>
        <video
          ref={video => {
            this.video = video;
          }}
          controls
        />
      </div>
    );
  }
}

export default Play;
