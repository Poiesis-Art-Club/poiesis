from pathlib import Path

from PIL import Image


SOURCE = Path("/home/ubuntu/webdev-static-assets/poiesis-gothic-code-frame.png")
OUTPUT = Path("/home/ubuntu/webdev-static-assets/poiesis-gothic-code-frame-clean.png")


def alpha_from_black_background(red: int, green: int, blue: int) -> int:
    """Make only the near-black photographic background transparent.

    The supplied ornament was photographed against black. A short fade retains
    its antialiased metallic edges while removing the solid background.
    """
    brightness = max(red, green, blue)
    if brightness <= 12:
        return 0
    if brightness >= 58:
        return 255
    return round((brightness - 12) * 255 / 46)


def main() -> None:
    image = Image.open(SOURCE).convert("RGBA")
    cleaned = []
    for red, green, blue, _ in image.getdata():
        alpha = alpha_from_black_background(red, green, blue)
        if 0 < alpha < 255:
            # The original was composited over black: lift edge colours so they
            # do not leave a dark fringe when placed on parchment.
            scale = min(255 / alpha, 3.4)
            red = min(255, round(red * scale))
            green = min(255, round(green * scale))
            blue = min(255, round(blue * scale))
        cleaned.append((red, green, blue, alpha))
    image.putdata(cleaned)
    image.save(OUTPUT, format="PNG", optimize=True)


if __name__ == "__main__":
    main()
