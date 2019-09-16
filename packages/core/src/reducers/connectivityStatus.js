import { CONNECT_FULFILLED, CONNECT_PENDING, CONNECT_REJECTED, CONNECT_STILL_PENDING } from '../actions/connect';

import { RECONNECT_PENDING, RECONNECT_FULFILLED } from '../actions/reconnect';

import { DISCONNECT_FULFILLED } from '../../lib/actions/disconnect';
import { SAGA_ERROR } from '../actions/sagaError';

const DEFAULT_STATE = 'uninitialized';

export default function connectivityStatus(state = DEFAULT_STATE, { meta, type }) {
  // "sagaerror" is fatal and should ignore any subsequent connectivity status.
  if (state !== 'sagaerror') {
    switch (type) {
      case CONNECT_PENDING:
      case RECONNECT_PENDING:
        if (state !== 'uninitialized') {
          state = 'reconnecting';
        }

        break;

      case CONNECT_FULFILLED:
        state = 'connected';
        break;

      case RECONNECT_FULFILLED:
        state = 'reconnected';
        break;

      case CONNECT_REJECTED:
        state = 'error';
        break;

      case CONNECT_STILL_PENDING:
        state = 'connectingslow';
        break;

      case DISCONNECT_FULFILLED:
        state = meta && meta.error ? 'error' : 'notconnected';
        break;

      case SAGA_ERROR:
        state = 'sagaerror';
        break;

      default:
        break;
    }
  }

  return state;
}
