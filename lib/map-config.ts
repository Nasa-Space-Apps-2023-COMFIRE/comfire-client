import {AmbientLight, LightingEffect, PointLight} from "@deck.gl/core";

export const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0,
});

export const pointLight1 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-0.144528, 49.739968, 80000],
});

export const pointLight2 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-3.807751, 54.104682, 8000],
});

export const lightingEffect = new LightingEffect({
    ambientLight,
    pointLight1,
    pointLight2,
});

export const material = {
    ambient: 0.64,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [51, 51, 51],
};

export const colorRange = [
    [255, 0, 0],   // Pure red
    [255, 50, 50], // Slightly lighter red
    [255, 0, 0],   // Pure red
    [200, 0, 0],   // Slightly darker red
    [150, 0, 0],   // Even darker red
    [100, 0, 0]    // Very dark red
];
