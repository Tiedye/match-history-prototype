import { createFriendsElement } from './friends';
import './style.css';
import { Logger } from './logger';

const logger = new Logger();

document.body.appendChild(createFriendsElement(logger));