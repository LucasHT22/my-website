# As Frank Sinatra said, Fly me to your portfolio
<i>Lucas, It's Fly me to the Moon!</i> Whatever.

A 3D interactive experience built with **React Three Fiber** and **Three.js**, where you control an airplane navigating through floating islands, each representing a different topic. A radar provides a top-down overview of nearby islands. The background dynamically switches between day and night based on your system time.


## Features

- **Airplane Navigation** using keyboard (WASD + arrow keys)
- **Floating Islands** representing personal projects/topics
- **Radar** view with minimap and reset functionality
- **Day/Night Cycle** based on real time
- **Trail Effect** shows airplane trajectory
- **Pop-ups** with contextual info when you land on islands
- **Dynamic Camera** follows and looks at the airplane

## Navigation Controls

| Key       | Action                     |
|-----------|----------------------------|
| **W**     | Move Forward               |
| **S**     | Move Backward              |
| **A**     | Turn Left (Yaw)            |
| **D**     | Turn Right (Yaw)           |
| **↑ Arrow** | Ascend (Upward Movement)  |
| **↓ Arrow** | Descend (Downward Movement) |

The plane responds to a combination of movement and rotation. Use **WASD** to steer and **Arrow Keys** to move vertically.

## Interactive Elements

### Islands

Each island is a platform in space with a specific color and topic. When the airplane intersects with an island's hitbox:
- The island turns red
- A pop-up appears with its **title** and **description**

### Radar

A mini canvas radar (top-right corner) shows:
- Blue dot → your current airplane position
- Green dots → nearby islands
- Press the **"Reset"** button to bring the airplane back to its initial position

### Day/Night Background

The background color and lighting automatically switch based on the system's current hour:

| Time       | Background    | Light Color |
|------------|---------------|-------------|
| 05:00–18:59 | Sky Blue (`#87CEEB`) | White        |
| 19:00–04:59 | Midnight Blue (`#0D1B2A`) | Light Blue (`#9999ff`) |

## Tech Stack

- **React**
- **@react-three/fiber** (Three.js renderer for React)
- **@react-three/drei** (helpers like Stars, OrbitControls, Html)
- **TypeScript**
- **Three.js**


## Running locally

```
git clone https://github.com/LucasHT22/my-website
cd threejs
yarn install
yarn dev
```
