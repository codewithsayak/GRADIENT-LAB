# Gradient Lab

**Craft beautiful gradients. Create without limits.**
By [Code With Sayak]

Gradient Lab is a premium, browser-based CSS gradient design studio. It allows developers and designers to create, customize, preview, and export beautiful linear, radial, and conic gradients without any coding required.

## Features

- **Live Real-time Preview:** See your gradient changes instantly. Full-screen and transparency modes included.
- **Three Gradient Types:** Support for Linear, Radial, and Conic gradients.
- **Advanced Color Stops Editor:** Add up to 10 color stops, drag percentages, or enter exact HEX values.
- **CSS Code Generator:** Get code formatted as standard CSS, classes, CSS variables, or inline HTML.
- **High-Res Wallpaper Export:** Download your customized gradient as a PNG or JPEG at 1080p, 4K, or custom dimensions.
- **Share Links:** Share your gradient configuration instantly via URL.
- **Preset Library:** 24 beautifully curated starting gradients across categories like Neon, Sunset, and Dark.
- **Save Locally:** Save your favorite gradients right inside your browser (LocalStorage).
- **Color Tools:** Built-in HEX to RGB/HSL converter, WCAG Contrast Checker, and local Image Palette Extractor.
- **Dark/Light Mode:** Carefully designed interface with seamless theme switching.

## Technology Stack

- HTML5
- CSS3 (Variables, Flexbox, Grid, Glassmorphism)
- Vanilla JavaScript (ES6+)
- Canvas API & SVG (for image export)
- *Zero dependencies, no frameworks, no build step.*

## Local Setup

Since this project requires no build tools or package managers, running it locally is incredibly simple:

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. Done!

*Note: For the Image Palette Extractor to bypass strict local file CORS policies in some browsers, you may prefer serving it via a local server (e.g., VS Code Live Server, or `python -m http.server`).*

## Deployment

Gradient Lab is completely static. You can host it for free easily:

**GitHub Pages:**
1. Push the code to a GitHub repository.
2. Go to Settings > Pages.
3. Select `main` branch and `/` root. Click Save.

**Vercel / Netlify:**
1. Import your GitHub repository.
2. Leave build commands blank.
3. Deploy!

## Customizing Branding

If you wish to fork and change the branding:
1. Open `js/app.js` and modify the `CONFIG` object at the top of the file.
2. Open `index.html` and edit the `<title>` and header branding text.

## Limitations & Browser Compatibility

- Built for modern browsers (Chrome, Firefox, Safari, Edge).
- Conic gradients require modern browser engines.
- Saved gradients use `localStorage` and will not synchronize across devices.
- High-resolution canvas downloads may crash on older mobile devices if dimensions exceed device memory limits (Max size is clamped to 4000x4000).

## License

This project is open-source and available under the MIT License. See the [LICENSE](LICENSE) file for more information.
