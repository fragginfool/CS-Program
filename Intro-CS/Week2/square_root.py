#!/usr/bin/python3

def sqrt_newton_raphson(number, tolerance=1e-10):
    if number < 0:
        return "Cannot compute the square root of a negative number."
    elif number == 0:
        return 0
    else:
        guess = number
        while True:
            next_guess = 0.5 * (guess + number / guess)
            if abs(next_guess - guess) < tolerance:
                return next_guess
            guess = next_guess

# Example usage:
result = sqrt_newton_raphson(16)
print(result)  # Output: 4.0 (approximately)

