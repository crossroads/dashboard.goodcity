import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faDolly,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

// Fontawesome
// We add the SVG icons we want to load here
library.add(
  faDolly,
  faCheck
);

Vue.component('font-awesome-icon', FontAwesomeIcon);