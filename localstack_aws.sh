#!/bin/bash

docker-compose -f docker-compose.yml up
aws --endpoint-url=http://localhost:4566 s3 mb s3://overwatch-league-bucket
aws --endpoint-url=http://localhost:4566 s3 cp ../Parsing-Overwatch-League-Player-Stats-2022/kickoff_clash/ s3://overwatch-league-bucket/ --recursive
aws --endpoint-url=http://localhost:4566 s3 cp ../Parsing-Overwatch-League-Player-Stats-2022/countdown_cup/ s3://overwatch-league-bucket/ --recursive
aws --endpoint-url=http://localhost:4566 s3 cp ../Parsing-Overwatch-League-Player-Stats-2022/midseason_madness/ s3://overwatch-league-bucket/ --recursive
aws --endpoint-url=http://localhost:4566 s3 cp ../Parsing-Overwatch-League-Player-Stats-2022/summer_showdown/ s3://overwatch-league-bucket/ --recursive
aws --endpoint-url=http://localhost:4566 s3 cp ../Parsing-Overwatch-League-Player-Stats-2022/grand_finals/ s3://overwatch-league-bucket/ --recursive
aws configure