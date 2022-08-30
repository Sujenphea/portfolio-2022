uniform sampler2D uTexture;
uniform float uOpacity;
uniform float uDistance;

varying vec2 vUv;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);

    // distance between camera, project = opacity of project
    float distanceFromProject = clamp(pow(1.2 - abs(uDistance), 2.0), 0.0, 1.0);

    gl_FragColor = vec4(textureColor.xyz, uOpacity * distanceFromProject);
}