const MixShader = {
  uniforms: {
    texture: { type: "t", value: undefined },
    texture2: { type: "t", value: undefined },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    #ifdef GL_ES
    precision highp float;
    #endif
    varying vec2 vUv;
    uniform sampler2D texture;
    uniform sampler2D texture2;

    void main(void) {
        vec3 c;
        vec4 Ca = texture2D(texture, vUv);
        vec4 Cb = texture2D(texture2, vUv);
        c = Ca.rgb * Ca.a * 0.8 + Cb.rgb * Cb.a * 2.0;
        gl_FragColor= vec4(c, 1.0);
    }
  `
}

export { MixShader }
