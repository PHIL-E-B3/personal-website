# Personal Website

A minimal, dark-themed personal website inspired by [skylerchan.ca](https://www.skylerchan.ca/) and [brianlovin.com](https://brianlovin.com/).

## Features

- Clean, minimal dark theme
- Responsive design (mobile-friendly)
- Writing section with year-grouped posts
- Photography gallery
- No build tools required - just HTML & CSS

## Quick Start

1. Open `index.html` in your browser to preview
2. Edit `index.html` to add your content
3. Replace placeholder photos with your images

## Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push this folder to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to Settings → Pages → Select "main" branch → Save
4. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Custom Domain (Optional)

To use a custom domain like `yourname.com`:

1. In GitHub Pages settings, add your custom domain
2. Create a `CNAME` file with your domain (e.g., `yourname.com`)
3. Configure your domain's DNS:
   - Add an A record pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

## Customization

### Content to Update

1. **Name & Bio** - Edit the hero section in `index.html`
2. **Social Links** - Update email, LinkedIn, X, GitHub URLs
3. **Writing** - Add/remove posts in the writing section
4. **Photos** - Replace placeholder divs with `<img>` tags:
   ```html
   <figure class="photo-item">
       <img src="images/your-photo.jpg" alt="Description">
       <figcaption>Photo caption</figcaption>
   </figure>
   ```

### Styling

- Colors: Edit CSS variables in `style.css`
- Fonts: Change the Google Fonts link in `index.html`
- Spacing: Adjust padding/margins in `style.css`

## File Structure

```
personal-website/
├── index.html      # Main HTML file
├── style.css       # All styles
├── images/         # Your photos go here
└── README.md       # This file
```

## License

Free to use for personal projects.
