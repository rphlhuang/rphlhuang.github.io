from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8000/", timeout=60000)

    # Triple-click the 'R' logo
    logo = page.locator('.logoR')
    logo.click()
    logo.click()
    logo.click()

    # Wait for the blog to load
    page.wait_for_selector('.desktop', timeout=30000)

    # Click the music icon
    music_icon = page.locator('.iconContainer:has-text("music") .iconImage')
    music_icon.click()
    time.sleep(1) # Give the window time to open

    # Click the grass_is_green icon using its alt text
    grass_icon = page.get_by_alt_text('grass_is_green')
    grass_icon.click()
    time.sleep(1) # Give the overlay time to open

    # Wait for the overlay to fully render
    overlay = page.locator('.music-overlay')
    expect(overlay).to_be_visible()

    # Check that the album art image is visible within the overlay
    album_art = overlay.locator('.album-art')
    expect(album_art).to_be_visible()

    # Take the final screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
