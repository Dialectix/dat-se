from flask import Flask, render_template, request, redirect, url_for, session
from dat_engine import run_dat_pipeline
import os
from dotenv import load_dotenv

# Load environment variables from .env if present (for local testing)
load_dotenv()

app = Flask(__name__)

# Use persistent secret key if defined, otherwise generate one (for local dev)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", os.urandom(24))

# Load credentials from environment
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "password")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session["username"] = username
            return redirect(url_for("index"))
        return "Invalid credentials", 403
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect(url_for("login"))

@app.route("/", methods=["GET", "POST"])
def index():
    if "username" not in session:
        return redirect(url_for("login"))

    if request.method == "POST":
        user_input = request.form.get("user_input")
        result = run_dat_pipeline(user_input)
        return render_template("index.html", user_input=user_input, **result)

    return render_template("index.html")

