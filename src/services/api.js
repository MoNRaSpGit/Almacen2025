// client/src/services/api.js
import axios from 'axios';
import { API_BASE } from '../config/apiBase.js';

export const api = axios.create({ baseURL: API_BASE });
