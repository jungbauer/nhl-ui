export function drawLine(ctx, sX, sY, fX, fY, strokeStyle) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(sX, sY);
  ctx.lineTo(fX, fY);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

export function drawFilledCircle(ctx, x, y, radius, color) {
  ctx.save();
  // Draw a circle at (200, 200) with radius 80
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

export function drawCircle(ctx, x, y, radius, color) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

export function drawCreaseLeft(ctx, rx, ry) {
  const centerY = 85 / 2;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(rx(11), ry(centerY - 4));
  ctx.lineTo(rx(11 + 4.5), ry(centerY - 4));
  ctx.arc(rx(11), ry(centerY), ry(6), -0.7, 0.7);
  ctx.lineTo(rx(11), ry(centerY + 4));
  ctx.closePath();
  ctx.fillStyle = "#43ace4";
  ctx.fill();
  ctx.strokeStyle = "#df0909";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

export function drawCreaseRight(ctx, rx, ry) {
  const centerY = 85 / 2;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(rx(200 - 11), ry(centerY - 4));
  ctx.lineTo(rx(200 - 11 - 4.5), ry(centerY - 4));
  ctx.arc(rx(200 - 11), ry(centerY), ry(6), -2.5, 2.45, true);
  ctx.lineTo(rx(200 - 11), ry(centerY + 4));
  ctx.closePath();
  ctx.fillStyle = "#43ace4";
  ctx.fill();
  ctx.strokeStyle = "#df0909";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

export function drawText(ctx, text, x, y) {
  ctx.font = "15px Arial";
  // ctx.fillStyle = "#9109df";
  ctx.fillStyle = "#cccccc";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}
