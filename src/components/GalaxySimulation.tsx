'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Constants based on real astronomical data
const SOLAR_MASS = 1.989e30; // kg
const PARSEC = 3.086e16; // meters
const G = 6.674e-11; // gravitational constant
const KPC_TO_PARSEC = 1000; // 1 kpc = 1000 parsec

interface GalaxyProps {
  darkMatterMass: number;
  normalMatterMass: number;
  blackHoleMass: number;
  darkMatterRatio: number;
}

function calculateOrbitalVelocity(radius: number, params: GalaxyProps): number {
  const { darkMatterMass, normalMatterMass, blackHoleMass } = params;
  
  // Convert radius to meters
  const r = radius * PARSEC;
  
  // Convert masses to kg
  const dmMass = darkMatterMass * SOLAR_MASS;
  const nmMass = normalMatterMass * SOLAR_MASS;
  const bhMass = blackHoleMass * SOLAR_MASS;

  // Black hole contribution (Keplerian)
  const vBH = Math.sqrt((G * bhMass) / r);
  
  // Disk contribution (assumes exponential disk)
  const diskScaleLength = 3 * KPC_TO_PARSEC * PARSEC;
  const vDisk = Math.sqrt((G * nmMass * radius) / Math.pow(r, 3));
  
  // Dark matter halo contribution (NFW profile approximation)
  const rs = 20 * KPC_TO_PARSEC * PARSEC;
  const vHalo = Math.sqrt((G * dmMass) / r * (Math.log(1 + r/rs) - (r/rs)/(1 + r/rs)));

  return Math.sqrt(vBH * vBH + vDisk * vDisk + vHalo * vHalo);
}

function BlackHole() {
  const eventHorizonRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (eventHorizonRef.current) {
      eventHorizonRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group>
      {/* Event Horizon */}
      <mesh ref={eventHorizonRef}>
        <torusGeometry args={[1.5, 0.2, 16, 100]} />
        <meshStandardMaterial 
          color="#ff4400"
          emissive="#ff2200"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* Black Hole Core */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
}

function CelestialObject({ position, color, size, orbitRadius, params }: {
  position: [number, number, number];
  color: string;
  size: number;
  orbitRadius: number;
  params: GalaxyProps;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const initialAngle = Math.random() * Math.PI * 2;

  useFrame((state) => {
    if (ref.current) {
      const orbitalVelocity = calculateOrbitalVelocity(orbitRadius, params);
      const scaledVelocity = orbitalVelocity * 1e-7;
      
      const time = state.clock.getElapsedTime();
      const angle = initialAngle + time * scaledVelocity;
      
      ref.current.position.x = Math.cos(angle) * orbitRadius;
      ref.current.position.z = Math.sin(angle) * orbitRadius;
      ref.current.position.y = position[1];
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </mesh>
  );
}

function Galaxy({ darkMatterMass, normalMatterMass, blackHoleMass, darkMatterRatio }: GalaxyProps) {
  const galaxyRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const params = { darkMatterMass, normalMatterMass, blackHoleMass, darkMatterRatio };

  useFrame((state) => {
    if (particlesRef.current && particlesRef.current.geometry) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const count = positions.length / 3;
      
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        
        // Calculate radius in parsecs
        const radius = Math.sqrt(x * x + z * z);
        if (radius === 0) continue;
        
        // Calculate orbital velocity using our astronomical formula
        const velocity = calculateOrbitalVelocity(radius, params);
        
        // Scale velocity for visual effect while maintaining proportions
        const scaleFactor = 0.00001;
        const angularVelocity = (velocity * scaleFactor) / radius;
        
        // Update position using circular motion
        const cos = Math.cos(angularVelocity);
        const sin = Math.sin(angularVelocity);
        
        // Rotate position around y-axis
        const newX = x * cos - z * sin;
        const newZ = z * cos + x * sin;
        
        positions[i * 3] = newX;
        positions[i * 3 + 2] = newZ;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  useEffect(() => {
    if (!galaxyRef.current) return;

    // Clear existing particles
    while (galaxyRef.current.children.length) {
      galaxyRef.current.remove(galaxyRef.current.children[0]);
    }

    // Create galaxy particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 15000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radiusFactor = Math.pow(Math.random(), 0.5);
      const radius = radiusFactor * 50;
      
      // Create spiral arms
      const armCount = 2;
      const armOffset = (angle + radius * 0.2) % (Math.PI * 2);
      const spiralFactor = Math.sin(armOffset * armCount) * 0.5;
      
      const x = radius * Math.cos(angle + spiralFactor);
      const z = radius * Math.sin(angle + spiralFactor);
      const scaleHeight = 5 * Math.exp(-radius * 0.1) * Math.pow(1e12 / (darkMatterMass + normalMatterMass), 0.25);
      const y = (Math.random() - 0.5) * scaleHeight;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color based on matter type and radius
      const isDarkMatter = Math.random() < darkMatterRatio;
      const brightness = Math.max(0.4, 1 - radius / 50);
      if (isDarkMatter) {
        colors[i * 3] = 0.3 * brightness;
        colors[i * 3 + 1] = 0.3 * brightness;
        colors[i * 3 + 2] = 0.4 * brightness;
      } else {
        colors[i * 3] = 1.0 * brightness;
        colors[i * 3 + 1] = 0.8 * brightness;
        colors[i * 3 + 2] = 0.4 * brightness;
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particleSystem.name = 'particles';
    particlesRef.current = particleSystem;
    galaxyRef.current.add(particleSystem);

  }, [darkMatterMass, normalMatterMass, blackHoleMass, darkMatterRatio]);

  // Generate celestial objects
  const celestialObjects = Array.from({ length: 50 }, (_, i) => {
    const orbitRadius = Math.random() * 40 + 5;
    const angle = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 2;
    return {
      position: [
        Math.cos(angle) * orbitRadius,
        y,
        Math.sin(angle) * orbitRadius
      ] as [number, number, number],
      color: Math.random() > 0.7 ? '#ff9900' : '#ffffff',
      size: Math.random() * 0.3 + 0.1,
      orbitRadius,
      params
    };
  });

  return (
    <group ref={galaxyRef}>
      <BlackHole />
      {celestialObjects.map((obj, i) => (
        <CelestialObject key={i} {...obj} />
      ))}
    </group>
  );
}

interface GalaxySimulationProps {
  darkMatterMass: number;
  normalMatterMass: number;
  blackHoleMass: number;
  darkMatterRatio: number;
}

export default function GalaxySimulation({ darkMatterMass, normalMatterMass, blackHoleMass, darkMatterRatio }: GalaxySimulationProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [100, 100, 100] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Galaxy 
          darkMatterMass={darkMatterMass}
          normalMatterMass={normalMatterMass}
          blackHoleMass={blackHoleMass}
          darkMatterRatio={darkMatterRatio}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
} 