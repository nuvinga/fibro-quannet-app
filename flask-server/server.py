from flask import Flask, jsonify, request
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from prognosis_prediction import run_prediction
from io import BytesIO
import pandas as pd

app = Flask(__name__)
CORS(app, supports_credentials=True)

ALLOWED_EXTENSIONS = set(['zip', 'csv'])
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Prognosis prediction route
@app.route('/predict', methods=['POST'])
def prognosis():
    # check if the post request has the file part
    if 'files[]' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
  
    files = request.files.getlist('files[]')
      
    errors = {}
    success = False
      
    for file in files:      
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            success = True
        else:
            resp = jsonify({
                "message": 'File type is not allowed',
                "status": 'failed'
            })
            return resp
         
    if success and errors:
        errors['message'] = 'Something went wront!'
        errors['status'] = 'failed'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        returnFile = run_prediction(files)
        print(returnFile)
        data = pd.read_csv(returnFile)
        data = data.to_json(orient='records')
        resp = jsonify(data)
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp

if __name__ == "__main__":
    app.run(port=8000, debug=True)
