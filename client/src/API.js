// src/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

export default API;

/*
const API = axios.create({
  baseURL: 'https://devoir-bilan-artisan.onrender.com/api'
});


Champ	Valeur
Host name / address	dpg-d1i3v5hr0fns73bstj80-a.frankfurt-postgres.render.com
Port	5432
Maintenance DB	artisan_db_ck05
Username	artisan_db_ck05_user
Password	hb1brgBwcnJ6N399DWonk5chxnAmFRtW
SSL Mode	Prefer

*/