import {MeshBasicMaterial, MeshStandardMaterial, ShaderLib} from 'three'

// var CustomMaterial = function (parameters = {}) {

// 	MeshStandardMaterial.call( this );
// 	this.type = 'CustomMaterial';

// 	// set the shaders
// 	Object.assign(this, {
// 		vertexShader: ShaderLib['physical']['vertexShader'],
// 		fragmentShader: ShaderLib['physical']['fragmentShader'],
// 		uniforms: ShaderLib['standard']['uniforms'],
// 	},  parameters);

// 	//
// 	this.setValues(parameters);
// }

// CustomMaterial.prototype = Object.create( MeshStandardMaterial.prototype );
// CustomMaterial.prototype.constructor = CustomMaterial;
// CustomMaterial.prototype.isMeshStandardMaterial = true;


var CustomMaterial = function (options = {}) {

	MeshBasicMaterial.call( this );
	this.type = 'CustomMaterial';

	var uniforms = Object.assign( {},
		ShaderLib['basic']['uniforms'],
		options.uniforms || {})

	options = Object.assign({
		vertexShader: ShaderLib['basic']['vertexShader'],
		fragmentShader: ShaderLib['basic']['fragmentShader'],
	},  options, {uniforms} )

	Object.assign(this, options)

	this.onBeforeCompile = ( shader ) => {
		this.uniforms = uniforms
		shader.vertexShader = options.vertexShader
		shader.fragmentShader = options.fragmentShader
	}

}

CustomMaterial.prototype = Object.create( MeshBasicMaterial.prototype );
CustomMaterial.prototype.constructor = CustomMaterial;
CustomMaterial.prototype.isMeshBasicMaterial = true;


export default CustomMaterial