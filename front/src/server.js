import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import api from 'api.js'

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
    .use(async function (req, res, next) {
    	let usr = null

        if (!req.path.match(/.*.(css|jpg|js|png|ico)/) && req.headers.cookie !== undefined) {

            let response = await api.get('/api/user', {
                headers: {
                    Cookie: req.headers.cookie,
                    Host: 'localhost:8000',
                    Origin: 'http://localhost:3000',
                    Referer: 'http://localhost:3000'
                }
            }).catch(res => {
                next()

			})

			usr = response.data
        }

        if (usr !== null) {
            req.session = {}
            req.session.user = usr
		}

        next()
    })
    .use(
        compression({threshold: 0}),
        sirv('static', {dev}),
        sapper.middleware({
            session: req => ({
                user: req.session && req.session.user
            })
        })
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });
