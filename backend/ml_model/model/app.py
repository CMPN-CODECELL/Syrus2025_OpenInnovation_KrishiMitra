from flask import Flask, request, jsonify
import pickle
import numpy as np

# Load trained model
with open('crop_model.pkl', 'rb') as f:
    model = pickle.load(f)

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features)
    return jsonify({'recommendations': prediction.tolist()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
