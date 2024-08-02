
attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;
uniform mat4 mvpMatrix;
uniform mat4 normalMatrix; // 法線変換行列
varying vec3 vPosition;
varying vec3 vNormal;
varying vec4 vColor;



void main() {
  vColor = color;
  
  // vPosition = position;
  // →MVP 行列などでジオメトリが回転した場合に、描画される頂点は回転運動しているのに、フラグメントシェーダに送られる頂点の座標情報は一切変換が掛かっていない状態になってしまう
  
  // モデル座標変換を掛けた状態の頂点座標を作る
  vPosition =  (mvpMatrix * vec4(position, 0.0)).xyz;

  // 法線をまず行列で変換
  vNormal = (normalMatrix * vec4(normal, 0.0)).xyz;

  // MVP 行列と頂点座標を乗算してから出力する
  gl_Position = mvpMatrix * vec4(position, 1.0);
}

