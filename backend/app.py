from flask import Flask
from aws_helper_functions.helper_functions import get_s3
import boto3
import io
import pandas as pd
import csv

app = Flask(__name__)
@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/overwatch-league/2022/<stage>/map-pools', methods=["GET"])
def get_all_map_types(stage):
    s3 = get_s3()
    map_pool_file = f"main/{stage}-map-pools.csv"
    map_pool = s3.Object(bucket_name="overwatch-league-bucket", key=map_pool_file)
    print(map_pool.key)
    response = map_pool.get()
    lines = response['Body'].read().split()
    for row in csv.DictReader(lines):
        print(row)
    return "HI"

if __name__ == '__main__':
    app.run(debug=True)