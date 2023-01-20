<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js';

	let width = 1;
	let height = 1;
	let depth = 1;
	// instantiate a loader
	let group = [];

	// load a PDB resource

	// const catcurve = new THREE.CatmullRomCurve3(path);
	// const tgeometry = new THREE.TubeGeometry(catcurve, 20, 2, 8, false);
	// const nmaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

	// const points = curve.getPoints(50);
	// const geometry = new THREE.BufferGeometry().setFromPoints(points);
	// const material = new THREE.LineBasicMaterial();
	// const curveObject = new THREE.Line(geometry, material);

	var pts = [];
	// Define points along Z axis
	for (let i = 0; i < 5; i += 1) {
		pts.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
	}

	var mcurve = new THREE.CatmullRomCurve3(pts);
	var tubeMaterial = new THREE.MeshStandardMaterial({
		side: THREE.BackSide
	});

	var tubeGeometry = new THREE.TubeGeometry(mcurve, 70, 0.02, 50, false);

	const sphere = new THREE.SphereGeometry(1, 32, 32);
	const material = new THREE.MeshStandardMaterial({ emissive: 0xffffdd });

	const path = [new THREE.Vector3(-10, 0, 10), new THREE.Vector3(10, 0, 10)];
	const smallcurve = new THREE.CatmullRomCurve3(path);
	const smallgeom = new THREE.TubeGeometry(smallcurve);
	const smallmat = new THREE.MeshStandardMaterial({ side: THREE.BackSide });
</script>

​<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
	<SC.Mesh geometry={tubeGeometry} material={tubeMaterial} />
	<SC.Mesh geometry={sphere} {material} />
	<SC.Mesh geometry={smallgeom} {smallmat} />

	<SC.PerspectiveCamera position={[1, 1, 3]} />
	<SC.OrbitControls enableZoom={true} />
	<SC.AmbientLight intensity={0.6} />

	<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
	​</SC.Canvas
>
