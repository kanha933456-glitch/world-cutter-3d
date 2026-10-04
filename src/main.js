import * as THREE from "three";

const canvas = document.getElementById("game");
const loading = document.getElementById("loading");

// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x79c9f2);

scene.fog = new THREE.Fog(
  0x79c9f2,
  45,
  110
);

// ======================================================
// CAMERA
// ======================================================

const camera = new THREE.PerspectiveCamera(
  58,
  window.innerWidth / window.innerHeight,
  0.1,
  250
);

camera.position.set(
  0,
  8,
  13
);

// ======================================================
// RENDERER
// ======================================================

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: "high-performance"
});

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 1.5)
);

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

// ======================================================
// LIGHTING
// ======================================================

const skyLight =
  new THREE.HemisphereLight(
    0xbde9ff,
    0x315d35,
    2.2
  );

scene.add(skyLight);

const sun =
  new THREE.DirectionalLight(
    0xffffff,
    3.2
  );

sun.position.set(
  20,
  30,
  15
);

sun.castShadow = true;

sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;

sun.shadow.camera.left = -30;
sun.shadow.camera.right = 30;
sun.shadow.camera.top = 30;
sun.shadow.camera.bottom = -30;

scene.add(sun);

// ======================================================
// MATERIALS
// ======================================================

const grassMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x69c94a,
    roughness: 0.95
  });

const soilMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x7b4b2a,
    roughness: 1
  });

const stoneMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x777b78,
    roughness: 1
  });

const trunkMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x6d4327,
    roughness: 1
  });

const leafMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x278b3b,
    roughness: 0.9
  });

// ======================================================
// MAIN FLOATING ISLAND
// ======================================================

const island = new THREE.Group();

scene.add(island);

// Soil body

const soilGeometry =
  new THREE.CylinderGeometry(
    12,
    8,
    3.2,
    48
  );

const soil =
  new THREE.Mesh(
    soilGeometry,
    soilMaterial
  );

soil.position.y = -1.1;
soil.castShadow = true;
soil.receiveShadow = true;

island.add(soil);

// Grass top

const grassGeometry =
  new THREE.CylinderGeometry(
    12.15,
    12.15,
    0.35,
    48
  );

const grass =
  new THREE.Mesh(
    grassGeometry,
    grassMaterial
  );

grass.position.y = 0.55;

grass.receiveShadow = true;

island.add(grass);

// ======================================================
// FLOATING ROCKS UNDER ISLAND
// ======================================================

function createIslandRock(
  x,
  y,
  z,
  scale
) {

  const geometry =
    new THREE.DodecahedronGeometry(
      scale,
      1
    );

  const rock =
    new THREE.Mesh(
      geometry,
      stoneMaterial
    );

  rock.position.set(
    x,
    y,
    z
  );

  rock.rotation.set(
    Math.random(),
    Math.random(),
    Math.random()
  );

  rock.castShadow = true;

  island.add(rock);
}

createIslandRock(
  -5,
  -3.0,
  2,
  1.2
);

createIslandRock(
  4,
  -3.4,
  -1,
  1.4
);

createIslandRock(
  -1,
  -3.5,
  -4,
  1.0
);

createIslandRock(
  6,
  -2.8,
  3,
  0.9
);

// ======================================================
// TREE SYSTEM
// ======================================================

function createTree(
  x,
  z,
  scale = 1
) {

  const tree =
    new THREE.Group();

  const trunkGeometry =
    new THREE.CylinderGeometry(
      0.22 * scale,
      0.32 * scale,
      1.7 * scale,
      8
    );

  const trunk =
    new THREE.Mesh(
      trunkGeometry,
      trunkMaterial
    );

  trunk.position.y =
    1.25 * scale;

  trunk.castShadow = true;

  tree.add(trunk);

  const crownGeometry =
    new THREE.SphereGeometry(
      1.05 * scale,
      14,
      12
    );

  const crown =
    new THREE.Mesh(
      crownGeometry,
      leafMaterial
    );

  crown.position.y =
    2.55 * scale;

  crown.castShadow = true;

  tree.add(crown);

  tree.position.set(
    x,
    0.65,
    z
  );

  island.add(tree);

  return tree;
}

createTree(-5.5, -4.2, 1.15);
createTree(5.5, -3.5, 1.25);
createTree(-6.2, 3.2, 0.95);
createTree(6.0, 4.2, 1.1);
createTree(2.7, -6.2, 0.85);

// ======================================================
// ROCK SYSTEM
// ======================================================

function createRock(
  x,
  z,
  scale = 1
) {

  const geometry =
    new THREE.DodecahedronGeometry(
      0.65 * scale,
      1
    );

  const rock =
    new THREE.Mesh(
      geometry,
      stoneMaterial
    );

  rock.position.set(
    x,
    1.05,
    z
  );

  rock.rotation.set(
    0.2,
    Math.random() * Math.PI,
    0.1
  );

  rock.castShadow = true;

  island.add(rock);
}

createRock(-3.2, 4.8, 1.0);
createRock(3.5, 2.5, 0.8);
createRock(-7.0, -0.2, 0.7);
createRock(7.0, 0.5, 0.9);

// ======================================================
// PLAYER
// ======================================================

const player =
  new THREE.Group();

scene.add(player);

// Body

const bodyGeometry =
  new THREE.CapsuleGeometry(
    0.48,
    0.85,
    8,
    16
  );

const bodyMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x1769aa,
    roughness: 0.65
  });

const body =
  new THREE.Mesh(
    bodyGeometry,
    bodyMaterial
  );

body.position.y = 1.05;
body.castShadow = true;

player.add(body);

// Head

const headGeometry =
  new THREE.SphereGeometry(
    0.43,
    20,
    16
  );

const skinMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xffc49d,
    roughness: 0.8
  });

const head =
  new THREE.Mesh(
    headGeometry,
    skinMaterial
  );

head.position.y = 1.95;
head.castShadow = true;

player.add(head);

// Hair

const hairGeometry =
  new THREE.SphereGeometry(
    0.45,
    16,
    10
  );

const hairMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x20252b,
    roughness: 0.8
  });

const hair =
  new THREE.Mesh(
    hairGeometry,
    hairMaterial
  );

hair.scale.set(
  1,
  0.55,
  1
);

hair.position.set(
  0,
  2.22,
  -0.02
);

hair.castShadow = true;

player.add(hair);

// Cap

const capGeometry =
  new THREE.CylinderGeometry(
    0.47,
    0.47,
    0.16,
    20
  );

const capMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x173d7a,
    roughness: 0.6
  });

const cap =
  new THREE.Mesh(
    capGeometry,
    capMaterial
  );

cap.position.y = 2.35;
cap.rotation.x = 0.05;

cap.castShadow = true;

player.add(cap);

// Cap visor

const visorGeometry =
  new THREE.BoxGeometry(
    0.42,
    0.06,
    0.28
  );

const visor =
  new THREE.Mesh(
    visorGeometry,
    capMaterial
  );

visor.position.set(
  0,
  2.29,
  0.42
);

visor.castShadow = true;

player.add(visor);

// Arms

function createArm(side) {

  const armGeometry =
    new THREE.CapsuleGeometry(
      0.16,
      0.65,
      6,
      10
    );

  const arm =
    new THREE.Mesh(
      armGeometry,
      bodyMaterial
    );

  arm.position.set(
    side * 0.62,
    1.08,
    0
  );

  arm.rotation.z =
    side * -0.15;

  arm.castShadow = true;

  player.add(arm);

  return arm;
}

const leftArm =
  createArm(-1);

const rightArm =
  createArm(1);

// Legs

function createLeg(side) {

  const legGeometry =
    new THREE.CapsuleGeometry(
      0.17,
      0.7,
      6,
      10
    );

  const legMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x202c3d,
      roughness: 0.8
    });

  const leg =
    new THREE.Mesh(
      legGeometry,
      legMaterial
    );

  leg.position.set(
    side * 0.25,
    0.32,
    0
  );

  leg.castShadow = true;

  player.add(leg);

  return leg;
}

const leftLeg =
  createLeg(-1);

const rightLeg =
  createLeg(1);

player.position.set(
  0,
  0.7,
  0
);

// ======================================================
// PLAYER TERRITORY
// ======================================================

const territoryGeometry =
  new THREE.CylinderGeometry(
    4.2,
    4.2,
    0.05,
    48
  );

const territoryMaterial =
  new THREE.MeshBasicMaterial({
    color: 0x39ff5a,
    transparent: true,
    opacity: 0.20
  });

const territory =
  new THREE.Mesh(
    territoryGeometry,
    territoryMaterial
  );

territory.position.y =
  0.82;

island.add(territory);

// Territory border

const borderGeometry =
  new THREE.RingGeometry(
    4.05,
    4.15,
    48
  );

const borderMaterial =
  new THREE.MeshBasicMaterial({
    color: 0x36ff56,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  });

const border =
  new THREE.Mesh(
    borderGeometry,
    borderMaterial
  );

border.rotation.x =
  -Math.PI / 2;

border.position.y =
  0.86;

island.add(border);

// ======================================================
// BACKGROUND FLOATING ISLANDS
// ======================================================

function createBackgroundIsland(
  x,
  y,
  z,
  scale
) {

  const group =
    new THREE.Group();

  const bottomGeometry =
    new THREE.CylinderGeometry(
      4 * scale,
      2.8 * scale,
      1.5 * scale,
      24
    );

  const bottom =
    new THREE.Mesh(
      bottomGeometry,
      soilMaterial
    );

  bottom.castShadow = true;

  group.add(bottom);

  const topGeometry =
    new THREE.CylinderGeometry(
      4.1 * scale,
      4.1 * scale,
      0.2 * scale,
      24
    );

  const top =
    new THREE.Mesh(
      topGeometry,
      grassMaterial
    );

  top.position.y =
    0.8 * scale;

  group.add(top);

  group.position.set(
    x,
    y,
    z
  );

  scene.add(group);
}

createBackgroundIsland(
  -20,
  -3,
  -18,
  1.2
);

createBackgroundIsland(
  20,
  0,
  -20,
  1.0
);

createBackgroundIsland(
  -19,
  3,
  10,
  0.8
);

createBackgroundIsland(
  18,
  5,
  12,
  1.1
);

// ======================================================
// CLOUDS
// ======================================================

function createCloud(
  x,
  y,
  z,
  scale
) {

  const cloud =
    new THREE.Group();

  const cloudMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1
    });

  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const geometry =
      new THREE.SphereGeometry(
        (1 + Math.random() * 0.5) *
          scale,
        12,
        8
      );

    const puff =
      new THREE.Mesh(
        geometry,
        cloudMaterial
      );

    puff.position.set(
      (i - 1.5) *
        scale *
        1.1,
      Math.random() *
        0.5 *
        scale,
      Math.sin(i) *
        0.3 *
        scale
    );

    cloud.add(puff);
  }

  cloud.position.set(
    x,
    y,
    z
  );

  scene.add(cloud);
}

createCloud(
  -18,
  12,
  -12,
  1.2
);

createCloud(
  16,
  14,
  -5,
  1.0
);

createCloud(
  0,
  15,
  -25,
  1.5
);

// ======================================================
// HUD
// ======================================================

const hud =
  document.createElement("div");

hud.style.position = "fixed";
hud.style.left = "0";
hud.style.top = "0";
hud.style.width = "100%";
hud.style.padding = "14px";
hud.style.display = "flex";
hud.style.justifyContent =
  "space-between";
hud.style.alignItems = "center";
hud.style.pointerEvents = "none";
hud.style.color = "white";
hud.style.fontFamily =
  "Arial, sans-serif";
hud.style.fontWeight = "bold";
hud.style.fontSize = "15px";
hud.style.textShadow =
  "0 2px 4px rgba(0,0,0,.8)";
hud.style.zIndex = "5";

hud.innerHTML = `
  <div>
    <div>TIME</div>
    <div id="timeValue">01:00</div>
  </div>

  <div style="text-align:center">
    <div>TERRITORY</div>
    <div id="territoryValue">12%</div>
  </div>

  <div style="text-align:right">
    <div>SCORE</div>
    <div id="scoreValue">0</div>
  </div>
`;

document.body.appendChild(hud);

// ======================================================
// PAUSE BUTTON
// ======================================================

const pauseButton =
  document.createElement("button");

pauseButton.textContent = "Ⅱ";

pauseButton.style.position =
  "fixed";

pauseButton.style.right =
  "15px";

pauseButton.style.top =
  "75px";

pauseButton.style.width =
  "48px";

pauseButton.style.height =
  "48px";

pauseButton.style.border =
  "none";

pauseButton.style.borderRadius =
  "50%";

pauseButton.style.background =
  "rgba(0,0,0,.55)";

pauseButton.style.color =
  "white";

pauseButton.style.fontSize =
  "20px";

pauseButton.style.zIndex =
  "6";

document.body.appendChild(
  pauseButton
);

// ======================================================
// CAMERA
// ======================================================

const cameraOffset =
  new THREE.Vector3(
    0,
    8.5,
    12
  );

function updateCamera() {

  const target =
    player.position
      .clone()
      .add(cameraOffset);

  camera.position.lerp(
    target,
    0.06
  );

  camera.lookAt(
    player.position.x,
    player.position.y + 0.8,
    player.position.z
  );
}

// ======================================================
// SIMPLE IDLE ANIMATION
// ======================================================

let elapsed = 0;

function animatePlayer(
  delta
) {

  elapsed += delta;

  const bob =
    Math.sin(elapsed * 3) *
    0.025;

  body.position.y =
    1.05 + bob;

  head.position.y =
    1.95 + bob;

  hair.position.y =
    2.22 + bob;

  cap.position.y =
    2.35 + bob;

  visor.position.y =
    2.29 + bob;

  leftArm.rotation.z =
    -0.15 +
    Math.sin(elapsed * 2) *
    0.015;

  rightArm.rotation.z =
    0.15 +
    Math.sin(elapsed * 2) *
    0.015;
}

// ======================================================
// RESIZE
// ======================================================

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        1.5
      )
    );
  }
);

// ======================================================
// GAME LOOP
// ======================================================

const clock =
  new THREE.Clock();

function animate() {

  requestAnimationFrame(
    animate
  );

  const delta =
    clock.getDelta();

  animatePlayer(delta);

  updateCamera();

  renderer.render(
    scene,
    camera
  );
}

animate();

// ======================================================
// LOADING
// ======================================================

setTimeout(() => {

  loading.style.display =
    "none";

}, 1000);
