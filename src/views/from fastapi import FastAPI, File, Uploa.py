from fastapi import FastAPI, File, UploadFile

from torchvision.io import read_image

import torch.nn as nn

from torchvision import transforms

import torchvision.models as models

import torch

import shutil

import uvicorn




app = FastAPI()




class CustomMobileNet(nn.Module):

    def __init__(self, num_classes):

        super(CustomMobileNet, self).__init__()

        self.mobilenet = models.mobilenet_v3_large(pretrained=True)

        self.mobilenet.classifier[-1] = nn.Linear(1280, num_classes)

   

    def forward(self, x):

        x = self.mobilenet(x)

        return x




model = CustomMobileNet(1)

model.load_state_dict(torch.load('C:/Users/akuma/Downloads/model (1).pth'))

model.eval()




@app.get("/upload-image")

async def upload_image(image: UploadFile = File(...)):

    return image




@app.post('/predict')

async def predict(data: UploadFile = File(...)):

    transform = transforms.Compose([transforms.Resize((150,150)),])

    image = read_image(await data.read())

    image = transform(image)/255.

    image = image[None,:]




    with torch.no_grad():

        m = nn.Sigmoid()

        prediction = model(model(image))

   

    if m(prediction) >= 0.5:

        string = "cho"

    else:

        string = "meo"

   

    return {'prediction': string}




if __name__ == '__main__':

    uvicorn.run(app, host = '127.0.0.1', port = 8000)