import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const PARTICLE_COUNT = 18000;

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute vec3 color;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec3 p = position;

    float mouseDistance = length(position.xy - uMouse);
    float t = clamp(mouseDistance / 0.4, 0.0, 1.0);

    if (t < 1.0) {
      p.z += (1.0 - t) * 0.15 * sin(uTime + position.x);
    }

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = 2.5 * (-1.0 / mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uOpacity;
  varying vec3 vColor;

  void main() {
    float circle = 1.0 - distance(gl_PointCoord, vec2(0.5));
    if (circle < 0.5) discard;
    gl_FragColor = vec4(vColor, uOpacity);
  }
`;

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const uniformsRef = useRef<{
    uTime: { value: number };
    uMouse: { value: THREE.Vector2 };
    uOpacity: { value: number };
  } | null>(null);
  const rafRef = useRef<number>(0);
  const opacityRef = useRef({ value: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setClearColor(new THREE.Color('#1A1A1A'), 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.offsetWidth, container.offsetHeight);

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.offsetWidth / container.offsetHeight,
      0.1,
      10
    );
    camera.position.z = 1;

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const aspect = container.offsetWidth / container.offsetHeight;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() * 2 - 1) * aspect;
      positions[i3 + 1] = Math.random() * 2 - 1;
      positions[i3 + 2] = (Math.random() * 2 - 1) * 0.5;

      const color = new THREE.Color('#C4A882');
      const brightness = 0.5 + Math.random() * 0.5;
      colors[i3] = color.r * brightness;
      colors[i3 + 1] = color.g * brightness;
      colors[i3 + 2] = color.b * brightness;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uOpacity: { value: 0 },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Clock
    const clock = new THREE.Clock();

    // Mouse handler
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    // Intersection observer for opacity
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(opacityRef.current, {
              value: 1,
              duration: 1.5,
              ease: 'power2.out',
              onUpdate: () => {
                uniforms.uOpacity.value = opacityRef.current.value;
              },
            });
          } else {
            gsap.to(opacityRef.current, {
              value: 0,
              duration: 0.5,
              ease: 'power2.in',
              onUpdate: () => {
                uniforms.uOpacity.value = opacityRef.current.value;
              },
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(container);

    // Animation loop
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      uniforms.uTime.value = clock.getElapsedTime();

      // Lerp mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#1A1A1A] overflow-hidden"
      style={{ height: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <p
          className="font-body text-[#EFEFEF] text-center max-w-[600px] leading-relaxed"
          style={{ fontSize: '17px', lineHeight: 1.7 }}
        >
          We source only full-grain, vegetable-tanned hides. Every mark is a memory of the hide's life, preserved eternally under waxed thread and hand-burnished edges.
        </p>
      </div>
    </section>
  );
}
