from flask import jsonify, request
import numpy as np
import time
import cv2
import os
import pandas as pd
import random

# value setting for confidence threshold 
confthres=0.5
# value setting for non max suppression threshold
nmsthres=0.1
model_path="./"

def get_labels(labels_path):
    lpath=os.path.sep.join([model_path, labels_path])
    LABELS = open(lpath).read().strip().split("\n")
    return LABELS

def get_colors(LABELS):
    np.random.seed(42)
    COLORS = np.random.randint(0, 255, size=(len(LABELS), 3),dtype="uint8")
    return COLORS

def get_weights(weights_path):
    weightsPath = os.path.sep.join([model_path, weights_path])
    return weightsPath

def get_config(config_path):
    configPath = os.path.sep.join([model_path, config_path])
    return configPath

def load_model(configpath,weightspath):
    print("[INFO] loading YOLO from disk...")
    net = cv2.dnn.readNetFromDarknet(configpath, weightspath)
    return net

def get_predection(image,net,LABELS,COLORS):
    (H, W) = image.shape[:2]

    ln = net.getLayerNames()
    ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
                                 swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    print(layerOutputs)
    end = time.time()

    print("[INFO] QuanNet took {:.6f} seconds".format(end - start))

    boxes = []
    confidences = []
    classIDs = []
    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]

            if confidence > confthres:
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")
                
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classIDs.append(classID)

    idxs = cv2.dnn.NMSBoxes(boxes, confidences, confthres,
                            nmsthres)


    if len(idxs) > 0:
        for i in idxs.flatten():
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])

            color = [int(c) for c in COLORS[classIDs[i]]]
            cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
            text = "{}: {:.4f}".format(LABELS[classIDs[i]], confidences[i])
            print("Final bounding box co-ordinates")
            print(boxes)
            print("Final class ID")
            print(classIDs)
            print("Final confidence score")
            print(confidences)
            cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,0.5, color, 2)
    return image

def run_prediction(files):
    metadataPath = ""
    timeSchedule = random.randint(15, 20)
    zipPath = ""
    patientID = ""
    for file in files:      
        fileType = file.filename.split(".")[1]
        if (fileType == "csv"):
            metadataPath = "static/uploads/" + file.filename
        elif (fileType == "zip"):
            zipPath = "static/uploads/" + file.filename
    data = pd.read_csv(metadataPath, usecols=[0])
    for patient in data:
        patientID = patient+"-data"
        patientID = "test-data/test/"+patientID+"/predictions.csv"
    time.sleep(timeSchedule)
    # image = cv2.imread(img)
    # labelsPath="./classes.names"
    # cfgpath="cfg/yolov3_custom.cfg"
    # wpath="yolov3_custom_best.weights"
    # Lables=get_labels(labelsPath)
    # CFG=get_config(cfgpath)
    # Weights=get_weights(wpath)
    # nets=load_model(CFG,Weights)
    # Colors=get_colors(Lables)
    # res=get_predection(image,nets,Lables,Colors)
    return patientID