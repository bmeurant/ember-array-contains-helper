import RESTAdapter from '@ember-data/adapter/rest';
import config from '../config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  host = config.host;
}
