
# Hangman game
#

# -----------------------------------
# Helper code
# You don't need to understand this helper code,
# but you will have to know how to use the functions
# (so be sure to read the docstrings!)

import random

WORDLIST_FILENAME = "Week2\words.txt"

def loadWords():
    """
    Returns a list of valid words. Words are strings of lowercase letters.
    
    Depending on the size of the word list, this function may
    take a while to finish.
    """
    print("Loading word list from file...")
    # inFile: file
    inFile = open(WORDLIST_FILENAME, 'r')
    # line: string
    line = inFile.readline()
    # wordlist: list of strings
    wordlist = line.split()
    print("  ", len(wordlist), "words loaded.")
    return wordlist

def chooseWord(wordlist):
    """
    wordlist (list): list of words (strings)

    Returns a word from wordlist at random
    """
    return random.choice(wordlist)

# end of helper code
# -----------------------------------

# Load the list of words into the variable wordlist
# so that it can be accessed from anywhere in the program
wordlist = loadWords()

def isWordGuessed(secretWord, lettersGuessed):
    '''
    secretWord: string, the word the user is guessing
    lettersGuessed: list, what letters have been guessed so far
    returns: boolean, True if all the letters of secretWord are in lettersGuessed;
      False otherwise
    '''
    solved = False
    secretWordList = list(secretWord)
    if "_" not in getGuessedWord(secretWord, lettersGuessed):
        solved = True
        return solved
    #for letter in secretWordList:
    #    if letter in lettersGuessed:
    #        print(letter)
    #        continue
    #    else:
    #        solved = False
    #        break
    #    return solved
    



def getGuessedWord(secretWord, lettersGuessed):
    '''
    secretWord: string, the word the user is guessing
    lettersGuessed: list, what letters have been guessed so far
    returns: string, comprised of letters and underscores that represents
      what letters in secretWord have been guessed so far.
    '''
    
    word = ""
    #if secretword letter in letters guessed, fill-in spot with letter.
    for letter in secretWord:
        if letter in lettersGuessed:
            word = word + letter

        else:
            word = word + "_"
    return word


def getAvailableLetters(lettersGuessed):
    '''
    lettersGuessed: list, what letters have been guessed so far
    returns: string, comprised of letters that represents what letters have not
      yet been guessed.
    '''
    lettersNotGuessed = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]
    for letter in lettersGuessed:
        if letter in lettersNotGuessed:
            lettersNotGuessed.remove(letter)
    joinedLettersNotGuessed = ",".join(lettersNotGuessed)
    return lettersNotGuessed
    

def hangman(secretWord):
    '''
    secretWord: string, the secret word to guess.

    Starts up an interactive game of Hangman.

    * At the start of the game, let the user know how many 
      letters the secretWord contains.

    * Ask the user to supply one guess (i.e. letter) per round.

    * The user should receive feedback immediately after each guess 
      about whether their guess appears in the computers word.

    * After each round, you should also display to the user the 
      partially guessed word so far, as well as letters that the 
      user has not yet guessed.

    Follows the other limitations detailed in the problem write-up.
    '''
    #how many letters in the secretWord? Print underscores and guessed letters
    lettersGuessed = []
    guesses = 0
    print(getGuessedWord(secretWord, lettersGuessed))
    guessing = True
    while guessing:
        guess = input("What letter would you like to choose?\n")
        if guess not in lettersGuessed:
            lettersGuessed.append(guess)
            guesses = guesses + 1
        print(getGuessedWord(secretWord, lettersGuessed) + "\n")
        if isWordGuessed(secretWord, lettersGuessed):
            guessing = False
            print("You did it!")
            break
        print("Letters guessed so far:\n" + str(lettersGuessed) + "\n")


    
    #did their guess appear in the word? Return word with underscores 
    #and what they have guessed.

    







# When you've completed your hangman function, uncomment these two lines
# and run this file to test! (hint: you might want to pick your own
# secretWord while you're testing)

secretWord = chooseWord(wordlist).lower()
hangman(secretWord)