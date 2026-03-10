from playwright.sync_api import sync_playwright
import time
import subprocess
import os

def run_server():
    print("Starting Next.js server...")
    return subprocess.Popen(
        ["npm", "run", "dev", "--prefix", "waypoint"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

def wait_for_server():
    print("Waiting for server to start...")
    time.sleep(5)  # Wait for Next.js to start up

def main():
    server_process = run_server()
    wait_for_server()

    print("Running Playwright...")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        print("Navigating to Home...")
        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")
        time.sleep(2)  # Allow JS/animations to settle
        page.screenshot(path="right_sidebar_home.png", full_page=True)
        print("Screenshot saved to right_sidebar_home.png")

        browser.close()

    print("Stopping server...")
    server_process.terminate()
    server_process.wait()

if __name__ == "__main__":
    main()
