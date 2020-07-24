// https://github.com/atlassian/react-beautiful-dnd/issues/538#issuecomment-662393178
export function lockYAxisStyle(style, snapshot) {
  if (style.transform) {
    const axisLockY =
      "translate(0px" +
      style.transform.slice(
        style.transform.indexOf(","),
        style.transform.length
      );
    return {
      ...style,
      transform: axisLockY
    };
  }
  return style;
}
