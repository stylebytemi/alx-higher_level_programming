#!/usr/bin/python3
# -*- coding: utf-8 -*_
"""A script that:
- takes your GitHub credentials (username and password)
- uses the GitHub API to display your id
"""
from requests import get
from requests.auth import HTTPBasicAuth
from sys import argv

if __name__ == "__main__":
    url = 'https://api.github.com/user'
    username = argv[1]
    password = argv[2]
    response = get(url, auth=HTTPBasicAuth(username, password))
    try:
        obj = response.json()
        print(obj.get('id'))
    except ValueError:
        print(None)
