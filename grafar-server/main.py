import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import Function2D, Function3D

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True)


@app.get("/")
async def get_server_health():
    return {"success": True, "message": "GRAFAR server running"}


@app.post("/function/2d")
async def create_2d_function_mesh(function_2d: Function2D):
    print(function_2d)
    function_2d.create_mesh()
    print(function_2d)
    return {"success": True, "data": function_2d, "message": "successfully create 2D mesh"}


@app.post("/function/3d")
async def create_3d_function_mesh(function_3d: Function3D):
    print(function_3d)
    function_3d.create_mesh()
    print(function_3d)
    return {"success": True, "data": function_3d, "message": "successfully create 3D mesh"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000, reload=True)


