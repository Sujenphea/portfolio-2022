uniform sampler2D uTexture;
uniform float uOpacity;

varying vec2 vUv;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);

    gl_FragColor = vec4(textureColor.xyz, uOpacity);
}