import { SET_DEVICE_TYPE } from '../types'

export const setDeviceType = isMobile => dispatch => dispatch({ type: SET_DEVICE_TYPE, payload: isMobile })