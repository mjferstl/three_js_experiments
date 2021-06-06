function createXLine(length=1, color=0xff0000) {
    let material = new THREE.LineBasicMaterial({ color: color, linewidth: 3 });
    let points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(length, 0, 0));
    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
}

function createYLine(length=1, color=0x00ff00) {
    let material = new THREE.LineBasicMaterial({ color: color, linewidth: 3 });
    let points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(0, length, 0));
    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
}

function createZLine(length=1, color=0x0000ff) {
    let material = new THREE.LineBasicMaterial({ color: color, linewidth: 3 });
    let points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(0, 0, length));
    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
}

function createCoordinateSystem(x, y, z) {
    const group = new THREE.Group();
    group.add(createXLine());
    group.add(createYLine());
    group.add(createZLine());
    return group;
}

export {createCoordinateSystem}