from flask import Flask
import content_service

app = Flask(__name__, static_folder='../throwback-webui/dist/throwback-webui/browser', static_url_path="/")

@app.errorhandler(404)
def not_found_error(error):
    print("404")
    return app.send_static_file("index.html")


@app.route('/',defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")

@app.route('/api/content/<content_id>')
def getContentById(content_id):
    return content_service.get_content_by_id(content_id)

if __name__ == "__main__":
    app.run()