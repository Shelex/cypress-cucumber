import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class CrewMember extends Component {
  render() {
    const { member, onUp, onDown } = this.props;
    const { name } = member;
    return (
      <div className="CrewMember-container">
        <div className="CrewMember-info">
          <div className="CrewMemeber-photo" style={{ backgroundImage: `url(${member.picture.medium})` }} />
          <div className="CrewMemeber-name">
            <div>{`${name.first} ${name.last}`}</div>
            <div>{member.location.city}</div>
          </div>
        </div>
        <div className="CrewMember-toolbar">
          {onDown && <button onClick={onDown} type="button">&lt;</button>}
          {onUp && <button onClick={onUp} className="CrewMember-up" type="button">&gt;</button>}
        </div>
      </div>
    );
  }
}

CrewMember.defaultProps = {
  member: null,
  onUp: null,
  onDown: null,
};

CrewMember.propTypes = {
  member: PropTypes.object,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
};

export default CrewMember;
