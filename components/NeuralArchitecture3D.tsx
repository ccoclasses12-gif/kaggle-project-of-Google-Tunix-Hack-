
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export type VizMode = 'architecture' | 'reasoning' | 'training' | 'tokens';

interface NeuralArchitecture3DProps {
  isTraining?: boolean;
  intensity?: number;
  activeNodes?: number;
  color?: string;
  mode?: VizMode;
  activeStep?: number;
}

const NeuralArchitecture3D: React.FC<NeuralArchitecture3DProps> = ({ 
  isTraining = false, 
  intensity = 1, 
  activeNodes = 30,
  color = '#3b82f6',
  mode = 'architecture',
  activeStep = -1
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 150;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Turned off for performance boost
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1); // Locked at 1 for performance
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const nodeGroup = new THREE.Group();
    const lineGroup = new THREE.Group();
    const particleGroup = new THREE.Group();
    scene.add(nodeGroup);
    scene.add(lineGroup);
    scene.add(particleGroup);

    // Optimized Geometry: Reduced segments
    const nodeGeometry = new THREE.SphereGeometry(2, 8, 8);
    const nodeColor = new THREE.Color(color);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: nodeColor,
      emissive: nodeColor,
      emissiveIntensity: 0.2,
      roughness: 0.5,
    });

    const nodes: THREE.Mesh[] = [];

    const createNodes = () => {
      for (let i = 0; i < activeNodes; i++) {
        const mesh = new THREE.Mesh(nodeGeometry, baseMaterial.clone());
        
        if (mode === 'architecture') {
          const layerSize = 5;
          const layerIndex = Math.floor(i / layerSize);
          const posInLayer = i % layerSize;
          mesh.position.set(
            (layerIndex - (activeNodes / layerSize) / 2) * 35,
            (posInLayer - layerSize / 2) * 20,
            (Math.random() - 0.5) * 5
          );
        } else if (mode === 'reasoning') {
          const x = (i - activeNodes / 2) * 15;
          const y = Math.sin(i * 0.8) * 20;
          const z = Math.cos(i * 0.8) * 10;
          mesh.position.set(x, y, z);
        } else {
          mesh.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
          );
        }
        
        nodes.push(mesh);
        nodeGroup.add(mesh);
      }
    };

    createNodes();

    const lineMaterial = new THREE.LineBasicMaterial({ color: nodeColor, transparent: true, opacity: 0.1 });
    const highlightLineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });

    const createLines = () => {
      lineGroup.clear();
      for (let i = 0; i < nodes.length; i++) {
        if (mode === 'reasoning' && i < nodes.length - 1) {
          const geometry = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[i+1].position]);
          const line = new THREE.Line(geometry, i <= activeStep ? highlightLineMaterial : lineMaterial);
          lineGroup.add(line);
        } else if (mode !== 'reasoning') {
          const connectCount = 2;
          for (let j = i + 1; j < Math.min(i + connectCount + 1, nodes.length); j++) {
            const geometry = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position]);
            lineGroup.add(new THREE.Line(geometry, lineMaterial));
          }
        }
      }
    };

    createLines();

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(50, 50, 100);
    scene.add(pl);

    const particleGeometry = new THREE.SphereGeometry(0.5, 4, 4);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: nodeColor });
    const activeParticles: { mesh: THREE.Mesh, start: THREE.Vector3, end: THREE.Vector3, progress: number }[] = [];

    const spawnParticle = () => {
      if (nodes.length < 2) return;
      const startIdx = Math.floor(Math.random() * (nodes.length - 1));
      const endIdx = mode === 'reasoning' ? startIdx + 1 : Math.floor(Math.random() * nodes.length);
      if (startIdx === endIdx) return;

      const pMesh = new THREE.Mesh(particleGeometry, particleMaterial);
      pMesh.position.copy(nodes[startIdx].position);
      particleGroup.add(pMesh);
      activeParticles.push({ mesh: pMesh, start: nodes[startIdx].position.clone(), end: nodes[endIdx].position.clone(), progress: 0 });
    };

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const rotSpeed = 0.001 * intensity;
      if (!isTraining) {
        nodeGroup.rotation.y += rotSpeed;
        lineGroup.rotation.y += rotSpeed;
        particleGroup.rotation.y += rotSpeed;
      }

      if (isTraining || mode === 'tokens' || mode === 'reasoning') {
        const maxP = mode === 'reasoning' ? 4 : 12;
        if (activeParticles.length < maxP) spawnParticle();
        
        for (let i = activeParticles.length - 1; i >= 0; i--) {
          const p = activeParticles[i];
          p.progress += 0.02 * intensity;
          p.mesh.position.lerpVectors(p.start, p.end, p.progress);
          if (p.progress >= 1) {
            particleGroup.remove(p.mesh);
            activeParticles.splice(i, 1);
          }
        }
      }

      nodes.forEach((node, idx) => {
        const mat = node.material as THREE.MeshStandardMaterial;
        if (mode === 'reasoning') {
          if (idx === activeStep) {
            node.scale.set(1.5, 1.5, 1.5);
            mat.emissiveIntensity = 1.0;
            mat.emissive.setHex(0xffffff);
          } else if (idx < activeStep) {
            node.scale.set(1.1, 1.1, 1.1);
            mat.emissiveIntensity = 0.4;
            mat.emissive.setHex(nodeColor.getHex());
          } else {
            node.scale.set(1, 1, 1);
            mat.emissiveIntensity = 0.1;
            mat.emissive.setHex(nodeColor.getHex());
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      rendererRef.current.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      // Disposal for GC
      nodeGeometry.dispose();
      particleGeometry.dispose();
      baseMaterial.dispose();
      lineMaterial.dispose();
      highlightLineMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [isTraining, intensity, activeNodes, color, mode, activeStep]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default React.memo(NeuralArchitecture3D);
