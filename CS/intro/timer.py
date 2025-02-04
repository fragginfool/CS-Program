import time

def c_to_f(c):
    time.sleep(2) #added so that we can actually see a difference in time...couldn't see it before.
    return c*9/5 + 32

t0 = time.time()
c_to_f(100000)
t1 = time.time() - t0
print("t =", t0, ":", t1, "s,")

#C:\Users\JoshF\OneDrive\Desktop\CS-Program\Intro-CS\Intro-Week1