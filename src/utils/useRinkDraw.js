function useRinkDraw() {
  // Rink dimensions (in feet): 200x85, scale to canvas
  const rinkLength = 200;
  const rinkWidth = 85;
  const centerX = 200 / 2;
  const centerY = 85 / 2;
  const angle90Radians = (90 * Math.PI) / 180;

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

  function drawText(ctx, text, x, y, color = "#cccccc") {
    ctx.font = "15px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }

  function drawMarkerCircle(ctx, rx, ry, item, options = {}) {
    const { color = "#9109df", radius = 2 } = options;
    const x = centerX + item.details.xCoord;
    const y = centerY - item.details.yCoord;
    drawFilledCircle(ctx, rx(x), ry(y), rx(radius), color);
  }

  function drawMarkersText(items, ctx, portraitDraw, rinkContext, options = {}) {
    const { textColor = "#cccccc" } = options;
    const { scaleX: landscapeScaleX, scaleY: landscapeScaleY } = rinkContext;
    let scaleX = landscapeScaleX;
    let scaleY = landscapeScaleY;

    // Helper to convert rink feet to canvas px
    function rx(x) {
      return x * scaleX;
    }
    function ry(y) {
      return y * scaleY;
    }

    for (const [index, item] of items.entries()) {
      scaleX = landscapeScaleX;
      scaleY = landscapeScaleY;
      const x = centerX + item.details.xCoord;
      const y = centerY - item.details.yCoord;

      if (portraitDraw) {
        ctx.save();
        scaleX = ctx.canvas.width / rinkWidth;
        scaleY = ctx.canvas.height / rinkLength;

        ctx.rotate(-angle90Radians);
        ctx.translate(-rx(x) - ry(y), -ry(y) + rx(x));
      }

      drawText(ctx, (index + 1).toString(), rx(x), ry(y), textColor);

      if (portraitDraw) {
        ctx.restore();
      }
    }
  }

  const drawRinkBackground = (canvas, portraitDraw = false) => {
    const ctx = canvas.getContext("2d");
    let scaleX = canvas.width / rinkLength;
    let scaleY = canvas.height / rinkWidth;

    if (portraitDraw) {
      ctx.translate(canvas.width, 0);
      ctx.rotate(angle90Radians);
      scaleX = canvas.width / rinkWidth;
      scaleY = canvas.height / rinkLength;
    }

    function rx(x) {
      return x * scaleX;
    }
    function ry(y) {
      return y * scaleY;
    }

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
    drawCreaseLeft(ctx, rx, ry);
    drawCreaseRight(ctx, rx, ry);

    return { rx, ry, scaleX, scaleY, portraitDraw };
  };

  const drawMarkers = (canvas, items, portraitDraw, rinkContext, resize, options = {}) => {
    const ctx = canvas.getContext("2d");
    const { rx, ry } = rinkContext;
    const { color = "#9109df", radius = 2, showNumbers = true } = options;

    // Clear the canvas
    // using SetTransform because translations and rotations change how clearRect behaves.
    // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing#:~:text=Dealing%20with%20transformed%20coordinates,visible%20portion%20of%20the%20canvas.&text=//%20Store%20the%20current%20transformation,this%20performance%20difference%20be%20irrelevant.
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (portraitDraw && resize) {
      // using resize to stop the canvas being rotated when changing between goals and events.
      ctx.translate(canvas.width, 0);
      ctx.rotate(angle90Radians);
    }

    // Draw markers
    for (const item of items) {
      drawMarkerCircle(ctx, rx, ry, item, { color, radius });
    }

    // Draw numbers if enabled
    if (showNumbers && items.length > 0) {
      drawMarkersText(items, ctx, portraitDraw, rinkContext, { textColor: options.textColor });
    }
  };

  return { drawRinkBackground, drawMarkers, lengthToWidthRatio };
}

export default useRinkDraw;
