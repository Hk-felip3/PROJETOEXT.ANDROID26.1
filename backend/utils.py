import cv2
import numpy as np


def rectContour(contours):
    rectCon = []
    for i in contours:
        area = cv2.contourArea(i)
        if area > 30:
            parameters = cv2.arcLength(i, True)
            approx = cv2.approxPolyDP(i, 0.02 * parameters, True)
            if len(approx) == 4:
                rectCon.append(i)
    rectCon = sorted(rectCon, key=cv2.contourArea, reverse=True)
    return rectCon


def getCornerPoints(cont):
    parameters = cv2.arcLength(cont, True)
    approx = cv2.approxPolyDP(cont, 0.02 * parameters, True)
    return approx


def reorder(myPoints):
    myPoints = myPoints.reshape((4, 2))
    myPointsNew = np.zeros((4, 1, 2), np.int32)
    add = myPoints.sum(1)
    myPointsNew[0] = myPoints[np.argmin(add)]
    myPointsNew[3] = myPoints[np.argmax(add)]
    diff = np.diff(myPoints, axis=1)
    myPointsNew[1] = myPoints[np.argmin(diff)]
    myPointsNew[2] = myPoints[np.argmax(diff)]
    return myPointsNew


def splitBoxes(img):
    rows = np.vsplit(img, 14)
    boxes = []
    for r in rows:
        cols = np.hsplit(r, 5)
        for box in cols:
            boxes.append(box)
    return boxes


def showAnswers(img, myIndex, grading, gabarito, questions, choices):
    secW = int(img.shape[1] / choices)
    secH = int(img.shape[0] / questions)

    for x in range(0, questions):
        myAnswer = myIndex[x]
        cX = (myAnswer * secW) + secW // 2
        cY = (x * secH) + secH // 2

        if grading[x] == 1:
            myColor = (0, 255, 0)
        else:
            myColor = (0, 0, 255)

        cv2.circle(img, (cX, cY), 20, myColor, cv2.FILLED)
    return img