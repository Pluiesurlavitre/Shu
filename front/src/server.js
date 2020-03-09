import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import api from 'api.js'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(async function (req, res, next) {


		if (req.path === '/') {

			let response = api.get('/api/user', {
				headers: {
					Cookie: req.headers.cookie,
					Host: 'localhost:8000',
					Origin: 'http://localhost:3000',
					Referer: 'http://localhost:3000'
				}

			}).then(res => {
				console.log(res.data)
			})
				.catch(e => {
					console.log(e.response)
				})

		}





		next()
	})
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
