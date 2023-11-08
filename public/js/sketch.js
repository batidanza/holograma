let sound;
let player;
let player2;
let player3;
let reproduciendo = false;
let reproduciendo2 = false;
let reproduciendo3 = false;
let diametro;
let diametro1;
let diametro2;
let velocidadCrecimiento = 200;
let animando = false;
let agrandando = true;
let img;
let img1;
let img2;
let img1Y;
let img2Y;
let imgY;

function preload() {
  // Carga tus archivos de audio e imágenes en la función preload
  soundFormats('wav'); // Establece el formato de audio
  player = loadSound('/audio/ojo.wav');
  player2 = loadSound('/audio/soho.wav');
  player3 = loadSound('/audio/beat.wav');
  img = loadImage('/img/suzi.jpg');
  img1 = loadImage('/img/valentino.jpg');
  img2 = loadImage('/img/maximo.jpg');
}

function setup() {
  createCanvas(600, 600);
  sound = new p5.SoundFile(); // Crea un objeto p5.SoundFile para usar con p5.sound.js
  setupVisuals();
}

function draw() {
  background(22, 33, 89);
  stroke(255);

  if (reproduciendo) {
    text("Presiona la tecla 'b' para detener/reiniciar player1", 10, 10, 20);
  } else {
    text("Presiona la tecla 'b' para reproducir player1", 10, 10, 20);
  }
  if (reproduciendo2) {
    text("Presiona la tecla 'k' para detener/reiniciar player2", 10, 30, 20);
  } else {
    text("Presiona la tecla 'k' para reproducir player2", 10, 30, 20);
  }
  if (reproduciendo3) {
    text("Presiona la tecla 'd' para detener/reiniciar player3", 10, 50, 20);
  } else {
    text("Presiona la tecla 'd' para reproducir player3", 10, 50, 20);
  }

  text("Presiona la tecla 'l' para controlar los tres en loop", 10, 70, 20);
  drawVisuals();
}

function setupVisuals() {
  // Configura tus elementos visuales y tamaños de imágenes aquí
  diametro = 200;
  diametro1 = 200;
  diametro2 = 200;
  img2Y = height / 2;
  img1Y = height / 2;
  imgY = height / 2;
}

function drawVisuals() {
  // Tu función drawVisuals con los elementos visuales
  // Puedes seguir utilizando este código para tus elementos visuales
  background(237, 88, 636);
  stroke(255);

  if (reproduciendo3) {
    animando = true;
  }

  if (reproduciendo3) {
    if (agrandando) {
      diametro += velocidadCrecimiento;
      diametro1 += velocidadCrecimiento;
      diametro2 += velocidadCrecimiento;
    } else {
      diametro -= velocidadCrecimiento;
      diametro1 -= velocidadCrecimiento;
      diametro2 -= velocidadCrecimiento;
    }

    if (diametro >= 400) {
      agrandando = false;
    } else if (diametro <= 100) {
      agrandando = true;
    }
  }

  if (reproduciendo3) {
    for (let i = 0; i < 100; i++) {
      stroke(255, 255, 0);
      let x1 = random(width);
      let y1 = random(height);
      let x2 = random(width);
      let y2 = random(height);
      line(x1, y1, x2, y2);
    }
  }

  fill(22, 500, 89);
  stroke(0);
  strokeWeight(2);

  if (reproduciendo3) ellipse(width / 4, imgY, diametro, diametro);
  image(img, width / 4 - img.width / 2, imgY - img.height / 2, img.width, img.height);

  if (reproduciendo3) ellipse(2 * width / 4, img1Y, diametro1, diametro1);
  if (reproduciendo) image(img1, 2 * width / 4 - img1.width / 2, img1Y - img1.height / 2, img1.width, img1.height);

  if (reproduciendo3) ellipse(3 * width / 4, img2Y, diametro2, diametro2);
  if (reproduciendo2) image(img2, 3 * width / 4 - img2.width / 2, img2Y - img2.height / 2, img2.width, img2.height);
}

function keyPressed() {
  // Maneja las teclas para controlar la reproducción de los sonidos aquí
  if (key === 'b') {
    if (reproduciendo) {
      player.stop();
      player.play();
    } else {
      player.play();
    }
    reproduciendo = !reproduciendo;
  }
  if (key === 'k') {
    if (reproduciendo2) {
      player2.stop();
      player2.play();
    } else {
      player2.play();
    }
    reproduciendo2 = !reproduciendo2;
  }
  if (key === 'd') {
    if (reproduciendo3) {
      player3.stop();
      player3.play();
    } else {
      player3.play();
    }
    reproduciendo3 = !reproduciendo3;
  }
  if (key === 'l') {
    if (reproduciendo || reproduciendo2 || reproduciendo3) {
      player.stop();
      player2.stop();
      player3.stop();
      reproduciendo = false;
      reproduciendo2 = false;
      reproduciendo3 = false;
    } else {
      player.loop();
      player2.loop();
      player3.loop();
      reproduciendo = true;
      reproduciendo2 = true;
      reproduciendo3 = true;
    }
  }
}
