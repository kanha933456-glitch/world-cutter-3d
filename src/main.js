import * as THREE from "three";

const canvas = document.getElementById("game");
const loading = document.getElementById("loading");

// --------------------------------------------------
// SCENE
// --------------------------------------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

scene.fog = new THREE.Fog(0x87ceeb, 35, 90);

// --------------------------------------------------
// CAMERA
// --------------------------------------------------

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.set(0, 9, 14);

// --------------------------------------------------
// RENDERER
// --------------------------------------------------

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
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// --------------------------------------------------
// LIGHTING
// --------------------------------------------------

const ambientLight = new THREE.HemisphereLight(
  0xffffff,
  0x4a7048,
  2.0
);

scene.add(ambientLight);

const sun = new THREE.DirectionalLight(
  0xffffff,
  3.0
);

sun.position.set(15, 25, 10);

sun.castShadow = true;

sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;

scene.add(sun);

// --------------------------------------------------
// FLOATING ISLAND
// --------------------------------------------------

const islandGeometry = new THREE.CylinderGeometry(
  12,
  9,
  2.5,
  48
);

const islandMaterial = new THREE.MeshStandardMaterial({
  color: 0x4caf50,
  roughness: 0.9
});

const island = new THREE.Mesh(
  islandGeometry,
  islandMaterial
);

island.position.y = -1;

island.receiveShadow = true;

scene.add(island);

// --------------------------------------------------
// GRASS TOP
// --------------------------------------------------

const grassGeometry = new THREE.CylinderGeometry(
  11.7,
  11.7,
  0.25,
  48
);

const grassMaterial = new THREE.MeshStandardMaterial({
  color: 0x76c442,
  roughness: 1
});

const grass = new THREE.Mesh(
  grassGeometry,
  grassMaterial
);

grass.position.y = 0.35;

grass.receiveShadow = true;

scene.add(grass);

// --------------------------------------------------
// PLAYER
// --------------------------------------------------

const player = new THREE.Group();

const bodyGeometry = new THREE.CapsuleGeometry(
  0.55,
  1.0,
  8,
  16
);

const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0x2196f3,
  roughness: 0.7
});

const body = new THREE.Mesh(
  bodyGeometry,
  bodyMaterial
);

body.position.y = 1.0;

body.castShadow = true;

player.add(body);

// Head

const headGeometry = new THREE.SphereGeometry(
  0.42,
  16,
  12
);

const headMaterial = new THREE.MeshStandardMaterial({
  color: 0xffc39b,
  roughness: 0.8
});

const head = new THREE.Mesh(
  headGeometry,
  headMaterial
);

head.position.y = 1.9;

head.castShadow = true;

player.add(head);

// Player position

player.position.set(0, 0.45, 0);

scene.add(player);

// --------------------------------------------------
// SIMPLE TREES
// --------------------------------------------------

function createTree(x, z, scale = 1) {

  const tree = new THREE.Group();

  const trunkGeometry =
    new THREE.CylinderGeometry(
      0.18 * scale,
      0.25 * scale,
      1.5 * scale,
      8
    );

  const trunkMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x795548
    });

  const trunk = new THREE.Mesh(
    trunkGeometry,
    trunkMaterial
  );

  trunk.position.y =
    1.1 * scale;

  trunk.castShadow = true;

  tree.add(trunk);

  const leavesGeometry =
    new THREE.SphereGeometry(
      0.85 * scale,
      12,
      10
    );

  const leavesMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x2e7d32
    });

  const leaves = new THREE.Mesh(
    leavesGeometry,
    leavesMaterial
  );

  leaves.position.y =
    2.1 * scale;

  leaves.castShadow = true;

  tree.add(leaves);

  tree.position.set(x, 0.45, z);

  scene.add(tree);
}

// Trees

createTree(-5, -4, 1.1);
createTree(5, -3, 0.9);
createTree(-6, 4, 1.0);
createTree(6, 4, 1.2);
createTree(2, -6, 0.8);

// --------------------------------------------------
// ROCKS
// --------------------------------------------------

function createRock(x, z, scale = 1) {

  const geometry =
    new THREE.DodecahedronGeometry(
      0.6 * scale,
      0
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x777777,
      roughness: 1
    });

  const rock =
    new THREE.Mesh(geometry, material);

  rock.position.set(
    x,
    0.75,
    z
  );

  rock.rotation.y =
    Math.random() * Math.PI;

  rock.castShadow = true;

  scene.add(rock);
}

createRock(-3, 5, 1);
createRock(4, 2, 0.8);
createRock(-7, 0, 0.7);

// --------------------------------------------------
// CAMERA FOLLOW
// --------------------------------------------------

const cameraOffset =
  new THREE.Vector3(0, 8, 12);

function updateCamera() {

  const targetPosition =
    player.position.clone().add(
      cameraOffset
    );

  camera.position.lerp(
    targetPosition,
    0.08
  );

  camera.lookAt(
    player.position.x,
    player.position.y + 1,
    player.position.z
  );
}

// --------------------------------------------------
// RESIZE
// --------------------------------------------------

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
  }
);

// --------------------------------------------------
// GAME LOOP
// --------------------------------------------------

function animate() {

  requestAnimationFrame(
    animate
  );

  updateCamera();

  renderer.render(
    scene,
    camera
  );
}

animate();

// --------------------------------------------------
// LOADING COMPLETE
// --------------------------------------------------

setTimeout(() => {

  loading.style.display =
    "none";

}, 800);
