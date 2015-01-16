install:
	pip install -r requirements.txt

run:
	python ./backend/manage.py runserver

include _make/deploy.mk
include _make/server.mk
