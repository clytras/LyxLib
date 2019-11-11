export const pointInRect = ({x, y}, {x1, y1, x2, y2}) => x >= x1 && x <= x2 && y >= y1 && y <= y2;
export const pointInPoly = ({x, y}, points) => {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  var inside = false;
  for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
    var xi = points[i][0], yi = points[i][1];
    var xj = points[j][0], yj = points[j][1];

    var intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

export const polyRect = points => {
  const initX = points[0][0], initY = points[0][1];
  let x1 = initX, y1 = initY, x2 = initX, y2 = initY;

  for(let i = 0; i < points.length; i++) {
    let px = points[i][0], py = points[i][1];
    if(px < x1) x1 = px; else if(px > x2) x2 = px;
    if(py < y1) y1 = py; else if(py > y2) y2 = py;
  }

  return { x1, y1, x2, y2 }
}

export const rectToPoly = ({x1, y1, x2, y2}) => [[x1, y1], [x1, y2], [x2, y2], [x2, y1]];
export const resetPolyXY = points => {
  let prc = polyRect(points);
  return points.map(v => [v[0] - prc.x1, v[1] - prc.y1]);
}
