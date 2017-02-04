import {
  createCollectionReducers,
  createValueReducer,
} from 'meteor/ssrwpo:ssr';

import { RECEIVE_STORIES, RECEIVE_INTL } from '../actions';

const auth = createValueReducer('auth', false);
const collectionReducers = createCollectionReducers([
  'Folks',
  'Places',
  'PubSub',
]);

const perfItems = createValueReducer('perfItems', 2000);
const areGlobalStoresInitialised = createValueReducer('areGlobalStoresInitialised', false);
const isPubSubInitialised = createValueReducer('isPubSubInitialised', false);
const isPubSubSubscribed = createValueReducer('isPubSubSubscribed', false);
const isStoryDataInitialised = createValueReducer('isStoryDataInitialised', false);
const isIntlInitialised = createValueReducer('isIntlInitialised', false);

function stories(state = {
  isFetching: false,
  items: [],
}, action) {
  switch (action.type) {
    case RECEIVE_STORIES:
      return {
        ...state,
        isFetching: false,
        items: action.stories,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
}

function intl(state = {
  isFetching: false,
  intl: {},
}, action) {
  switch (action.type) {
    case RECEIVE_INTL:
      return {
        ...state,
        isFetching: false,
        intl: action.intl,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
}

export default {
  auth,
  ...collectionReducers,
  perfItems,
  areGlobalStoresInitialised,
  isPubSubSubscribed,
  isPubSubInitialised,
  isStoryDataInitialised,
  stories,
  isIntlInitialised,
  intl,
};