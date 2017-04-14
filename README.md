# Projekt 2 - P16

A React project setup

#### Backend

##### Create a virtual environment

```bash
virtualenv --no-site-packages --distribute .env
```

##### Activate the virtual environment

```bash
source .env/bin/activate
```

##### Install requirements

```bash
pip install -r requirements.txt
```

##### Run server
After activating the virtual environment run:
```bash
python server/app.py
```
And open ```localhost:5000``` in browser

#### Frontend


##### Install packages
If npm is not installed, install it from: https://nodejs.org/en/

or with homebrew:

```bash
brew install node
```

To set-up project go to the application folder
```bash
cd application
``
Now you can install all the required components by running
```bash
npm install
```

##### Build and start dev server
To build the project run:
```bash
npm start
```

This will build the project and start a dev server on localhost:8080 with the application.
The page is reloaded automagically on any change.
