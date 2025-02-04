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



#inductive reasoning
#0 + 1 + 2 + 3...+n = (n(n+1))/2


def gcdIter(a,b):
    '''
    largest integer that divides into each without an remainder

    '''
    if a > b:
        smaller = b
        larger = a
    else: 
        smaller = a
        larger = b
    iterSmaller = smaller
    if larger % smaller == 0:
        answer = smaller
    else:
        while iterSmaller > 0:
            if larger % iterSmaller == 0:
                if smaller % iterSmaller == 0:
                    answer = iterSmaller
            iterSmaller = iterSmaller - 1
        
    
    return answer

 
#then, with recursion:

def gcdRecur(a,b):
    '''
    Uses recursion by:
    multiples of the smaller number are subtraced from the larger number until the remainder is less than the smaller number
    then...multiples of 147 are subracted from the smaller number until the remainder is less than the remainder
    those remainders are then subtracted from that remainder until no remainder exists:

    0:smaller number into bigger number (collect remainder)
    1: remainder into smaller number (collect that remainder)
    2: remainder 2 into remainder 1 leaves no remainder (we are done, remainder 2 is the answer)

    larger = q0 * smaller + remainder
    or
    remainder = larger % smaller
    or
    while remainder > 0:
        remainder = number1 % number2
        number1 = number2
        number2 = remainder
    return number1
    
    '''

    if b == 0:
        return a
    
    return gcdRecur(b, a % b)


print(gcdRecur(100, 25))


