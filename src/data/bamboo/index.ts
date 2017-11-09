import axios from 'axios';
import { sortBy } from 'lodash';
import * as moment from 'moment';

const url = '<url>/rest/api/latest';
const username = '<username>';
const password = '<pass>';

export interface IBambooResult {
  planKey: string;
  planName: string;
  buildNumber: number;
  duration: number;
  averageDuration: number;
  isBuilding: boolean;
  isFailed: boolean;
  isQueued: boolean;
}

export const getRecentBuilds = (maxResults: number = 5) => {
  return axios
    .get(url + '/result', {
      auth: { username, password },
      params: {
        os_authType: 'basic',
        expand: 'results.result.plan',
        'max-results': '1000',
        includeAllStates: 'true',
      },
    })
    .then((response) => {
      const results = sortBy(response.data.results.result, (item) => {
        return moment(item.buildStartedTime).valueOf() * -1;
      });

      return results.filter((item) => item.lifeCycleState !== 'NotBuilt').slice(0, maxResults);
    })
    .then((results: any[]) => {
      return results.map((data): IBambooResult => {
        return {
          planKey: data.plan.key,
          planName: data.plan.name,
          buildNumber: data.number,
          duration: data.buildDurationInSeconds,
          averageDuration: data.plan.averageBuildTimeInSeconds,
          isBuilding: !data.finished,
          isFailed: !data.successful,
          isQueued: data.notRunYet,
        }
      })
    })
  ;
}

