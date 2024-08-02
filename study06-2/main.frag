precision mediump float;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec4 vColor;

// ライトベクトル
const vec3 light = vec3(2.0, 2.5, 1.0);
// 反射光用視点座標
const vec3 viewPosition = vec3(2.0, 1.0, 5.0);

void main() {
  // 光源 - 頂点座標の距離
  float lightDist = length(light - vPosition);
  // 光源 - 方向
  vec3 lightDir = normalize(light - vPosition);

  // 内積 - 計算
  float diff = max(dot(normalize(vNormal), lightDir), 0.2);
  // 内積 - べき乗計算し、頂点ごとの差を大きくする
  diff = pow(diff, 2.0);

  // 減衰
  float attenuation = 1.0 / (1.0 + 0.01 * lightDist + 0.01 * (lightDist * lightDist));

  // 反射光 - 設定
  vec3 viewDir = normalize(viewPosition - vPosition);
  vec3 halfwayDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(normalize(vNormal), halfwayDir), 0.0), 32.0);
  vec3 specular = vec3(0.8) * spec;

  // 計算結果
  vec3 result = (0.1 + diff + specular) * vColor.rgb * attenuation;
  result = pow(result, vec3(0.9));

  vec4 setColor = vec4(result, vColor.a);
  gl_FragColor = setColor;
}