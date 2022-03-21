import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from tensorflow.keras.optimizers import SGD
# nltk.download('punkt')
# nltk.download('wordnet')
# nltk.download('omw-1.4')
try:
    # djngo server when run so it will accept this pass so ignore the error
    from path import *
except:
    from ...path import *
    print("pathpy err")


# lemmatizer = WordNetLemmatizer()
# intents = json.loads(open('C:/xampp1/htdocs/AI_Chat_bot/AIC/AIC_APP/training/intents.json').read())


import os

# lemmatizer = WordNetLemmatizer()
# intents = json.loads(open('intents.json').read())
#
# words=[]
# classes=[]
# documents=[]
# ignore_letters={'?','!','.',','}
#
#
# for intent in intents['intents']:
#     for pattern in intent['patterns']:
#         word_list = nltk.word_tokenize(pattern)
#         words.extend(word_list)
#         documents.append((word_list,intent['tag']))
#         if intent['tag'] not in classes:
#             classes.append(intent['tag'])
#
# words=[lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
# words=sorted(set(words))
#
#
# classes=sorted(set(classes))
#
# pickle.dump(words,open('words.pkl','wb'))
# pickle.dump(classes,open('classes.pkl','wb'))
#
# training=[]
# output_empty=[0]*len(classes)
#
# for document in documents:
#     bag=[]
#     word_patterns=document[0]
#     word_patterns=[lemmatizer.lemmatize(word.lower()) for word in word_patterns]
#     for word in words:
#         bag.append(1) if word in word_patterns else bag.append(0)
#
#     output_row=list(output_empty)
#     output_row[classes.index(document[1])]=1
#     training.append([bag, output_row])
#
# random.shuffle(training)
# training =np.array(training)
#
# train_x=list(training[:,0])
# train_y=list(training[:,1])
#
# model=Sequential()
# model.add(Dense(128,input_shape=(len(train_x[0]),),activation="relu"))
# model.add(Dropout(0.5))
# model.add(Dense(64,activation="relu"))
# model.add(Dropout(0.5))
# model.add(Dense(len(train_y[0]),activation='softmax'))
# sgd=SGD(lr=0.01, decay=1e-6, momentum=0.9,nesterov=True)
# model.compile(loss='categorical_crossentropy',optimizer=sgd)
#
# hist = model.fit(np.array(train_x),np.array(train_y),epochs=200,batch_size=5,verbose=1)
# curr = os.getcwd()
# model.save((f"{curr}{os.sep}modelData{os.sep}chatbotmodel.h5"), hist)
# print("Sucess")


def trainTheChatBot():
    lemmatizer = WordNetLemmatizer()
    intents = json.loads(open(find_file_name("intents.json", STATIC__AIC_APP_PATH)).read())

    words = []
    classes = []
    documents = []
    ignore_letters = {'?', '!', '.', ','}

    for intent in intents['intents']:
        for pattern in intent['patterns']:
            word_list = nltk.word_tokenize(pattern)
            words.extend(word_list)
            documents.append((word_list, intent['tag']))
            if intent['tag'] not in classes:
                classes.append(intent['tag'])

    words = [lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
    words = sorted(set(words))

    classes = sorted(set(classes))

    pickle.dump(words, open(find_file_name("words.pkl", TRAINING_FOLDER_PATH), 'wb'))
    pickle.dump(classes, open(find_file_name("classes.pkl", TRAINING_FOLDER_PATH), 'wb'))

    training = []
    output_empty = [0] * len(classes)

    for document in documents:
        bag = []
        word_patterns = document[0]
        word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
        for word in words:
            bag.append(1) if word in word_patterns else bag.append(0)

        output_row = list(output_empty)
        output_row[classes.index(document[1])] = 1
        training.append([bag, output_row])

    random.shuffle(training)
    training = np.array(training)

    train_x = list(training[:, 0])
    train_y = list(training[:, 1])

    model = Sequential()
    model.add(Dense(128, input_shape=(len(train_x[0]),), activation="relu"))
    model.add(Dropout(0.5))
    model.add(Dense(64, activation="relu"))
    model.add(Dropout(0.5))
    model.add(Dense(len(train_y[0]), activation='softmax'))
    sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
    model.compile(loss='categorical_crossentropy', optimizer=sgd)

    hist = model.fit(np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1)
    curr = os.getcwd()
    model.save('C:/Users/patel/PycharmProjects/AIChatBot/AIC/AIC_APP/training/modelData/chatbotmodel.h5', hist)
    print("Sucess")

if __name__ == '__main__':
    trainTheChatBot()

