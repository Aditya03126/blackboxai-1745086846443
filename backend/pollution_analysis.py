def simulate_pollution_levels(sensor_data):
    """
    Simulate pollution level analysis based on sensor data.
    sensor_data is a dict with keys: pm25, pm10, no2, co, ozone
    """
    pm25 = sensor_data.get("pm25", 0)
    pm10 = sensor_data.get("pm10", 0)
    no2 = sensor_data.get("no2", 0)
    co = sensor_data.get("co", 0)
    ozone = sensor_data.get("ozone", 0)

    # Simple pollution index calculation (weighted sum)
    pollution_index = 0.4 * pm25 + 0.3 * pm10 + 0.1 * no2 + 0.1 * co + 0.1 * ozone

    if pollution_index < 50:
        pollution_level = "Good"
    elif pollution_index < 100:
        pollution_level = "Moderate"
    elif pollution_index < 150:
        pollution_level = "Unhealthy for Sensitive Groups"
    elif pollution_index < 200:
        pollution_level = "Unhealthy"
    elif pollution_index < 300:
        pollution_level = "Very Unhealthy"
    else:
        pollution_level = "Hazardous"

    return pollution_level

if __name__ == "__main__":
    # Test with sample sensor data
    sample_data = {"pm25": 40, "pm10": 30, "no2": 20, "co": 10, "ozone": 5}
    level = simulate_pollution_levels(sample_data)
    print(f"Pollution Level: {level}")
