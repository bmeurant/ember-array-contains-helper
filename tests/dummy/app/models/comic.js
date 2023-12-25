import Model, { attr } from '@ember-data/model';

export default class Comic extends Model {
  @attr('string') title;
}
