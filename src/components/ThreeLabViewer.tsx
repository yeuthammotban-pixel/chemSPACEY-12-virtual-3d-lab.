import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Experiment, ExperimentStep } from '../types/chemistry';
import { Play, RotateCcw, ChevronRight, ChevronLeft, Eye, Sparkles, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

interface ThreeLabViewerProps {
  experiment: Experiment;
  onComplete?: () => void;
}

export const ThreeLabViewer: React.FC<ThreeLabViewerProps> = ({ experiment, onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [is2DMode, setIs2DMode] = useState(false);
  const [isHeating, setIsHeating] = useState(false);
  const [simTemperature, setSimTemperature] = useState(25);
  const [showSafety, setShowSafety] = useState(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);
  const mirrorCoatingMeshRef = useRef<THREE.Mesh | null>(null);
  const bubblesPointsRef = useRef<THREE.Points | null>(null);
  const burnerFlameRef = useRef<THREE.Mesh | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const step: ExperimentStep = experiment.steps[currentStepIndex] || experiment.steps[0];

  // Initialize Three.js scene
  useEffect(() => {
    if (is2DMode || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf1f5f9);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 1.2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Environment reflection using RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.7);
    fillLight.position.set(-5, 4, -2);
    scene.add(fillLight);

    // Laboratory Workbench Surface
    const benchGeometry = new THREE.BoxGeometry(14, 0.4, 8);
    const benchMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.25,
      metalness: 0.15,
    });
    const bench = new THREE.Mesh(benchGeometry, benchMaterial);
    bench.position.set(0, -0.2, 0);
    bench.receiveShadow = true;
    scene.add(bench);

    // Marble tile edge detail
    const edgeGeo = new THREE.BoxGeometry(14.1, 0.08, 8.1);
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8, roughness: 0.2 });
    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.position.set(0, 0.02, 0);
    scene.add(edge);

    // --- Laboratory Apparatus Construction ---
    // Test Tube Rack
    const rackGroup = new THREE.Group();
    const rackBase = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.15, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 })
    );
    rackBase.position.set(0, 0.08, 0);
    rackBase.castShadow = true;
    rackGroup.add(rackBase);

    const rackTop = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.1, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 })
    );
    rackTop.position.set(0, 1.6, 0);
    rackTop.castShadow = true;
    rackGroup.add(rackTop);

    // Rack Pillars
    const pillarGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.6, 16);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6 });
    [-1.6, 1.6].forEach(x => {
      [-0.45, 0.45].forEach(z => {
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.set(x, 0.85, z);
        rackGroup.add(pillar);
      });
    });
    scene.add(rackGroup);

    // Main Glass Test Tube
    const glassGroup = new THREE.Group();
    glassGroup.position.set(0, 0.5, 0);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      thickness: 0.12,
      depthWrite: false,
    });

    // Outer glass tube cylinder + rounded bottom
    const tubeCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 2.4, 32, 1, true), glassMaterial);
    tubeCylinder.position.set(0, 1.2, 0);
    glassGroup.add(tubeCylinder);

    const tubeBottom = new THREE.Mesh(new THREE.SphereGeometry(0.38, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), glassMaterial);
    tubeBottom.position.set(0, 0, 0);
    glassGroup.add(tubeBottom);

    // Tube Rim Ring
    const rimTorus = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.04, 16, 32), glassMaterial);
    rimTorus.rotation.x = Math.PI / 2;
    rimTorus.position.set(0, 2.4, 0);
    glassGroup.add(rimTorus);

    // Liquid Mesh inside the tube
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(step.liquidColor || '#e0f2fe'),
      transmission: 0.6,
      opacity: 0.9,
      transparent: true,
      roughness: 0.15,
      ior: 1.33,
    });
    const liquidMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 1.1, 32), liquidMat);
    liquidMesh.position.set(0, 0.58, 0);
    glassGroup.add(liquidMesh);
    liquidMeshRef.current = liquidMesh;

    // Meniscus top surface
    const meniscus = new THREE.Mesh(
      new THREE.CircleGeometry(0.34, 32),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(step.liquidColor || '#e0f2fe'), roughness: 0.1 })
    );
    meniscus.rotation.x = -Math.PI / 2;
    meniscus.position.set(0, 1.13, 0);
    glassGroup.add(meniscus);

    // Silver mirror reflective cylinder (active during Tollens mirror test)
    const mirrorMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.05,
      side: THREE.DoubleSide,
    });
    const mirrorCoating = new THREE.Mesh(new THREE.CylinderGeometry(0.375, 0.375, 1.4, 32, 1, true), mirrorMat);
    mirrorCoating.position.set(0, 0.75, 0);
    mirrorCoating.visible = !!step.mirrorCoating;
    glassGroup.add(mirrorCoating);
    mirrorCoatingMeshRef.current = mirrorCoating;

    // Bubbles (for gas evolution like O₂ during electrolysis or esterification)
    const bubbleCount = 45;
    const bubbleGeo = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubbleCount * 3);
    for (let i = 0; i < bubbleCount; i++) {
      bubblePositions[i * 3] = (Math.random() - 0.5) * 0.45;
      bubblePositions[i * 3 + 1] = 0.1 + Math.random() * 1.0;
      bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
    }
    bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));
    const bubbleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const bubblePoints = new THREE.Points(bubbleGeo, bubbleMat);
    bubblePoints.visible = !!step.bubbles;
    glassGroup.add(bubblePoints);
    bubblesPointsRef.current = bubblePoints;

    scene.add(glassGroup);

    // Beakers on the side
    const beakerMat = glassMaterial.clone();
    const beakerLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 1.5, 32, 1, true), beakerMat);
    beakerLeft.position.set(-2.5, 0.75, 0.4);
    beakerLeft.castShadow = true;
    scene.add(beakerLeft);

    const beakerLiquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.62, 0.9, 32),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.75 })
    );
    beakerLiquid.position.set(-2.5, 0.45, 0.4);
    scene.add(beakerLiquid);

    // Spirit Burner (Đèn cồn)
    const burnerGroup = new THREE.Group();
    burnerGroup.position.set(2.4, 0, 0.3);

    const burnerBase = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.6),
      glassMaterial
    );
    burnerBase.position.set(0, 0.3, 0);
    burnerGroup.add(burnerBase);

    const burnerWick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 })
    );
    burnerWick.position.set(0, 0.8, 0);
    burnerGroup.add(burnerWick);

    // Procedural Flame
    const flameGeo = new THREE.ConeGeometry(0.16, 0.55, 16);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(0, 1.15, 0);
    flame.visible = isHeating || (step.temperature && step.temperature > 40) || false;
    burnerGroup.add(flame);
    burnerFlameRef.current = flame;

    scene.add(burnerGroup);

    // Procedural mouse drag rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Tick Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth damping camera orbit
      camera.position.x = THREE.MathUtils.damp(camera.position.x, Math.sin(targetRotationY) * 7.5, 6, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, Math.cos(targetRotationY) * 7.5, 6, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 3.2 + targetRotationX * 4, 6, delta);
      camera.lookAt(0, 1.2, 0);

      // Animate bubbles rising
      if (bubblePoints.visible && bubbleGeo.attributes.position) {
        const positions = bubbleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < bubbleCount; i++) {
          positions[i * 3 + 1] += delta * 0.45;
          if (positions[i * 3 + 1] > 1.1) {
            positions[i * 3 + 1] = 0.15;
          }
        }
        bubbleGeo.attributes.position.needsUpdate = true;
      }

      // Flame flicker
      if (flame.visible) {
        flame.scale.set(
          1 + Math.sin(elapsed * 18) * 0.15,
          1 + Math.cos(elapsed * 22) * 0.2,
          1 + Math.sin(elapsed * 15) * 0.15
        );
      }

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight || 450;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [is2DMode]);

  // Update visual state when step changes
  useEffect(() => {
    if (step.liquidColor && liquidMeshRef.current) {
      const mat = liquidMeshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.color.set(step.liquidColor);
    }

    if (mirrorCoatingMeshRef.current) {
      mirrorCoatingMeshRef.current.visible = !!step.mirrorCoating;
    }

    if (bubblesPointsRef.current) {
      bubblesPointsRef.current.visible = !!step.bubbles;
    }

    if (burnerFlameRef.current) {
      const shouldHeat = isHeating || (step.temperature && step.temperature > 40) || false;
      burnerFlameRef.current.visible = shouldHeat;
    }

    if (step.temperature) {
      setSimTemperature(step.temperature);
    } else {
      setSimTemperature(25);
    }
  }, [currentStepIndex, step, isHeating]);

  const handleNextStep = () => {
    if (currentStepIndex < experiment.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsHeating(false);
    setSimTemperature(25);
  };

  const toggleHeat = () => {
    setIsHeating(!isHeating);
    if (!isHeating) {
      setSimTemperature(70);
    } else {
      setSimTemperature(25);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-sky-50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-850">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 mb-1">
            {experiment.category}
          </span>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
            {experiment.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSafety(!showSafety)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            An toàn thí nghiệm
          </button>

          <button
            onClick={() => setIs2DMode(!is2DMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 transition-colors"
          >
            {is2DMode ? 'Chuyển sang 3D' : 'Chế độ 2D nhẹ'}
          </button>
        </div>
      </div>

      {/* Safety Alert Modal / Dropdown */}
      {showSafety && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2 font-bold mb-1.5 text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            LƯU Ý AN TOÀN PHÒNG THÍ NGHIỆM HÓA HỌC:
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {experiment.safetyNotes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 3D Viewport / 2D Interactive Container */}
      <div className="relative w-full h-[460px] bg-slate-100 dark:bg-slate-950 overflow-hidden select-none">
        {!is2DMode ? (
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        ) : (
          /* 2D Fallback Diagram with interactive SVG animation */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
            <div className="relative w-48 h-64 border-4 border-slate-400 dark:border-slate-600 rounded-b-full bg-white/70 dark:bg-slate-800/70 p-2 shadow-inner flex flex-col justify-end overflow-hidden">
              {/* Liquid */}
              <div
                className="w-full transition-all duration-700 rounded-b-full relative flex items-center justify-center"
                style={{
                  height: '65%',
                  backgroundColor: step.liquidColor || '#e0f2fe',
                }}
              >
                {step.mirrorCoating && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-white to-slate-300 opacity-90 rounded-b-full border-4 border-white shadow-lg animate-pulse" />
                )}
                {step.bubbles && (
                  <div className="absolute inset-0 flex justify-around items-end pb-3">
                    <span className="w-2.5 h-2.5 bg-white/80 rounded-full animate-bounce delay-100" />
                    <span className="w-3.5 h-3.5 bg-white/80 rounded-full animate-bounce delay-200" />
                    <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce" />
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 z-10 text-center px-2">
                  {step.reagentName || 'Dung dịch'}
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              Mô hình 2D tương tác tiết kiệm dung lượng và CPU.
            </p>
          </div>
        )}

        {/* Floating Live Telemetry HUD */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <div className="glass-panel px-3 py-1.5 rounded-xl shadow-sm text-xs flex items-center gap-2 text-slate-700 dark:text-slate-200 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Nhiệt độ: {simTemperature}°C</span>
          </div>

          <div className="glass-panel px-3 py-1.5 rounded-xl shadow-sm text-xs text-slate-600 dark:text-slate-300 font-sans">
            Kéo chuột để xoay góc nhìn 3D 360°
          </div>
        </div>

        {/* Quick Action Overlays on 3D Canvas */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={toggleHeat}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isHeating
                ? 'bg-rose-500 text-white shadow-rose-500/30 ring-2 ring-rose-400'
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-white'
            }`}
          >
            🔥 {isHeating ? 'Đang đun nóng (Tắt)' : 'Bật đèn cồn'}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-white transition-all shadow-sm"
            title="Đặt lại thí nghiệm"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Center Step Phenomenon Banner */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-2xl glass-panel p-4 rounded-2xl shadow-lg border border-white/40 dark:border-slate-700/60">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-600 text-white">
                  Bước {currentStepIndex + 1}/{experiment.steps.length}
                </span>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                  {step.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                {step.instruction}
              </p>

              {/* Phenomenon display */}
              <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs">
                <div className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 mb-0.5">
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  Hiện tượng quan sát được:
                </div>
                <p className="text-amber-800 dark:text-amber-300 font-medium">
                  {step.phenomenon}
                </p>
                {step.reactionEquation && (
                  <div className="mt-1 font-mono text-[11px] text-indigo-700 dark:text-indigo-300 bg-white/60 dark:bg-slate-900/60 p-1 rounded">
                    {step.reactionEquation}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Navigation Controls & Explanation Accordion */}
      <div className="p-5 bg-white dark:bg-slate-900 flex flex-col gap-4">
        {/* Step dots and navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            {experiment.steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-7 bg-sky-600'
                    : idx < currentStepIndex
                    ? 'w-2.5 bg-sky-300 dark:bg-sky-800'
                    : 'w-2.5 bg-slate-200 dark:bg-slate-700'
                }`}
                title={`Chuyển tới bước ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Bước trước
            </button>

            <button
              onClick={handleNextStep}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-colors flex items-center gap-1.5"
            >
              {currentStepIndex < experiment.steps.length - 1 ? (
                <>
                  Tiếp tục bước kế
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Hoàn thành thí nghiệm
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Chemical Mechanism & Pedagogy Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-sky-500" />
            Giải thích bản chất hóa học & Phương trình ion:
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
            {step.explanation}
          </p>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
            {experiment.balancedEquations.map((eq, i) => (
              <span key={i} className="inline-block px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60">
                {eq}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
