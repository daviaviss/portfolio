document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("cubo-tecnologico");
    const scene = new THREE.Scene();
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.PointLight(0xffffff, 0.5, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    camera.position.z = 16;

    const targetOpacity = { value: 1 };
    const lerpSpeed = 0.1;

    const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.y += 0.02;
        cube.rotation.x += 0.02;

        cube.material.opacity = THREE.MathUtils.lerp(
            cube.material.opacity,
            targetOpacity.value,
            lerpSpeed
        );
        renderer.render(scene, camera);
    };

    animate();

    container.addEventListener("click", onContainerClick, false);
    container.addEventListener("mousemove", onContainerMouseMove, false);

    function onContainerClick(event) {
        event.preventDefault();

        const rect = container.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        const mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

        const vector = new THREE.Vector2(mouseX, mouseY);
        const raycaster = new THREE.Raycaster();

        raycaster.setFromCamera(vector, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0 && intersects[0].object === cube) {
            // Vá para a próxima seção
            document
                .getElementById("sessao-dois")
                .scrollIntoView({ behavior: "smooth" });
        }
    }

    function onContainerMouseMove(event) {
        event.preventDefault();

        const rect = container.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        const mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

        const vector = new THREE.Vector2(mouseX, mouseY);
        const raycaster = new THREE.Raycaster();

        raycaster.setFromCamera(vector, camera);
        const intersects = raycaster.intersectObject(cube);

        if (intersects.length > 0) {
            container.style.cursor = "pointer";
            targetOpacity.value = 0.3;
        } else {
            container.style.cursor = "default";
            targetOpacity.value = 1;
        }
    }
});
