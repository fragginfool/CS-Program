from playwright.sync_api import sync_playwright

def test_calendar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 1024})

        # Navigate to home page
        page.goto("http://localhost:3000")

        # Wait for calendar widget to load
        page.wait_for_selector("text=Su")

        # Give it a tiny bit of time to fetch goals if any exist in the dev DB
        page.wait_for_timeout(2000)

        # In case we need to add a goal for today to ensure it shows up:
        # Instead, we just click the 15th of the month and see if the modal opens.
        # Find the div containing '15'
        day_15 = page.locator("div.h-8.w-8", has_text="15")

        # Try to click it if it exists
        if day_15.count() > 0:
            day_15.first.click()
            page.wait_for_timeout(1000)

        # Take screenshot
        page.screenshot(path="calendar_goals.png")

        browser.close()

if __name__ == "__main__":
    test_calendar()
