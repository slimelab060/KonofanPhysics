//Matter.js モジュール 初期設定
const Engine = Matter.Engine, //    物理シュミレーションおよびレンダリングを管理するコントローラーとなるメソッド
  Render = Matter.Render, //    描画処理
  Runner = Matter.Runner, //    継続的な処理を更新するユーティリティ
  Events = Matter.Events, //    イベントの起動
  World = Matter.World, //    物理演算領域の作成・操作するメソッドを含む
  Mouse = Matter.Mouse, //    マウス操作
  Body = Matter.Body, //    剛体のモデルを作成・操作するメソッドを含む
  Bodies = Matter.Bodies, //    一般的な剛体モデルを作成するメソッドを含む
  Constraint = Matter.Constraint, //    制約を作成・操作するメソッドを含む
  Composite = Matter.Composite, //    Body、Constraintその他の集合の追加等
  Composites = Matter.Composites, //    Composite(複合ボディ)を作る為の関数群
  Common = Matter.Common, //    汎用関数
  Query = Matter.Query, //    衝突クエリを実行
  Vertices = Matter.Vertices, //    頂点のセットを作成・操作するメソッドを含む
  MouseConstraint = Matter.MouseConstraint; //    マウスの制約を作成するためのメソッドを含む

var mev_hover_id = -1; //    マウスカーソルがホバーしているアイテムの管理
var mev_link_scroll_wait = 0; //    スムーススクロール時の待ち時間
var mev_canvas_in = false; //    canvas内にカーソルがあるか
var collisions = [];
var startPoint = { x: 0, y: 0 };
var boundsScale = { x: 1, y: 1 }; //  画面の拡大率
//  基準画面サイズ
var render_width = 1280;
var render_height = 720;
//  縦横比率
var aspect_ratio = render_height / render_width;
//  ページ内のセットしたい要素を指定
var container = document.getElementById("js__canvas-container");
//    キャンバスの指定
var canvas = document.getElementById("js__canvas");

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: container,
  canvas: canvas,
  engine: engine,
  options: {
    width: render_width, // 画面サイズではなくmatter空間のサイズ
    height: render_height, //このサイズに合わせて物体を配置します
    wireframes: false, //    true : 画像は消える。当たり判定の描画
    background: "rgba(0,0,0,0)", //    背景を透明に
  },
});

// create two boxes and a ground
// Matter.Bodies.rectangle(x, y, width, height, [options])
//const boxA = Bodies.rectangle(400, 300, 180, 80);
//const boxC = Bodies.rectangle(500, 300, 160, 80);
const boxB = Bodies.rectangle(600, 300, 98*0.8, 486*0.8,{
  
    render: {
      strokeStyle: "#ffffff",
      sprite: {
        texture: "./img/nc51620.png",
        xScale:  0.8,
        yScale:  0.8,
      },
    },
});
//const boxD = Bodies.rectangle(200, 90, 160, 100);
//const boxE = Bodies.rectangle(450, 90, 160, 100);
//const boxF = Bodies.rectangle(200, 90, 160, 100);
//const boxG = Bodies.rectangle(200, 90, 160, 100);
//const boxH = Bodies.rectangle(500, 90, 100, 100);
const groundL = Bodies.rectangle(-60, 500, 60, 400, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 1)" },
});
const groundL2 = Bodies.rectangle(1350, 400, 60, 520, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 1)" },
});
const groundR = Bodies.rectangle(640, 210, 70, 40, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },
});
const groundT = Bodies.rectangle(640, -30, 1280, 20, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },
});
const ground = Bodies.rectangle(640, 755, 1280, 70, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },
});

const Round = Bodies.polygon(55, 460, 1, 30,{isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },});
const Round2 = Bodies.polygon(135, 460, 1, 30,{isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },});
const Round3 = Bodies.polygon(210, 460, 1, 30,{isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },});

const Round4 = Bodies.rectangle(274, 561, 420, 100, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },
});
const Round10 = Bodies.rectangle(895, 20, 720, 75, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },
});
const Round11 = Bodies.rectangle(976, 575, 322, 110, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },
});
const Round12 = Bodies.rectangle(635, 678, 1150, 52, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },
});

const Round13 = Bodies.rectangle(190, 40, 270, 60, {
  isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },
});


const Round5 = Bodies.polygon(1215, 120, 1, 40,{isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },});
const Round6 = Bodies.polygon(1215, 220, 1, 40,{isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },});
const Round7 = Bodies.polygon(1215, 320, 1, 40,{isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },});
const Round8 = Bodies.polygon(1215, 415, 1, 40,{isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },});
const Round9 = Bodies.polygon(1215, 510, 1, 40,{isStatic: true,
  render: { fillStyle: "rgba(0, 0, 0, 0)" },});

const box = Bodies.polygon(100, 100, 8, 28, {
  render: {
    strokeStyle: "#ffffff",
    sprite: { texture: "./img/q.png", xScale: 0.5, yScale: 0.5 },
  },
});

//const pit = Bodies.rectangle(400, 300, 5000, 50, { isStatic: true, label: 'pit' });

// add all of the bodies to the world
Composite.add(engine.world, [
  //pit,

  //box,
  //boxA,
    boxB,
  //boxC,
  //boxD,
  //boxE,
  //boxF,
  //boxG,
  //boxH,
  Round,
  Round2,
  Round3,
  Round4,
  Round5,
  Round6,
  Round7,
  Round8,
  Round9,
  Round10,
  Round11,
  Round12,
  Round13,
  //ground,
  groundT,
  groundL,
  groundL2,
  groundR,
]);

// run the renderer
Render.run(render);



// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

//  div枠のサイズを取得する
var cw = container.clientWidth;
//  matter空間サイズ以下なら基準描画幅と高さを設定し直す
if (cw < render_width) {
  render_width = cw;
  render_height = cw * aspect_ratio;
}

//----------------------------------------
// マウス作成
//----------------------------------------
var canvasMouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
  mouse: canvasMouse,
  constraint: {
    stiffness: 0.2, //  剛性
    render: {
      visible: false, //  マウスのドラッグ表示を隠す
    },
  },
});
//    マウスの追加
Composite.add(engine.world, mouseConstraint);
render.mouse = canvasMouse;

//========================================
//    Functions
//----------------------------------------

canvas.addEventListener("mouseover", mouseOver); // カーソルが範囲内に入った
canvas.addEventListener("mouseout", mouseOut); // カーソルが範囲外に出た
window.addEventListener("resize", resizeWindow); // キャンバスサイズが変わった

//  カーソルがキャンバス内にいる
function mouseOver() {
  mev_canvas_in = true;
}
//  カーソルがキャンバス外に出ている
function mouseOut() {
  mev_canvas_in = false;
}
//  カーソル変更
function change_cursor(i_name) {
  if (!mev_canvas_in) return; //    キャンバス外の場合処理無効
  if (0 < mev_link_scroll_wait) return; //    スクロール中は無効
  container.style.cursor = i_name;
}

function resizeWindow() {
  //    キャンバスのサイズを取得
  const cw = container.clientWidth;

  boundsScale.x = cw / render.options.width;
  boundsScale.y = boundsScale.x; 

  canvas.style.width = render.options.width * boundsScale.x; 
  canvas.style.height = render.options.height * boundsScale.y; 
}

//  カーソルがキャンバス内にいる
function mouseOver() {
  mev_canvas_in = true;
}
//  カーソルがキャンバス外に出ている
function mouseOut() {
  mev_canvas_in = false;
}
//  カーソル変更
function change_cursor(i_name) {
  if (!mev_canvas_in) return; //    キャンバス外の場合処理無効
  if (0 < mev_link_scroll_wait) return; //    スクロール中は無効
  container.style.cursor = i_name;
}


/*const ballComposite = Composite.create();
Composite.add(engine.world, ballComposite);

// クリックした位置に円を生成とballCompositeへの追加
Events.on(mouseConstraint, "mousedown", (e) => {
  // ドラッグ中は生成しない
  if (mouseConstraint.body) {
    return;
  }
  // 半径はランダム（10〜30）
  const min = 15;
  const max = 25;
  const radius = Math.random() * (max - min) + min;
  const ball2 = Bodies.polygon(
    e.mouse.position.x + radius,
    e.mouse.position.y + radius,
    8,
    radius,
    { label:'bodyA',
      render: {
        strokeStyle: "#ffffff",
        sprite: {
          texture: "./img/q.png",
          xScale: radius / 52,
          yScale: radius / 52,
        },
      },
    }
  );

  const ball = Bodies.circle(
    e.mouse.position.x,
    e.mouse.position.y,
    radius / 52,
    {
      restitution: 0.5,
    }
  );
  Composite.add(ballComposite, ball2);
});
*/