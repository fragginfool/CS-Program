vowelList = ['a','e','i','o','u']
s = list(input("Please input the string you wish to look for vowels:\n"))
print(s)
vowelCount = 0
for x in s:
    if x in vowelList:
        vowelCount = vowelCount + 1
    
print("Number of vowels: " + str(vowelCount))
