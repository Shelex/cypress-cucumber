import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setHiringStage } from '../../actions/data';
import CrewMember from '../CrewMember';

class CrewContainer extends Component {
  constructor(props) {
    super(props);
    this.renderMember = this.renderMember.bind(this);
  }

  renderMember(member) {
    const { setHiringStage } = this.props; // eslint-disable-line
    const onStageChange = {};
    if (member.hiringStage === 'applied') {
      onStageChange.onUp = () => setHiringStage(member.login.uuid, 'interviewing');
    }
    if (member.hiringStage === 'interviewing') {
      onStageChange.onUp = () => setHiringStage(member.login.uuid, 'hired');
      onStageChange.onDown = () => setHiringStage(member.login.uuid, 'applied');
    }
    if (member.hiringStage === 'hired') {
      onStageChange.onDown = () => setHiringStage(member.login.uuid, 'interviewing');
    }
    return <CrewMember key={member.login.uuid} member={member} {...onStageChange} />;
  }

  render() {
    const { name, crew } = this.props;
    return (
      <div>
        {name && <h2>{name}</h2>}
        {crew.map(this.renderMember)}
      </div>
    );
  }
}

CrewContainer.defaultProps = {
  name: null,
  hiringStage: null,
  crew: [],
};

CrewContainer.propTypes = {
  name: PropTypes.string,
  hiringStage: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  crew: PropTypes.array,
};

const filterByName = (data, filters) => {
  if (!filters.name) return data;
  return data.filter(
    item => item.name.first.indexOf(filters.name) >= 0 || item.name.last.indexOf(filters.name) >= 0,
  );
};

const filterByCity = (data, filters) => {
  if (!filters.city) return data;
  return data.filter(
    item => item.location.city.indexOf(filters.city) >= 0,
  );
};

const filterCrew = (data, filters = {}, hiringStage) => {
  const filteredByStage = data.filter(item => !hiringStage || item.hiringStage === hiringStage);
  const filteredByName = filterByName(filteredByStage, filters);
  const filteredByCity = filterByCity(filteredByName, filters);

  return filteredByCity;
};

const mapStateToProps = ({ data, filters }, { hiringStage }) => ({
  crew: filterCrew(data, filters, hiringStage),
});

export default connect(mapStateToProps, { setHiringStage })(CrewContainer);
