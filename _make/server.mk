## make commands to manage the server
deployhost = rva

server.permissions:
	chown -R backend:webadmins /webapps/backend
	chmod -R g+w /webapps/backend
	chmod +x /webapps/backend/bin/gunicorn_start

server.check:
	ssh ${deployhost} 'supervisorctl status backend'

server.restart:
	ssh ${deployhost} 'supervisorctl restart backend'
	ssh ${deployhost} 'service nginx restart '

server.run.nginx:
	ssh ${deployhost} 'service nginx start'

server.run.gunicorn:
	ssh ${deployhost} 'supervisorctl start backend'

