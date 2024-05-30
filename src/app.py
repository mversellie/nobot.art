from flask import Flask
import content_service

app = Flask(__name__)

@app.errorhandler(404)
def not_found_error(error):
    print("404")
    return app.send_static_file("index.html")

@app.route('/content/<content_id>')
def getContentById(content_id):
    response = app.response_class(
        response=content_service.get_content_by_id(content_id),
        status=200,
        mimetype='application/json'
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run()