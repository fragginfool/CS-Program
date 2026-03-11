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
        page.wait_for_timeout(2000)

        # Find the calendar day element for today
        # the class should have 'bg-blue-600'
        today_element = page.locator("div.bg-blue-600")

        if today_element.count() > 0:
            today_element.first.click()
            page.wait_for_timeout(1000)

        # Take screenshot
        page.screenshot(path="calendar_goals_present3.png")

        browser.close()

if __name__ == "__main__":
    test_calendar()
