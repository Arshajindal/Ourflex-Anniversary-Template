# OurFlix Anniversary Template

A Netflix-inspired, hostable anniversary website with profile selection, memory cards, photo/video popups, reasons section, final letter, credit roll, and ending logo.

## How to edit

1. Open `script.js`.
2. Replace `Arsha & Him`, titles, captions, dates, reasons, and the final letter.
3. Put your photos inside `assets/photos/`.
4. Put your videos inside `assets/videos/`.
5. Update the `image` and `video` paths in `script.js`.
6. Optional: add your song as `assets/audio/your-song.mp3`.

## For video cards

Use this format in `script.js`:

```js
{
  title: "My Video Title",
  tag: "Episode 02",
  date: "Your date/place",
  caption: "Your caption",
  type: "video",
  image: "assets/photos/video-cover.jpg",
  video: "assets/videos/my-video.mp4"
}
```

## Hosting options

### Netlify
Drag and drop the whole `ourflix-anniversary` folder into Netlify Deploys.

### GitHub Pages
Upload these files to a GitHub repository, then enable Pages from repository settings.

### Vercel
Import the folder/repository as a static project.

## Important

This is inspired by streaming-service UI patterns, but uses the custom name `OURFLIX`. For public hosting, avoid using the actual Netflix logo/name exactly.
