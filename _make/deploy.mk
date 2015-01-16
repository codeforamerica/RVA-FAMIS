# make commands to run locally in order to deploy to servers
deployhost = rva

deploy.nginx:
	# copy nginxconfig
	scp ./config/backend.nginxconf ${deployhost}:/etc/nginx/sites-available/backend
	# remove existing backend if it exists
	ssh ${deployhost} 'rm -f /etc/nginx/sites-enabled/backend'
	ssh ${deployhost} 'ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/backend'
	# deactivate default
	ssh ${deployhost} 'rm -f /etc/nginx/sites-available/default'

deploy.env:
	scp ./config/.env-prod ${deployhost}:/webapps/backend/.env-prod

deploy.config:
	# copy config files
	scp ./config/gunicorn_start ${deployhost}:/webapps/backend/bin/gunicorn_start
	scp ./config/backend.conf ${deployhost}:/etc/supervisor/conf.d/backend.conf
	make deploy.env
	make deploy.nginx
	make deploy.permissions
	ssh ${deployhost} 'supervisorctl reread'
	ssh ${deployhost} 'supervisorctl update'

deploy.src:
	scp -r backend ${deployhost}:/webapps/backend/
	scp requirements.txt ${deployhost}:/webapps/backend/
	make deploy.permissions

deploy.permissions:
	ssh ${deployhost} 'chown -R backend:webadmins /webapps/backend'
	ssh ${deployhost} 'chmod -R g+w /webapps/backend'
	ssh ${deployhost} 'chmod +x /webapps/backend/bin/gunicorn_start'

deploy.all:
	make deploy.config
	make deploy.src
