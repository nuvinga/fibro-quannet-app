# Fibro-QuanNet - Codebase

Researched & Developed By: Nuvin Godakanda Arachchi

Fibro-QuanNet is a Pulmonary Fibrosis Prognosis Prediction application utilizing
Quantum Machine Learning to accurately predict the likely prognosis of PF
(Pulmonary Fibrosis).

This code was developed as partial completion of my BEng (Hons) Software
Engineering degree program at the University of Westminster.

The full thesis paper can be found on
[ResearchGate](http://dx.doi.org/10.13140/RG.2.2.25905.76642/1).

More information into the project can be found on my
[Fibro-QuanNet](https://github.com/nuvinga/fibro-quannet) repository.

## General Overview

This application utilises a Quantum Varariational Circuit as a
layer on a Classical Multiple Quantile Regression machine learning
model, which has proven (through the thesis linked above) to increase
model accuracy and robustness measured through Laplace-Loglikelihood
evaluation matrix and MRSE and MSE scores.

The model utilises the [OSIC Pulmonary Fibrosis Dataset](https://www.osicild.org/) for training and basic testing of the model performance.

## How to run Fibro-QuanNet

The application consists of three main components

<ul>
  <li>
    <b><code>quantum-notebook</code></b> - The Jupyter Notebook file for the models development 
    <i>(Using JetBrains: DataSpell)</i>
  </li>
  <li>
    <b><code>fibro-quannet-frontent</code></b> - The JavaScript based
    React frontend application
    <i>(Using Visual Studio Code)</i>
  </li>
  <li>
    <b><code>flask-server</code></b> - Python based Flask API gateway
    <i>(Using Visual Studio Code)</i>
  </li>
</ul>

How to work with and run each component will be explained below.

### <code>quantum-noteboot</code>

The notebook acts as a simple Jupyter Notebook, run using JetBrains:
DataSpell (Ultimate Edition) using <code>anaconda3</code> and
<code>python3</code>. In order to run the notebook and recreate
the results, follow the following steps:

<ol>
  <li>
    Add the <a href="https://www.osicild.org/">OSIC Pulmonary Fibrosis Dataset</a>
    into the <code>osic-pulmonary-fibrosis-progression</code> folder
  <li>
    Add the <a href="https://www.kaggle.com/datasets/paulmreese/osic-cached-dataset">OSIC Cached Dataset (Latency Encoded)</a>
    available through Kaggle into the <code>osic-cached-dataset</code>
    folder.
</ol>

If you wish to train the model, you will need to run the notebook
from the imports and generate the neccessary weight exports (output
on to the <code>working</code> directory).

### <code>fibro-quannet-frontent</code>

This is a React-JS application, thus the normal steps to run a react
app using NPM would work here.

Install the node-modules initially, and <code>npm run start</code> to
start the localhost server.

<b>Make sure you have already started the Flask-Server before starting
the React App</b>

### <code>fibro-quannet-frontent</code>

This is also a basic flask server application. The virual envioronment 
<code>venv</code> can be source activated and have the <code>
server.py</code> hosted.

## Codebase utilization disclaimer

This codebase has been submmitted to the Turn-it-in global referencing
scheme in 2023. Thus, utilizing this code directly in any acedemic 
work can result in plagiarism.
