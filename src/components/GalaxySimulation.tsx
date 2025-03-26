'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import SimulationControls from './SimulationControls';
import VelocityDisplay from './VelocityDisplay';

// Constants
const G = 6.67430e-11; // Gravitational constant
const SOLAR_MASS = 1.989e30; // Solar mass in kg
const PARSEC = 3.086e16; // Parsec in meters

interface StarProps {
  position: [number, number, number];
  color: string;
  velocity: [number, number, number];
}

function Star({ position, color, velocity }: StarProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

interface GalaxyProps {
  darkMatterMass: number;
  galaxyMass: number;
  darkMatterRatio: number;
}

function Galaxy({ darkMatterMass, galaxyMass, darkMatterRatio }: GalaxyProps) {
  const starsRef = useRef<THREE.Group>(null);
  const numStars = 2000;
  const numDarkMatterParticles = 5000;
  const galaxyRadius = 10;
  const diskHeight = 0.5;
  const bulgeRadius = 2;

  const { stars, darkMatter, velocities } = useMemo(() => {
    const starPositions: [number, number, number][] = [];
    const starColors: string[] = [];
    const darkMatterPositions: [number, number, number][] = [];
    const starVelocities: [number, number, number][] = [];

    // Generate disk stars
    for (let i = 0; i < numStars * 0.7; i++) {
      const radius = Math.random() * galaxyRadius;
      const theta = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * diskHeight;

      const x = radius * Math.cos(theta);
      const y = height;
      const z = radius * Math.sin(theta);

      starPositions.push([x, y, z]);
      starColors.push('#ffffff');
      starVelocities.push([0, 0, 0]);
    }

    // Generate bulge stars
    for (let i = 0; i < numStars * 0.3; i++) {
      const radius = Math.random() * bulgeRadius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      starPositions.push([x, y, z]);
      starColors.push('#ffff00');
      starVelocities.push([0, 0, 0]);
    }

    // Generate dark matter particles
    for (let i = 0; i < numDarkMatterParticles; i++) {
      const radius = Math.random() * galaxyRadius * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      darkMatterPositions.push([x, y, z]);
    }

    return {
      stars: { positions: starPositions, colors: starColors },
      darkMatter: { positions: darkMatterPositions },
      velocities: starVelocities,
    };
  }, [numStars, numDarkMatterParticles, galaxyRadius, diskHeight, bulgeRadius]);

  useFrame((state) => {
    if (!starsRef.current) return;

    const time = state.clock.getElapsedTime();
    const totalMass = galaxyMass + darkMatterMass;

    // Update star positions and velocities
    starsRef.current.children.forEach((star, i) => {
      if (i >= numStars) return; // Skip dark matter particles

      const position = star.position;
      const radius = Math.sqrt(
        position.x ** 2 + position.y ** 2 + position.z ** 2
      );

      // Calculate orbital velocity based on radius and mass
      const velocity = Math.sqrt(
        (G * totalMass * SOLAR_MASS * 1e10) / (radius * PARSEC)
      );

      // Update position based on velocity
      const angle = Math.atan2(position.z, position.x);
      position.x = radius * Math.cos(angle + time * velocity / radius);
      position.z = radius * Math.sin(angle + time * velocity / radius);
    });
  });

  return (
    <group ref={starsRef}>
      {stars.positions.map((position, i) => (
        <Star
          key={i}
          position={position}
          color={stars.colors[i]}
          velocity={velocities[i]}
        />
      ))}
      {darkMatter.positions.map((position, i) => (
        <mesh key={i + numStars} position={position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#4a4a4a" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function GalaxySimulation() {
  const [darkMatterMass, setDarkMatterMass] = useState(50);
  const [galaxyMass, setGalaxyMass] = useState(10);
  const [darkMatterRatio, setDarkMatterRatio] = useState(0.8);

  // Calculate velocities for different regions
  const calculateVelocity = (radius: number) => {
    const totalMass = galaxyMass + darkMatterMass;
    return Math.sqrt(
      (G * totalMass * SOLAR_MASS * 1e10) / (radius * PARSEC)
    );
  };

  const haloVelocity = calculateVelocity(15);
  const diskVelocity = calculateVelocity(5);
  const bulgeVelocity = calculateVelocity(1);

  return (
    <div className="w-full h-[600px] relative">
      <Canvas camera={{ position: [0, 5, 20], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Galaxy
          darkMatterMass={darkMatterMass}
          galaxyMass={galaxyMass}
          darkMatterRatio={darkMatterRatio}
        />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
      <SimulationControls
        darkMatterMass={darkMatterMass}
        galaxyMass={galaxyMass}
        darkMatterRatio={darkMatterRatio}
        onDarkMatterMassChange={setDarkMatterMass}
        onGalaxyMassChange={setGalaxyMass}
        onDarkMatterRatioChange={setDarkMatterRatio}
      />
      <VelocityDisplay
        haloVelocity={haloVelocity}
        diskVelocity={diskVelocity}
        bulgeVelocity={bulgeVelocity}
      />
    </div>
  );
} 