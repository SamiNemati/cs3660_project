import httpx
import json
import os
import time
from model_main import transactions_add

fakepay_URL = "https://cs3660.xyz/fakepay"
token_file = "dat/fakepay_token.json"

def pay_order(amount):
    token = fakepay_token()
    #print(f"token: {token}")
    amountfloat = float(amount)
    full_path = f"{fakepay_URL}/checkout/orders"
    #print(f"fullpath: {full_path}")

    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": f"{amountfloat:.2f}"
                }
            }
        ]
    }
    try:
        with httpx.Client() as client:
            response = client.post(full_path, headers=headers, json=data)
            response.raise_for_status()
            data = response.json()
            #print(data)
            #print("it got here.")
            return data.get("id")
    except Exception as e:
        #print("failed.")
        return e
    
def pay_capture(orderid, amount, cardinfo, userid):
    token = fakepay_token()
    full_path = f"{fakepay_URL}/checkout/orders/{orderid}"
    headers= {"Authorization": f"Bearer {token}"}
    data = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": f"{amount}"
                }
            }
        ],
        "payment_source": {"card": cardinfo}
    }
    try:
        with httpx.Client() as client:
            response = client.post(full_path, headers=headers, json=data)
            result = response.json()
            transactions_add(userid, "charge", amount, "", "card", cardinfo.get("number"))
            return result
    except Exception as e:
        return e

def fakepay_token():
    username = "student11"
    password = "I7MAwdYdMSYJA"

    if os.path.exists(token_file) and os.path.getsize(token_file) != 0:
        with open(token_file, "r") as f:
            data = json.load(f)
            token = data.get("access_token")
            expiration_time = data.get("expiration_time")
            if time.time() < expiration_time:
                #print("not expired")
                return token

    path = f"{fakepay_URL}/oauth2/token"
    with httpx.Client() as client:
        response = client.post(
            path,
            auth=(username, password),
            data={"grant_type": "client_credentials"},
            headers={"Accept": "application/json"}
        )
        response.raise_for_status()
        data = response.json()
        token = data["access_token"]
        exipration_time = data["expires_in"] + time.time()

    access_token = {
        "access_token": token,
        "expiration_time": exipration_time
    }
    with open(token_file, "w") as f:
        json.dump(access_token, f)
        #print("new token saved.")
    return token


