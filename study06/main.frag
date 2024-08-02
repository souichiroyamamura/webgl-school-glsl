precision mediump float;



varying vec3 vPosition;
varying vec3 vNormal;
varying vec4 vColor;

// ライトベクトルはひとまず定数で定義する
const vec3 light = vec3(4.0, 1.5, 1.0);

void main() {
  // 変換した法線とライトベクトルで内積を取る
  float d = dot(normalize(vNormal), normalize(light));
  // 値: 0~1
  d = d * 0.5 + 0.5;
  // 頂点ごとの効果を強調
  d = d * d - 0.1;

  // 内積の結果を頂点カラーの RGB 成分に乗算する
  vec4 setColor = vec4(vColor.rgb * d, vColor.a);
  gl_FragColor = setColor;
}

