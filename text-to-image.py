""" from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Hugging Face API bilgileri
HF_API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4"
HF_API_TOKEN = "TUj0pscjXn219atsqO5wKJ1aEgRGWd1q"

# Ana sayfa (prompt ile resim oluştur)
@app.route('/generate', methods=['POST'])
def generate_image():
    prompt = request.json.get('prompt')

    headers = {
        "Authorization": f"Bearer {HF_API_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "inputs": prompt,
        "options": {
            "wait_for_model": True
        }
    }

    # Hugging Face API'ye istek gönderme
    response = requests.post(HF_API_URL, headers=headers, json=data)

    if response.status_code == 200:
        # API'den dönen görüntüyü alıyoruz (Base64 formatında)
        image_data = response.content
        return jsonify({'image': image_data.decode('utf-8')})
    else:
        return jsonify({"error": "Bir hata oluştu"}), response.status_code


if __name__ == '__main__':
    app.run(debug=True)

 """


from flask import Flask, request, jsonify
import requests
import base64

app = Flask(__name__)

# Hugging Face API bilgileri
API_URL = "https://api.deepinfra.com/v1/inference/CompVis/stable-diffusion-v1-4"
API_TOKEN = "TUj0pscjXn219atsqO5wKJ1aEgRGWd1q"  # Token'ınızı buraya ekleyin

@app.route('/generate', methods=['POST'])
def generate_image():
    # JSON verisinden prompt'u al
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "Prompt field is required"}), 400

    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }
    request_data = {
        "prompt": prompt  # API'nin beklediği veri formatını kullanın
    }

    # API'ye POST isteği gönderme
    response = requests.post(API_URL, headers=headers, json=request_data)

    if response.status_code == 200:
        # API'den dönen görüntüyü base64 formatında döndürme
        image_data = response.content
        image_base64 = base64.b64encode(image_data).decode('utf-8')
        return jsonify({'image': image_base64})
    else:
        return jsonify({"error": f"Bir hata oluştu: {response.status_code} - {response.text}"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
