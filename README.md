# LLM Temperature Slider

A demonstration of a beautiful, minimalist temperature slider component for Large Language Model applications built with React and Next.js.

![LLM Temperature Slider](https://github.com/yourusername/llm-temperature-slider-22/raw/main/assets/slider-preview.png)

## About This Project

This repository is a Next.js environment for building and testing the `LlmTemperatureSlider` component. It's not intended as a standalone package, but rather as a development workspace for the component.

## Features

- 🔥 Interactive visual representation of LLM temperature settings
- ✨ Smooth animations with spring physics
- 📊 Dynamic bar heights based on proximity to selected value
- 🎯 Precise value selection with snap-to-grid behavior
- 🖱️ Intuitive drag interaction
- 🎨 Clean, minimalist design aesthetic

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/llm-temperature-slider.git

# Install dependencies
npm install
# or
yarn install

# Run the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the slider in action.

## How It Works

The slider visualizes the temperature setting used in Large Language Models (LLMs). Temperature controls the randomness of the model's outputs:

- **Low temperature (0)**: More deterministic, focused responses
- **High temperature (1)**: More random, creative responses

The animated bars provide intuitive visual feedback about the current setting, with taller bars indicating the selected value.

## Technical Details

- Built with React and Next.js
- Uses the Motion library for animations
- Client-side component with mouse interaction
- Responsive design
- Styled with Tailwind CSS

## Component Location

The component can be found at `src/components/llm-temperature-slider.tsx`
# llm-temperature-slider
