def fibonacci(periods):

    '''
    assumes x an int >=0
    returns Fibonacci of x
    '''
    if periods == 0 or periods == 1:
        return 1
    else:
        return fibonacci(periods-1) + fibonacci(periods-2)    
    


print(fibonacci(25))