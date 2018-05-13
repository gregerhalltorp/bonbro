import Program from './Program';
import React from 'react';
import EpisodePanel from './EpisodePanel.jsx';

const TEST_NAME = 'TEST_NAME';
// const EpisodePanel = () => {};

describe('<Program />', function() {
  let props;

  beforeEach(function() {
    props = {};
  });

  it('does not render with no props', function() {
    const wrapper = shallow(<Program />);
    expect(wrapper.isEmptyRender()).to.be.true;
  });

  it('does not render with name or episodePanels props missing', function() {
    props = { name: TEST_NAME };
    let wrapper = shallow(<Program {...props} />);
    expect(wrapper.isEmptyRender()).to.be.true;

    props = { episodePanels: ['laskdfj'] };
    wrapper = shallow(<Program {...props} />);
    expect(wrapper.isEmptyRender()).to.be.true;
  });

  it('does not render when episodePanels is not array or is empty array', function() {
    props = { name: TEST_NAME, epsiodePanels: 'teststring' };
    let wrapper = shallow(<Program {...props} />);
    expect(wrapper.isEmptyRender()).to.be.true;

    props.epsiodePanels = [];
    expect(wrapper.isEmptyRender()).to.be.true;
  });

  it('renders the correct number of EpisodePanels', function() {
    props = {
      name: TEST_NAME,
      episodePanels: [
        { name: 'values' },
        { name: 'are' },
        { name: 'not' },
        { name: 'important' },
      ],
    };

    const wrapper = shallow(<Program {...props} />);
    expect(wrapper.find('EpisodePanel').length).to.equal(4);
  });
});
