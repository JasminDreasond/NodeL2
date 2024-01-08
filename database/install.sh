#!/bin/bash

HOST='127.0.0.1'
USER='root'
PASS='alosi!$53'

mysql -h $HOST -u $USER --password=$PASS < 'sql/database.sql'
