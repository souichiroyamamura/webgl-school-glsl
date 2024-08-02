
attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;
uniform mat4 mvpMatrix;
uniform mat4 normalMatrix; // 法線変換行列
varying vec3 vPosition;
varying vec3 vNormal;
varying vec4 vColor;



void main() {
  // フラグメントシェーダーに値を渡すための変数
  vPosition = position;
  vColor = color;

  // 法線をまず行列で変換
  vNormal = (normalMatrix * vec4(normal, 0.0)).xyz;

  // MVP 行列と頂点座標を乗算してから出力する
  gl_Position = mvpMatrix * vec4(position, 1.0);
}

