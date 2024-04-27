def factorial(n):
    '''
    compute the factorial of n

    n * (n-1) * (n-2)...(1)

    '''
    if n == 1:
        return 1
    
    else: 
        return n*factorial(n-1)



print(factorial(3))