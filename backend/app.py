from flask import Flask, make_response, request, jsonify
from aws_helper_functions.helper_functions import get_s3
import boto3
import io
import pandas as pd
import csv
from io import StringIO
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/overwatch-league/2022/<string:stage>/map-pools', methods=["GET"])
def get_map_pools_from_stage(stage):
    if (request.method == "GET"):
        s3 = get_s3()
        my_bucket = s3.Bucket("overwatch-league-bucket")
        # for object in my_bucket.objects.all():
        #     print(object.key)
        map_pools_file_name = f"main/{stage}-map-pools.csv"
        map_pools_file = s3.Object(bucket_name="overwatch-league-bucket", key=map_pools_file_name)
        response = map_pools_file.get()
        map_pool_csv_format = response['Body'].read().decode("utf-8")
        buffer = StringIO(map_pool_csv_format)
        reader = csv.DictReader(buffer)
        all_maps = list(reader)
        # print(map_pool)
        map_pools = []
        for map in all_maps:
            map_pool = {"map_name": map["map_name"], "map_type": map["map_type"]}
            map_pools.append(map_pool)
        json_response = jsonify(map_pools)
        print(map_pools)
        # json_response.headers.add("Access-Control-Allow-Origin", "*")
        return json_response

@app.route('/overwatch-league/2022/<string:stage>/heroes-usage', methods=["GET"])
def get_hero_usage_from_stage(stage):
    if (request.method == "GET"):
        s3 = get_s3()
        heroes_usage_file_name = f"heroes-usage/{stage}-global-heroes-usage.csv"
        heroes_usage_file = s3.Object(bucket_name="overwatch-league-bucket", key=heroes_usage_file_name)
        response = heroes_usage_file.get()
        hero_usage_csv_format = response['Body'].read().decode("utf-8")
        buffer = StringIO(hero_usage_csv_format)
        reader = csv.DictReader(buffer)
        heroes_usage = list(reader)
        return heroes_usage, 200



    # map_pool_df = pd.read_csv(StringIO(lines["Body"].read().decode('utf-8')))
    # for row in csv.DictReader(lines):
    #     print(row)
    # print(map_pool_df)
    # for line in lines:
    #     print(line)

if __name__ == '__main__':
    app.run(debug=True)