import Plyr from 'plyr'
import 'plyr/dist/plyr.css';

const players = document.querySelectorAll('.js-plyr-player');
players.forEach(player => new Plyr(player));
