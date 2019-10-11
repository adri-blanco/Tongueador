import config from '../config';

function getTeamInfo(teamKey) {
  return config.teams[teamKey];
}

function teamsLength() {
  return Object.keys(config.teams).length;
}

export default {
  getTeamInfo,
  teamsLength,
};
