from models import Function2D, Function3D


def test_2d_function():
    f2d = Function2D(function="x^2", interval_x={"a": 0, "b": 10})
    f2d.create_mesh()
    x_value = f2d.mesh.get('x')[5]
    y_value = f2d.mesh.get('y')[5]
    print(f2d.mesh)
    assert (x_value ** 2) == y_value


def test_3d_function():
    f3d = Function3D(function="x^2+y", interval_x={"a": 0, "b": 10}, interval_y={"a": 0, "b": 10})
    f3d.create_mesh()
    x_value = f3d.mesh.get('x')[2][2]
    y_value = f3d.mesh.get('y')[2][2]
    z_value = f3d.mesh.get('z')[2][2]
    print(f3d.mesh)
    assert (x_value ** 2 + y_value) == z_value


if __name__ == '__main__':
    test_2d_function()
    test_3d_function()
