import { SET_DASHBOARD_CREDENTIALS, SET_USER_CREDENTIALS } from './types';

export const setDashboardCredentials = (email, password) => ({
  type: SET_DASHBOARD_CREDENTIALS,
  payload: { email, password }
});

export const setUserCredentials = (email, password) => ({
  type: SET_USER_CREDENTIALS,
  payload: { email, password }
});