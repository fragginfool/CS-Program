def isPalindrome():
    """
    returns boolean
    checks to see if a string is a palindrome

    """

    def toChars (s):
        s = s.lower()
        answ = ''
        for c in s:
            if c in 'abcdefghijklmn0pqrstuvwxyz':
                ans = ans + c
        return ans
    
    def isPal (s):
        if len(s) <=1:
            return True
        else:
            return s[0] == s[-1] and isPal (s[1:-1])
    
    return isPal(toChars(s))




