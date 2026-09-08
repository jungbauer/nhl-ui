import { drawCircle, drawCreaseLeft, drawCreaseRight, drawFilledCircle, drawLine } from "@/utils/drawFns.js";

function drawRink2() {
  // Rink dimensions (in feet): 200x85, scale to canvas
  const rinkLength = 200;
  const rinkWidth = 85;
  const angle90Radians = (90 * Math.PI) / 180;

  function lengthToWidthRatio() {
    return rinkLength / rinkWidth;
  }

  const drawRink = (canvas, portraitDraw = false) => {
    const ctx = canvas.getContext("2d");
    let scaleX = canvas.width / rinkLength;
    let scaleY = canvas.height / rinkWidth;

    if (portraitDraw) {
      // need to translate and rotate canvas context
      // Translate to the desired rotation point
      ctx.translate(canvas.width, 0);
      // Rotate clockwise by 90 degrees
      ctx.rotate(angle90Radians);
      // adjust scaling
      scaleX = canvas.width / rinkWidth;
      scaleY = canvas.height / rinkLength;
    }

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
  };

  return [drawRink, lengthToWidthRatio];
}

export default drawRink2;
