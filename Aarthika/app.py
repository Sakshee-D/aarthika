from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
import bcrypt


app = Flask(__name__)
CORS(app)

# Database Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="aarthika"
)
cursor = db.cursor()

# Check if the connection was successful
try:
    db.ping(reconnect=True)
    print("Connected to the database.")
except mysql.connector.Error as err:
    print("Error connecting to MySQL:", err)



# Home Route
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to Aarthika API!"})

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    try:
        cursor.execute("SELECT pin FROM users WHERE aadhar=%s", (data['aadhar'],))
        result = cursor.fetchone()
        if result:
            stored_hashed_pin = result[0].encode()
            if bcrypt.checkpw(data['pin'].encode(), stored_hashed_pin):
                return jsonify({"message": "Login Successful"})
            else:
                return jsonify({"message": "Invalid Aadhaar or PIN"}), 401
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"message": "An error occurred during login"}), 500

# Register Route
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    try:
        salt = bcrypt.gensalt()
        hashed_pin = bcrypt.hashpw(data['pin'].encode(), salt)
        cursor.execute("INSERT INTO users (aadhar, pin) VALUES (%s, %s)", (data['aadhar'], hashed_pin))
        db.commit()
        return jsonify({"message": "Registration Successful"})
    except mysql.connector.Error as e:
        return jsonify({"message": "User already exists"}), 400




# Dashboard Route
@app.route('/dashboard', methods=['GET'])
def dashboard():
    try:
        cursor.execute("SELECT balance FROM accounts WHERE user_id = 1")
        balance = cursor.fetchone()[0] if cursor.rowcount > 0 else 0
        cursor.execute("""
            SELECT id, description, amount, date
            FROM transactions
            WHERE user_id = 1
            ORDER BY date DESC
            LIMIT 5
        """)
        transactions = cursor.fetchall()
        recent_transactions = [
            {"id": t[0], "description": t[1], "amount": t[2], "date": t[3].strftime("%Y-%m-%d")}
            for t in transactions
        ]
        return jsonify({"balance": balance, "transactions": recent_transactions})
    except Exception as e:
        return jsonify({"error": "An error occurred while fetching dashboard data"}), 500

# Password Validation Route
@app.route('/validate_password', methods=['POST'])
def validate_password():
    data = request.json
    aadhar = data.get('aadhar')  # Aadhar number of the user
    pin = data.get('pin')  # PIN entered by the user

    try:
        # Fetch the stored hashed PIN for the provided Aadhar number
        cursor.execute("SELECT pin FROM users WHERE aadhar=%s", (aadhar,))
        result = cursor.fetchone()

        if result:
            stored_hashed_pin = result[0].encode()  # Fetch the hashed PIN from the database

            # Check if the entered PIN matches the stored hashed PIN
            if bcrypt.checkpw(pin.encode(), stored_hashed_pin):
                return jsonify({"success": True}), 200  # Password is correct
            else:
                return jsonify({"success": False, "message": "Invalid PIN"}), 401  # Invalid PIN
        else:
            return jsonify({"success": False, "message": "User not found"}), 404  # User not found

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500  # Handle errors

if __name__ == '__main__':
    app.run(debug=True)

# Add Budget Route
@app.route('/add_budget', methods=['POST'])
def add_budget():
    data = request.json
    user_id = data['user_id']
    goal = data['goal']
    total_amount = data['total_amount']
    expense = data['expense']
    savings = data['savings']
    
    try:
        cursor.execute("""
            INSERT INTO budget (user_id, goal, total_amount, expense, savings)
            VALUES (%s, %s, %s, %s, %s)
        """, (user_id, goal, total_amount, expense, savings))
        db.commit()
        return jsonify({"message": "Budget data added successfully"}), 201
    except Exception as e:
        return jsonify({"message": "Error adding budget data"}), 500

# Update Budget Route
@app.route('/update_budget', methods=['PUT'])
def update_budget():
    data = request.json
    user_id = data['user_id']
    goal = data['goal']
    total_amount = data['total_amount']
    expense = data['expense']
    savings = data['savings']
    
    try:
        cursor.execute("""
            UPDATE budget 
            SET goal = %s, total_amount = %s, expense = %s, savings = %s 
            WHERE user_id = %s
        """, (goal, total_amount, expense, savings, user_id))
        db.commit()
        return jsonify({"message": "Budget data updated successfully"})
    except Exception as e:
        return jsonify({"message": "Error updating budget data"}), 500

# Delete Budget Route
@app.route('/delete_budget/<int:user_id>', methods=['DELETE'])
def delete_budget(user_id):
    try:
        cursor.execute("DELETE FROM budget WHERE user_id = %s", (user_id,))
        db.commit()
        return jsonify({"message": "Budget data deleted successfully"})
    except Exception as e:
        return jsonify({"message": "Error deleting budget data"}), 500

if __name__ == '__main__':
    app.run(debug=True)