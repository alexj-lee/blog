<script>
	import { PDBLoader } from '$lib/PDBLoader';
	import { onMount } from 'svelte';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	let width = 1;
	let height = 1;
	let depth = 1;
	// instantiate a loader
	let group = [];
	let group2 = [];
	let spin = 0;

	SC.onFrame(() => {
		spin += 0.01;
	});

	// load a PDB resource
	onMount(() => {
		const loader = new PDBLoader();
		let meshes = [];

		loader.load(
			// resource URL
			'/static/1jrj.pdb',
			// called when the resource is loaded
			function (pdb) {
				const geometryAtoms = pdb.geometryAtoms;
				const geometryBonds = pdb.geometryBonds;
				const json = pdb.json;
				//console.log(JSON.stringify(json));
				console.log(Object.keys(json));
				console.log(Object.keys(pdb));
				console.log(Object.keys(pdb.geometryBonds));

				// fs.writeFile('/static/test.txt', JSON.stringify(json), function (err) {
				// 	if (err) {
				// 		console.log(err);
				// 	}
				// });

				var positions = geometryAtoms.getAttribute('position');
				var colors = geometryAtoms.getAttribute('color');
				console.log('colors');
				console.log(colors.array);

				console.log('This molecule has ' + json.atoms.length + ' atoms');
				console.log('This molecule has ' + positions.count + ' atoms');
				console.log(json);

				var position = new THREE.Vector3();
				var color = new THREE.Color();
				let atom;
				let name;
				let model;
				let atom_type;
				let prev_carbon_position = null;
				// can store e/ carbons prev carbon and then as we encounter new ones add them to a queue to be added to sections
				let bonds = [];

				for (var i = 0; i < positions.count; i++) {
					position.x = positions.getX(i);
					position.y = positions.getY(i);
					position.z = positions.getZ(i);

					color.r = colors.getX(i);
					color.g = colors.getY(i);
					color.b = colors.getZ(i);

					atom = json.atoms.at(i);
					// color.r = atom.at(3).at(0);
					// color.g = atom.at(3).at(1);
					// color.b = atom.at(3).at(2);
					name = atom.at(4);
					model = atom.at(5);
					atom_type = atom.at(6);
					if (name == 'H') {
						continue;
					}

					// if (!(name == 'C')) {
					// 	continue;
					// }
					console.log(name);
					if (atom_type == 'CA') {
						//console.log(position);
						if (prev_carbon_position == null) {
							prev_carbon_position = position.clone();
							continue;
						} else {
							bonds.push([prev_carbon_position.clone(), position.clone()]);
							//console.log(prev_carbon_position, position, bonds.at(-1));
							prev_carbon_position = position.clone();
						}
					}

					if (model > 1) {
						break;
					}

					// if (i < 10) {
					// 	console.log(color.r * 255, color.b * 255, color.g * 255);
					// 	console.log(color);
					// 	console.log(atom);
					// 	console.log(name);
					// 	console.log(model);
					// }

					var material = new THREE.MeshPhongMaterial({ color: color });
					var sphereGeometry = new THREE.SphereGeometry(0.4);

					//mesh.position.multiplyScalar( 75 );
					//mesh.scale.multiplyScalar( 25 );
					group = [
						...group,
						{
							material: material,
							geometry: sphereGeometry,
							position: [positions.getX(i), positions.getY(i), positions.getZ(i)]
						}
					];
				}

				let start;
				let end;
				let path;
				let tube;
				console.log('neext sect');
				console.log(bonds);

				for (var i = 0; i < bonds.length; i++) {
					start = bonds.at(i).at(0);
					end = bonds.at(i).at(1);

					console.log(start, end);

					const _path = [
						new THREE.Vector3(start.x, start.y, start.z),
						new THREE.Vector3(end.x, end.y, end.z)
					];
					path = new THREE.CatmullRomCurve3(_path);
					tube = new THREE.TubeGeometry(path, 2, 0.25, 50);
					var tubematerial = new THREE.MeshStandardMaterial({
						color: new THREE.Color('rgb(63, 145, 176)'),
						emissive: new THREE.Color('rgb(112, 128, 144)')
					});

					group2 = [
						...group2,
						{
							material: tubematerial,
							geometry: tube
						}
					];
				}
				const zpath = [new THREE.Vector3(-10, 0, 10), new THREE.Vector3(10, 0, 10)];
				const smallcurve = new THREE.CatmullRomCurve3(zpath);
				const smallgeom = new THREE.TubeGeometry(smallcurve);
				const smallmat = new THREE.MeshStandardMaterial({ side: THREE.BackSide });
				//		group = [...group, { material: smallmat, geometry: smallgeom, position: position }];
				console.log(group);

				// 	positions = geometryBonds.getAttribute('position');
				// 	console.log(positions.count + 'bonds');

				// 	var start = new THREE.Vector3();
				// 	var end = new THREE.Vector3();

				// 	for (var i = 0; i < positions.count; i += 2) {
				// 		start.x = positions.getX(i);
				// 		start.y = positions.getY(i);
				// 		start.z = positions.getZ(i);

				// 		end.x = positions.getX(i + 1);
				// 		end.y = positions.getY(i + 1);
				// 		end.z = positions.getZ(i + 1);

				// 		//start.multiplyScalar( 75 );
				// 		//end.multiplyScalar( 75 );

				// 		var path = new THREE.CatmullRomCurve3([start, end], true);
				// 		var tube = new THREE.TubeGeometry(path, 40, 20, 80);
				// 		var material = new THREE.MeshPhongMaterial({ color: '#ff3e00', transparent: false });

				// 		// mesh.position.copy( start );
				// 		// mesh.position.lerp( end, 0.5 );
				// 		// mesh.scale.set( 5, 5, start.distanceTo( end ) );
				// 		// mesh.lookAt( end );
				// 		group = [
				// 			...group,
				// 			{
				// 				material: material,
				// 				geometry: tube,
				// 				position: [positions.getX(i), positions.getY(i), positions.getZ(i)]
				// 			}
				// 		];
				// 	}
			},
			// called when loading is in progresses
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
			},
			// called when loading has errors
			function (error) {
				console.log('An error happened');
			}
		);
	});

	console.log(group.length);
</script>

<div
	class="relative z-0 ml-0 flex h-96 w-96 flex-col items-center justify-center md:ml-72 xl:ml-96"
>
	<img src="static/1jrj.gif" />
	​<SC.Canvas antialias shadows background={new THREE.Color('lavenderblush')}>
		<!-- <SC.Group position={[0, -height / 2, 0]}>
			<SC.Mesh
				geometry={new THREE.PlaneGeometry(50, 50)}
				material={new THREE.MeshStandardMaterial({ color: 'burlywood' })}
				rotation={[-Math.PI / 2, 0, 0]}
				receiveShadow
			/>
		</SC.Group> -->
		{#await group then group}
			{#each group as items}
				<SC.Mesh
					geometry={items.geometry}
					material={items.material}
					position={items.position}
					rotation={[spin, spin, 0]}
				/>
			{/each}
		{/await}
		{#await group2 then group2}
			{#each group2 as items}
				<SC.Mesh geometry={items.geometry} material={items.material} />
			{/each}
		{/await}
		<SC.PerspectiveCamera position={[45, 50, 30]} />
		<SC.OrbitControls enableZoom={true} maxPolarAngle={Math.PI * 0.5} />
		<SC.AmbientLight intensity={0.5} />

		<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} shadow={{ mapSize: [1024, 1024] }} />
		​</SC.Canvas
	>
</div>
