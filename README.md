# THREE.js webcam and custom material boiler plate


## Parcel
This site uses the [Parcel](https://parceljs.org/) for development environment and it assumes that you have Parcel installed globally on your machine, [instructions here](https://parceljs.org/getting_started.html).


## Getting Started
1. Fork this repo and clone it to your machine
1. from your terminal, navigate to the project and run `npm install`
1. to run the project use the 'dev' script found the package.json `npm run dev`.

## Book of Shaders
this is an excellent reference for beginners:
[thebookofshaders.com](https://thebookofshaders.com/)

## Making a Custom Shader
This demo extends the THREE.MeshBasicMaterial to use custom vertex and fragment shaders. You can find the original shaders [here](https://github.com/mrdoob/three.js/tree/dev/src/renderers/shaders/ShaderLib). THREE compiles shaders at runtime and replaces the 'chunks' of shader code in [these](https://github.com/mrdoob/three.js/tree/dev/src/renderers/shaders/ShaderChunk), this makes it easier to maintain and reuse shader code.

so for example if you wanted to customize `#include <begin_vertex>` chunk you could copy the [begin_vertex chunk](https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderChunk/begin_vertex.glsl.js) and modify it in your shader file. Keep in mind that other parts of the shader will rely on the chunk you're working on.

```
#include <begin_vertex>
```
becomes
```
vec3 transformed = vec3( position );
```
