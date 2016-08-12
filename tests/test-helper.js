import { setResolver } from 'ember-mocha';
import { mocha } from 'mocha';
import resolver from './helpers/resolver';
import Reporter from './helpers/ember-cli-mocha-reporter';

setResolver(resolver);
mocha.reporter(Reporter);
