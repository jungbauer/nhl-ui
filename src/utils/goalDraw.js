import { drawFilledCircle, drawText } from "@/utils/drawFns.js";

function goalDraw() {
  // Rink dimensions (in feet): 200x85
  const rinkLength = 200;
  const rinkWidth = 85;
  const centerX = 200 / 2;
  const centerY = 85 / 2;
  const angle90Radians = (90 * Math.PI) / 180;

  function drawGoalCircle(value, index, ctx, rx, ry, color) {
    const x = centerX + value.details.xCoord;
    const y = centerY - value.details.yCoord;
    // drawCircle(ctx, rx(x), ry(y), rx(1), "#9109df");
    drawFilledCircle(ctx, rx(x), ry(y), rx(2), color);
  }

  function drawGoalsText(goals, ctx, portraitDraw) {
    const landscapeScaleX = ctx.canvas.width / rinkLength;
    const landscapeScaleY = ctx.canvas.height / rinkWidth;
    let scaleX = landscapeScaleX;
    let scaleY = landscapeScaleY;

    // Helper to convert rink feet to canvas px
    function rx(x) {
      return x * scaleX;
    }
    function ry(y) {
      return y * scaleY;
    }

    for (const [index, goal] of goals.entries()) {
      scaleX = landscapeScaleX;
      scaleY = landscapeScaleY;
      const x = centerX + goal.details.xCoord;
      const y = centerY - goal.details.yCoord;

      if (portraitDraw) {
        ctx.save(); // Save the current state
        scaleX = ctx.canvas.width / rinkWidth;
        scaleY = ctx.canvas.height / rinkLength;

        ctx.rotate(-angle90Radians);
        // combo of translating to [0,0] and back to needed location
        ctx.translate(-rx(x) - ry(y), -ry(y) + rx(x));
      }

      drawText(ctx, (index + 1).toString(), rx(x), ry(y));

      if (portraitDraw) {
        ctx.restore(); // Restore to the state before rotation
      }
    }
  }

  const drawGoals = (goalCanvas, goals, portraitDraw, color) => {
    const ctx = goalCanvas.getContext("2d");
    let scaleX = goalCanvas.width / rinkLength;
    let scaleY = goalCanvas.height / rinkWidth;

    if (portraitDraw) {
      // need to translate and rotate canvas context
      // Translate to the desired rotation point
      ctx.translate(goalCanvas.width, 0);
      // Rotate clockwise by 90 degrees
      ctx.rotate(angle90Radians);
      // adjust scaling
      scaleX = goalCanvas.width / rinkWidth;
      scaleY = goalCanvas.height / rinkLength;
    }

    // Helper to convert rink feet to canvas px
    function rx(x) {
      return x * scaleX;
    }
    function ry(y) {
      return y * scaleY;
    }

    for (const [index, goal] of goals.entries()) {
      drawGoalCircle(goal, index + 1, ctx, rx, ry, color);
    }

    drawGoalsText(goals, ctx, portraitDraw);
  };

  return [drawGoals];
}

export default goalDraw;
