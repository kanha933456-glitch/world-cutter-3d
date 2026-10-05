import * as THREE from "three";

export function createPlayerCharacter() {
  const player = new THREE.Group();

  // ==================================================
  // MATERIALS
  // ==================================================

  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xc9825b,
    roughness: 0.85
  });

  const hairMaterial = new THREE.MeshStandardMaterial({
    color: 0x26303a,
    roughness: 0.9
  });

  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0x1769c2,
    roughness: 0.8
  });

  const jacketMaterial = new THREE.MeshStandardMaterial({
    color: 0x1769c2,
    roughness: 0.9
  });

  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x182536,
    roughness: 0.9
  });

  const shoeMaterial = new THREE.MeshStandardMaterial({
    color: 0xe8edf2,
    roughness: 0.8
  });

  const whiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.8
  });

  // ==================================================
  // BODY
  // ==================================================

  const bodyGeometry = new THREE.CapsuleGeometry(
    0.62,
    0.95,
    8,
    16
  );

  const body = new THREE.Mesh(
    bodyGeometry,
    jacketMaterial
  );

  body.position.y = 1.65;
  body.castShadow = true;
  body.receiveShadow = true;

  player.add(body);

  // ==================================================
  // HEAD
  // ==================================================

  const headGeometry = new THREE.SphereGeometry(
    0.55,
    24,
    18
  );

  const head = new THREE.Mesh(
    headGeometry,
    skinMaterial
  );

  head.scale.set(0.95, 1.05, 0.9);
  head.position.y = 2.75;

  head.castShadow = true;

  player.add(head);

  // ==================================================
  // HAIR
  // ==================================================

  const hairGeometry = new THREE.SphereGeometry(
    0.52,
    20,
    12
  );

  const hair = new THREE.Mesh(
    hairGeometry,
    hairMaterial
  );

  hair.scale.set(1, 0.48, 0.95);
  hair.position.set(0, 3.05, 0);

  hair.castShadow = true;

  player.add(hair);

  // ==================================================
  // CAP
  // ==================================================

  const capTopGeometry = new THREE.SphereGeometry(
    0.58,
    20,
    12,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );

  const capTop = new THREE.Mesh(
    capTopGeometry,
    capMaterial
  );

  capTop.scale.set(1, 0.65, 1);
  capTop.position.set(0, 3.25, 0);

  capTop.castShadow = true;

  player.add(capTop);

  // Cap visor

  const visorGeometry = new THREE.CylinderGeometry(
    0.28,
    0.42,
    0.08,
    20
  );

  const visor = new THREE.Mesh(
    visorGeometry,
    capMaterial
  );

  visor.rotation.x = Math.PI / 2;
  visor.scale.set(1, 0.55, 1);
  visor.position.set(0, 3.13, 0.48);

  visor.castShadow = true;

  player.add(visor);

  // ==================================================
  // EYES
  // ==================================================

  const eyeGeometry = new THREE.SphereGeometry(
    0.075,
    12,
    8
  );

  const leftEye = new THREE.Mesh(
    eyeGeometry,
    whiteMaterial
  );

  leftEye.position.set(
    -0.19,
    2.78,
    0.50
  );

  player.add(leftEye);

  const rightEye = new THREE.Mesh(
    eyeGeometry,
    whiteMaterial
  );

  rightEye.position.set(
    0.19,
    2.78,
    0.50
  );

  player.add(rightEye);

  // Pupils

  const pupilGeometry = new THREE.SphereGeometry(
    0.035,
    10,
    8
  );

  const pupilMaterial = new THREE.MeshStandardMaterial({
    color: 0x17202b
  });

  const leftPupil = new THREE.Mesh(
    pupilGeometry,
    pupilMaterial
  );

  leftPupil.position.set(
    -0.19,
    2.78,
    0.565
  );

  player.add(leftPupil);

  const rightPupil = new THREE.Mesh(
    pupilGeometry,
    pupilMaterial
  );

  rightPupil.position.set(
    0.19,
    2.78,
    0.565
  );

  player.add(rightPupil);

  // ==================================================
  // ARMS
  // ==================================================

  const armGeometry = new THREE.CapsuleGeometry(
    0.20,
    0.65,
    8,
    12
  );

  const leftArm = new THREE.Mesh(
    armGeometry,
    jacketMaterial
  );

  leftArm.position.set(
    -0.78,
    1.75,
    0
  );

  leftArm.rotation.z = -0.15;

  leftArm.castShadow = true;

  player.add(leftArm);

  const rightArm = new THREE.Mesh(
    armGeometry,
    jacketMaterial
  );

  rightArm.position.set(
    0.78,
    1.75,
    0
  );

  rightArm.rotation.z = 0.15;

  rightArm.castShadow = true;

  player.add(rightArm);

  // ==================================================
  // HANDS
  // ==================================================

  const handGeometry = new THREE.SphereGeometry(
    0.22,
    14,
    10
  );

  const leftHand = new THREE.Mesh(
    handGeometry,
    skinMaterial
  );

  leftHand.position.set(
    -0.83,
    1.25,
    0
  );

  leftHand.castShadow = true;

  player.add(leftHand);

  const rightHand = new THREE.Mesh(
    handGeometry,
    skinMaterial
  );

  rightHand.position.set(
    0.83,
    1.25,
    0
  );

  rightHand.castShadow = true;

  player.add(rightHand);

  // ==================================================
  // LEGS
  // ==================================================

  const legGeometry = new THREE.CapsuleGeometry(
    0.25,
    0.65,
    8,
    12
  );

  const leftLeg = new THREE.Mesh(
    legGeometry,
    darkMaterial
  );

  leftLeg.position.set(
    -0.32,
    0.85,
    0
  );

  leftLeg.castShadow = true;

  player.add(leftLeg);

  const rightLeg = new THREE.Mesh(
    legGeometry,
    darkMaterial
  );

  rightLeg.position.set(
    0.32,
    0.85,
    0
  );

  rightLeg.castShadow = true;

  player.add(rightLeg);

  // ==================================================
  // SHOES
  // ==================================================

  const shoeGeometry = new THREE.BoxGeometry(
    0.48,
    0.28,
    0.72
  );

  const leftShoe = new THREE.Mesh(
    shoeGeometry,
    shoeMaterial
  );

  leftShoe.position.set(
    -0.32,
    0.35,
    0.12
  );

  leftShoe.castShadow = true;

  player.add(leftShoe);

  const rightShoe = new THREE.Mesh(
    shoeGeometry,
    shoeMaterial
  );

  rightShoe.position.set(
    0.32,
    0.35,
    0.12
  );

  rightShoe.castShadow = true;

  player.add(rightShoe);

  // ==================================================
  // SMALL CHEST DETAIL
  // ==================================================

  const chestGeometry = new THREE.BoxGeometry(
    0.38,
    0.30,
    0.06
  );

  const chest = new THREE.Mesh(
    chestGeometry,
    whiteMaterial
  );

  chest.position.set(
    0,
    1.75,
    0.59
  );

  player.add(chest);

  return player;
}
