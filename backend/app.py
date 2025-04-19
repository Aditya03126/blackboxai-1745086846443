from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Simulated data storage
traffic_data = {
    "vehicle_count": 0,
    "congestion_level": "Low",
    "violations": []
}

pollution_data = {
    "pm25": 0,
    "pm10": 0,
    "no2": 0,
    "co": 0,
    "ozone": 0,
    "pollution_level": "Good"
}

@app.route('/')
def index():
    return "Drone-Assisted Traffic Monitoring and Pollution Control System Backend"

@app.route('/api/traffic', methods=['GET'])
def get_traffic_data():
    """
    Returns current traffic data including vehicle count and congestion level.
    """
    return jsonify(traffic_data)

@app.route('/api/pollution', methods=['GET'])
def get_pollution_data():
    """
    Returns current pollution data.
    """
    return jsonify(pollution_data)

@app.route('/api/violations', methods=['POST'])
def report_violation():
    """
    Receives traffic violation data including vehicle number plate, photo URL, helmet status.
    """
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    traffic_data["violations"].append(data)
    return jsonify({"message": "Violation reported successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
