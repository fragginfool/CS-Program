#!/usr/bin/python3
import sys

import square_root

def evalQuadratic(a, b, c):
    '''
    a, b, c: numerical values for the coefficients of a quatratic equation
    x: numerical value at which to evaluate the quadratic
    x^2+b*x+c

    '''

    x1 = (-b + square_root.sqrt_newton_raphson(b**2 - (4*a-c)))/(2*a)
    x2 = (-b - square_root.sqrt_newton_raphson(b**2 - (4*a-c)))/(2*a)
    return (x1, x2)



print(evalQuadratic(2,3,4))
