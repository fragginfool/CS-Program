#!/usr/bin/python3
def iterPower(base, exp):
    '''
    through iteration
    base: int or float.
    exp: int >= 0

    returns: int or float, base^exp

    '''
    iteration = exp -1
    workingNumber = base
    while iteration > 0:
        workingNumber = workingNumber * base
        iteration = iteration - 1
        print(iteration)
    return(workingNumber)




#HERE is where we use recursion:

def recurPower(base, exp):
    '''
    Here we use recursion to solve our problem
    '''
    #base case is when exp = 0
    #so:
    if exp <= 0:
        return 1
    
    #Remember x^y = x * x(y-1)
    return base * recurPower(base, exp -1)

print(recurPower(2, 3))

#inductive reasoning
