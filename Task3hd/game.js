import * as THREE from 'three';

const container = document.getElementById('game-container');
const overlay = document.getElementById('overlay');
const deathScreen = document.getElementById('death-screen');
const winScreen = document.getElementById('win-screen');
const flagDisplay = document.getElementById('flag-display');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
container.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

const playerGroup = new THREE.Group();
const bodyGeo = new THREE.CapsuleGeometry(0.3, 0.8, 4, 8);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.position.y = 0.7;
playerGroup.add(body);

const head = new THREE.Object3D();
head.position.y = 1.3;
playerGroup.add(head);
head.add(camera);

const handGeo = new THREE.BoxGeometry(0.2, 0.2, 0.6);
const handMat = new THREE.MeshBasicMaterial({ color: 0xd2b48c });
const hand = new THREE.Mesh(handGeo, handMat);
hand.position.set(0.5, -0.4, -0.6);
hand.rotation.set(0.5, -0.5, 0);
camera.add(hand);

playerGroup.position.set(0, 1, -2);
playerGroup.rotation.y = Math.PI;
scene.add(playerGroup);

const startPlatform = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 4), new THREE.MeshStandardMaterial({ color: 0x333333 }));
startPlatform.position.set(0, -0.5, -2);
scene.add(startPlatform);

const glasses = [];
const glassOffset = 2.25;
const totalSteps = window.GAME_STEPS || 30;
const COLOR_DEFAULT = 0xB2B2B2;
const COLOR_SUCCESS = 0x7EAF34;
const COLOR_FAIL = 0x963430;

for (let i = 0; i < totalSteps; i++) {
    for (let j = 0; j < 2; j++) {
        const g = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 1.5), new THREE.MeshBasicMaterial({
            color: COLOR_DEFAULT,
            transparent: true,
            opacity: 0.9
        }));
        g.position.set(j === 0 ? -1.2 : 1.2, 0, i * 3 + glassOffset);
        g.userData = { step: i, side: j, broken: false, checking: false };
        scene.add(g);
        glasses.push(g);
    }
}

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const speed = 5;
const jumpForce = 8;
const gravity = 20;
let canJump = false;
let isDead = false;
let isWon = false;
let currentStep = -1;
let isLocked = false;
let gameSessionId = 0;

const keys = { w: false, a: false, s: false, d: false, ' ': false };

overlay.addEventListener('click', () => {
    container.requestPointerLock();
});

document.addEventListener('pointerlockchange', () => {
    const wasLocked = isLocked;
    isLocked = document.pointerLockElement === container;

    if (isLocked) {
        overlay.style.display = 'none';
        if (!wasLocked) {
            ignoreNextMove = true;
        }
    } else {
        if (!isDead && !isWon) {
            overlay.style.display = 'flex';
            document.querySelector('#overlay h1').innerText = "Click to Resume";
        }
    }
});

document.addEventListener('pointerlockerror', () => {
    console.error('Pointer lock failed');
    if (!isDead && !isWon) {
        overlay.style.display = 'flex';
        document.querySelector('#overlay h1').innerText = "Click to Resume";
    }
});

let ignoreNextMove = false;

document.addEventListener('mousemove', (e) => {
    if (!isLocked || isDead || isWon) return;

    if (ignoreNextMove) {
        ignoreNextMove = false;
        return;
    }

    const movementX = Math.max(-50, Math.min(50, e.movementX));
    const movementY = Math.max(-50, Math.min(50, e.movementY));

    playerGroup.rotation.y -= movementX * 0.002;
    head.rotation.x -= movementY * 0.002;
    head.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, head.rotation.x));
});

window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

const clock = new THREE.Clock();

function showDeathScreen() {
    document.exitPointerLock();
    deathScreen.style.display = 'flex';
}

function showWinScreen(flag) {
    isWon = true;
    document.exitPointerLock();
    flagDisplay.innerText = flag;
    winScreen.style.display = 'flex';
}

window.respawn = function () {
    fetch('?act=respawn');
    isDead = false;
    currentStep = -1;
    gameSessionId++;
    document.getElementById('step').innerText = '0';
    document.getElementById('msg').innerText = '';

    playerGroup.position.set(0, 1, -2);
    playerGroup.rotation.set(0, Math.PI, 0);
    head.rotation.set(0, 0, 0);
    velocity.set(0, 0, 0);

    for (const g of glasses) {
        g.visible = true;
        g.userData.broken = false;
        g.userData.checking = false;
        g.material.color.setHex(COLOR_DEFAULT);
    }

    deathScreen.style.display = 'none';
    container.requestPointerLock();
};

fetch('?act=respawn');

async function checkMove(step, side) {
    if (step <= currentStep) return;

    const glass = glasses.find(g => g.userData.step === step && g.userData.side === side);
    if (!glass || glass.userData.checking) return;

    glass.userData.checking = true;
    const thisSessionId = gameSessionId;

    try {
        const res = await fetch(`?act=move&step=${step}&side=${side}`).then(r => r.text());

        if (thisSessionId !== gameSessionId) return;

        if (res.startsWith('ok')) {
            currentStep = step;
            document.getElementById('step').innerText = currentStep + 1;
            if (glass) glass.material.color.setHex(COLOR_SUCCESS);
            if (res.includes('{')) {
                showWinScreen(res.split('|')[1]);
            }
        } else if (res === 'dead') {
            if (glass) glass.material.color.setHex(COLOR_FAIL);
            isDead = true;
            document.getElementById('msg').innerText = "Broken!";

            setTimeout(() => {
                if (thisSessionId !== gameSessionId) return;

                if (glass) {
                    glass.visible = false;
                    glass.userData.broken = true;
                }
            }, 500);
        } else {
            console.warn('Unknown response:', res);
        }
    } catch (e) {
        console.error(e);
    } finally {
        if (glass) glass.userData.checking = false;
    }
}

function update(delta) {
    if (isDead) {
        playerGroup.position.y -= 10 * delta;
        if (playerGroup.position.y < -20) {
            showDeathScreen();
        }
        return;
    }

    direction.set(0, 0, 0);
    if (keys['w']) direction.z -= 1;
    if (keys['s']) direction.z += 1;
    if (keys['a']) direction.x -= 1;
    if (keys['d']) direction.x += 1;

    if (direction.length() > 0) direction.normalize();
    direction.applyEuler(playerGroup.rotation);

    velocity.x = direction.x * speed;
    velocity.z = direction.z * speed;
    velocity.y -= gravity * delta;

    if (keys[' '] && canJump) {
        velocity.y = jumpForce;
        canJump = false;
    }

    playerGroup.position.x += velocity.x * delta;
    playerGroup.position.y += velocity.y * delta;
    playerGroup.position.z += velocity.z * delta;

    let onGround = false;

    if (playerGroup.position.z < 0 && playerGroup.position.z > -4 && Math.abs(playerGroup.position.x) < 2) {
        if (playerGroup.position.y <= 0.1 && playerGroup.position.y >= -0.5 && velocity.y <= 0) {
            playerGroup.position.y = 0;
            velocity.y = 0;
            onGround = true;
        }
    }

    for (const g of glasses) {
        if (g.userData.broken) continue;

        const dx = Math.abs(playerGroup.position.x - g.position.x);
        const dz = Math.abs(playerGroup.position.z - g.position.z);

        if (dx < 0.6 && dz < 0.6) {
            if (playerGroup.position.y <= 0.1 && playerGroup.position.y >= -0.5 && velocity.y <= 0) {
                playerGroup.position.y = 0;
                velocity.y = 0;
                onGround = true;
                if (g.userData.step > currentStep) checkMove(g.userData.step, g.userData.side);
            }
        }
    }

    canJump = onGround;

    if (playerGroup.position.y < -10 && !isDead) {
        isDead = true;
        document.getElementById('msg').innerText = "Fell!";
    }
}

function animate() {
    requestAnimationFrame(animate);
    update(clock.getDelta());
    renderer.render(scene, camera);
}

animate();