def how_many(aDict):
    '''
    counts how many values are in a dictionary
    '''
    count = 0
    for x in aDict:
        for y in aDict[x]:
            print(y)
            count = count + 1
    return count

def biggest(aDict):
    '''
    returns the dictionary entry with the largest value
    '''
    largestValue = 0
    largestValueKey = 0  
    for x in aDict:
        for y in aDict[x]:
            if len(y) > largestValue:
                largestValue = len(y)
                largestValueKey = x
    return x



animals = { 'a': ['aardvark'], 'b': ['baboon'], 'c': ['coati']}

animals['d'] = ['donkey']
animals['d'].append('dog')
animals['d'].append('dingo')

print(how_many(animals))
print(biggest(animals))