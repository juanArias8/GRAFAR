from typing import Any, Dict, List

import numpy as np
import sympy as sp
from pydantic import BaseModel


class Interval(BaseModel):
    a: float
    b: float


class Function(BaseModel):
    function: str
    interval_x: Interval
    points: int = 200
    mesh: Dict[str, List[Any]] = {}

    def get_step(self, interval: Interval):
        return (interval.b - interval.a) / self.points

    def get_symbols(self):
        return sp.Symbol('x'), sp.Symbol('y')

    def get_vector(self, interval: Interval):
        step = self.get_step(interval)
        return np.arange(interval.a, interval.b + 1, step)

    def create_function(self, symbols):
        return np.vectorize(sp.lambdify(symbols, sp.sympify(self.function)))


class Function2D(Function):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def create_mesh(self):
        vector_x = self.get_vector(self.interval_x)
        vector_y = self.evaluate_function_2d(vector_x)
        self.mesh = {
            "x": vector_x.tolist(),
            "y": vector_y.tolist()
        }

    def evaluate_function_2d(self, vector_x):
        symbol_x, _ = self.get_symbols()
        function_fx = self.create_function(symbol_x)
        return function_fx(vector_x)


class Function3D(Function):
    interval_y: Interval

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def create_mesh(self):
        vector_x = self.get_vector(self.interval_x)
        vector_y = self.get_vector(self.interval_y)
        vector_x, vector_y = np.meshgrid(vector_x, vector_y)
        vector_z = self.evaluate_function_3d(vector_x, vector_y)
        self.mesh = {
            "x": vector_x.tolist(),
            "y": vector_y.tolist(),
            "z": vector_z.tolist()
        }

    def evaluate_function_3d(self, vector_x, vector_y):
        symbol_x, symbol_y = self.get_symbols()
        function_fxy = self.create_function((symbol_x, symbol_y))
        return function_fxy(vector_x, vector_y)


if __name__ == '__main__':
    interval_x = Interval(a=10, b=10)
    print(interval_x.a)
