# 💖 For You — Digital Love Story & Memory Book

A romantic, aesthetic, and interactive website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🌟 Quick Start: How to View the Website

The development server is already prepared! Run the command below:

```bash
npm run dev
```

Then open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)** (or **http://localhost:3001** if port 3000 is occupied)

---

## 📸 How to Replace & Add Your Girlfriend's Photos

All photos are organized in one central place:

1. **Add Your Photos:**
   Save your girlfriend's photos into:
   ```
   public/photos/photo1.jpg
   public/photos/photo2.jpg
   public/photos/photo3.jpg
   public/photos/photo4.jpg
   public/photos/photo5.jpg
   public/photos/photo6.jpg
   public/photos/photo7.jpg
   public/photos/photo8.jpg
   ```
   *(Supports `.jpg`, `.jpeg`, `.png`, and `.webp`)*

2. **Customize Captions, Dates & Stories:**
   Open [`src/data/memories.ts`](file:///c:/webdevelopement/hbd/src/data/memories.ts) and edit the `memories` array:
   ```typescript
   {
     id: 1,
     image: '/photos/photo1.jpg',
     title: 'Our First Sunset Walk',
     caption: 'That smile ❤️',
     date: 'September 14',
     location: 'By the coast',
     animation: 'fade', // fade, slide-left, slide-right, rotate, flip-3d, blur-zoom, polaroid, floating
     storySnippet: 'The day time stood still...'
   }
   ```

---

## 💌 How to Personalize the Messages & Sections

All texts, dates, and romantic messages are centralized in [`src/data/memories.ts`](file:///c:/webdevelopement/hbd/src/data/memories.ts):

- **Our Story Timeline:** Edit `storyTimeline` (The Day We Met, Our First Memory, etc.)
- **Reasons I Love You:** Edit `loveReasons` (Your Smile, Your Laugh, The Way You Care, etc.)
- **Secret Letter:** Edit `secretLetter` to include your personal heartfelt letter that unlocks when she clicks *"Open the Secret 💌"*.
- **Pop Quiz Mini Game:** Edit `siteConfig` to customize the question, yes/no responses, and reward pass.

---

## ✨ Features & Sections Included

1. **Hero Section ("For You ❤️"):**
   - Full-screen opening with floating hearts, ambient glow, and the animated *"Open My Heart 💗"* button.
2. **Our Story Timeline:**
   - Vertical milestone journey with glowing line and scroll reveal animations.
3. **Photo Memories Gallery:**
   - 8 distinct handcrafted Framer Motion animation styles (fade + scale, slide from left/right, rotation, 3D flip, blur zoom, polaroid tilt, and floating).
4. **Interactive Photo Spotlight:**
   - Click/tap any photo to expand it into an immersive backdrop-blurred spotlight modal with romantic particles, captions, and previous/next controls.
5. **"Reasons I Love You" Flip Cards:**
   - Interactive 3D cards that flip and reveal heartfelt reasons upon click.
6. **Cute Mini Game:**
   - *"Do you know how much I love you?"* with a playful evasive *"No"* button that dodges the cursor with humorous teasing messages, and a *"Yes"* button triggering a confetti heart explosion + Hug Pass.
7. **Memory Carousel:**
   - Smooth horizontal swipe and draggable carousel with snapping, active scale effect, and keyboard arrow navigation.
8. **Secret / Surprise Section:**
   - Wax-sealed romantic letter that breaks open with confetti particles to reveal your personal love letter.
9. **Final Section:**
   - Full-screen emotional conclusion with *"To My Favorite Person ❤️"*, pulsing heart, love shower celebration, and return-to-top button.
10. **Background Music & Ambiance:**
    - Gentle ambient pentatonic melody synthesizer powered by Web Audio API (toggleable via the top-right button, zero external audio dependencies).
    - Floating background hearts with tap-to-burst micro-interactions.

---

## 🚀 How to Deploy on Vercel (To Share With Her)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository and click **Deploy**.
4. In under 60 seconds, you will receive a private URL (e.g., `https://for-my-love.vercel.app`) that she can open directly on her phone or laptop!
