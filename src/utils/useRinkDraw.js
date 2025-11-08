const useRinkDraw = () => {
  // Rink dimensions (in feet): 200x85, scale to canvas
  const rinkLength = 200;
  const rinkWidth = 85;

  function lengthToWidthRatio() {
    return rinkLength / rinkWidth;
  }

  function drawCircle(ctx, x, y, radius, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  function drawFilledCircle(ctx, x, y, radius, color) {
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

  function drawLine(ctx, sX, sY, fX, fY, strokeStyle) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(sX, sY);
    ctx.lineTo(fX, fY);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  function drawCreaseLeft(ctx, rx, ry) {
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

  function drawCreaseRight(ctx, rx, ry) {
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

  function drawText(ctx, text, x, y) {
    ctx.save();
    ctx.font = "15px Arial";
    // ctx.fillStyle = "#9109df";
    ctx.fillStyle = "#cccccc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawGoal(value, index, ctx, rx, ry) {
    const centerX = 200 / 2;
    const centerY = 85 / 2;
    const x = centerX + value.xCoord;
    const y = centerY - value.yCoord;
    // drawCircle(ctx, rx(x), ry(y), rx(1), "#9109df");
    drawFilledCircle(ctx, rx(x), ry(y), rx(2), "#9109df");
    drawText(ctx, index.toString(), rx(x), ry(y));
  }

  const drawRink = (canvas, goals) => {
    const ctx = canvas.getContext("2d");
    const scaleX = canvas.width / rinkLength;
    const scaleY = canvas.height / rinkWidth;

    // Helper to convert rink feet to canvas px
    function rx(x) {
      return x * scaleX;
    }
    function ry(y) {
      return y * scaleY;
    }

    // Draw corner radius for testing -- this was super useful
    // drawCircle(ctx, rx(28),ry(28),rx(28), "#46df09");

    // center line
    drawLine(ctx, rx(100), 0, rx(100), ry(85), "#df0909");
    // goal lines - 11ft
    drawLine(ctx, rx(11), 0, rx(11), ry(85), "#df0909");
    drawLine(ctx, rx(200 - 11), 0, rx(200 - 11), ry(85), "#df0909");
    // blue lines - 75ft
    drawLine(ctx, rx(75), 0, rx(75), ry(85), "#1e5bc6");
    drawLine(ctx, rx(200 - 75), 0, rx(200 - 75), ry(85), "#1e5bc6");
    // center dot and circle
    drawFilledCircle(ctx, rx(100), ry(85 / 2), rx(0.5), "#1e5bc6");
    drawCircle(ctx, rx(100), ry(85 / 2), rx(15), "#1e5bc6");
    // faceoff spots
    drawFilledCircle(ctx, rx(31), ry(85 / 2 - 22), rx(0.5), "#df0909");
    drawCircle(ctx, rx(31), ry(85 / 2 - 22), rx(15), "#df0909");
    drawFilledCircle(ctx, rx(200 - 31), ry(85 / 2 - 22), rx(0.5), "#df0909");
    drawCircle(ctx, rx(200 - 31), ry(85 / 2 - 22), rx(15), "#df0909");
    drawFilledCircle(ctx, rx(80), ry(85 / 2 - 22), rx(0.5), "#df0909");
    drawFilledCircle(ctx, rx(200 - 80), ry(85 / 2 - 22), rx(0.5), "#df0909");
    drawFilledCircle(ctx, rx(31), ry(85 / 2 + 22), rx(0.5), "#df0909");
    drawCircle(ctx, rx(31), ry(85 / 2 + 22), rx(15), "#df0909");
    drawFilledCircle(ctx, rx(200 - 31), ry(85 / 2 + 22), rx(0.5), "#df0909");
    drawCircle(ctx, rx(200 - 31), ry(85 / 2 + 22), rx(15), "#df0909");
    drawFilledCircle(ctx, rx(80), ry(85 / 2 + 22), rx(0.5), "#df0909");
    drawFilledCircle(ctx, rx(200 - 80), ry(85 / 2 + 22), rx(0.5), "#df0909");
    // trapazoid
    drawLine(ctx, 0, ry(85 / 2 - 14), rx(11), ry(85 / 2 - 11), "#df0909");
    drawLine(ctx, 0, ry(85 / 2 + 14), rx(11), ry(85 / 2 + 11), "#df0909");
    drawLine(ctx, rx(200), ry(85 / 2 - 14), rx(200 - 11), ry(85 / 2 - 11), "#df0909");
    drawLine(ctx, rx(200), ry(85 / 2 + 14), rx(200 - 11), ry(85 / 2 + 11), "#df0909");
    // crease
    // drawLine(rx(11),ry(85/2 - 4),rx(11 + 4.5),ry(85/2 - 4), "#df0909");
    // drawLine(rx(11),ry(85/2 + 4),rx(11 + 4.5),ry(85/2 + 4), "#df0909");
    // drawCircle(rx(11),ry(85/2),rx(6), "#df0909");
    drawCreaseLeft(ctx, rx, ry);
    drawCreaseRight(ctx, rx, ry);

    goals.forEach((goal, index) => {
      drawGoal(goal, index + 1, ctx, rx, ry);
    });
  };

  return [drawRink, lengthToWidthRatio];
};

export default useRinkDraw;
