from flask import Flask

app = Flask(__name__, static_folder='../throwback-webui/dist/throwback-webui/browser', static_url_path="/")

@app.errorhandler(404)
def not_found_error(error):
    print("404")
    return app.send_static_file("index.html")


@app.route('/',defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run()