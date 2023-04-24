function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useMemo } from 'react';
import { createMatrix } from './createMatrix';
import Svg, { Path, G, Rect, Circle } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';
import getCorners from './getCornets';
export function QrCodeSvg(_ref) {
  var _originalMatrix$;
  let {
    value,
    frameSize,
    contentCells = 6,
    errorCorrectionLevel = 'M',
    backgroundColor = '#ffffff',
    dotColor = '#000000',
    style,
    contentBackgroundRectProps,
    content,
    contentStyle,
    figureCircleProps,
    figurePathProps
  } = _ref;
  const originalMatrix = useMemo(() => createMatrix(value, errorCorrectionLevel), [errorCorrectionLevel, value]);
  const matrixCellSize = round(frameSize / originalMatrix.length * 100) / 100; // Ex. 3.141592653589793 -> 3.14
  const matrixRowLength = ((_originalMatrix$ = originalMatrix[0]) === null || _originalMatrix$ === void 0 ? void 0 : _originalMatrix$.length) ?? 0;
  const roundedContentCells = (matrixRowLength - contentCells) % 2 === 0 ? contentCells : contentCells + 1;
  const contentSize = matrixCellSize * roundedContentCells;
  const contentStartIndex = (matrixRowLength - roundedContentCells) / 2;
  const contentEndIndex = contentStartIndex + roundedContentCells - 1;
  const contentXY = contentStartIndex * matrixCellSize;
  const matrix = useMemo(() => content !== undefined ? originalMatrix.map((row, i) => row.map((el, j) => i >= contentStartIndex && i <= contentEndIndex && j >= contentStartIndex && j <= contentEndIndex ? 0 : el)) : originalMatrix, [content, contentEndIndex, contentStartIndex, originalMatrix]);
  const renderFigure = useCallback((x, y, neighbors) => {
    const {
      q1,
      q2,
      q3,
      q4
    } = getCorners(x, y, matrixCellSize);
    if (!(neighbors.top || neighbors.right || neighbors.bottom || neighbors.left)) {
      return /*#__PURE__*/React.createElement(Circle, _extends({
        cx: x + matrixCellSize / 2,
        cy: y + matrixCellSize / 2,
        r: matrixCellSize / 2,
        fill: dotColor
      }, figureCircleProps));
    }
    // q4  0  d1  0  q1
    // 0   0  0   0  0
    // d4  0  0   0  d2
    // 0   0  0   0  0
    // q3  0  d3  0  q2
    const d1 = {
      x: x + matrixCellSize / 2,
      y: y
    };
    const d2 = {
      x: x + matrixCellSize,
      y: y + matrixCellSize / 2
    };
    const d1d2 = neighbors.top || neighbors.right ? `L${q1.x} ${q1.y} L${d2.x} ${d2.y}` : `Q${q1.x} ${q1.y} ${d2.x} ${d2.y}`;
    const d3 = {
      x: x + matrixCellSize / 2,
      y: y + matrixCellSize
    };
    const d2d3 = neighbors.right || neighbors.bottom ? `L${q2.x} ${q2.y} L${d3.x} ${d3.y}` : `Q${q2.x} ${q2.y} ${d3.x} ${d3.y}`;
    const d4 = {
      x: x,
      y: y + matrixCellSize / 2
    };
    const d3d4 = neighbors.bottom || neighbors.left ? `L${q3.x} ${q3.y} L${d4.x} ${d4.y}` : `Q${q3.x} ${q3.y} ${d4.x} ${d4.y}`;
    const d4d1 = neighbors.left || neighbors.top ? `L${q4.x} ${q4.y} L${d1.x} ${d1.y}` : `Q${q4.x} ${q4.y} ${d1.x} ${d1.y}`;
    const d = `M${d1.x} ${d1.y} ${d1d2} ${d2d3} ${d3d4} ${d4d1}`;
    return /*#__PURE__*/React.createElement(Path, _extends({
      d: d,
      fill: dotColor
    }, figurePathProps));
  }, [dotColor, figureCircleProps, figurePathProps, matrixCellSize]);
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      backgroundColor
    }, style]
  }, /*#__PURE__*/React.createElement(Svg, {
    width: frameSize,
    height: frameSize
  }, /*#__PURE__*/React.createElement(G, null, matrix.map((row, i) => row.map((_, j) => {
    var _matrix, _matrix2;
    if (!(row !== null && row !== void 0 && row[j])) {
      return null;
    }
    const neighbors = {
      top: Boolean((_matrix = matrix[i - 1]) === null || _matrix === void 0 ? void 0 : _matrix[j]),
      bottom: Boolean((_matrix2 = matrix[i + 1]) === null || _matrix2 === void 0 ? void 0 : _matrix2[j]),
      left: Boolean(row[j - 1]),
      right: Boolean(row[j + 1])
    };
    const x = j * matrixCellSize;
    const y = i * matrixCellSize;
    const key = `${i}${j}`;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: key
    }, renderFigure(x, y, neighbors));
  }))), content && /*#__PURE__*/React.createElement(Rect, _extends({
    fill: backgroundColor,
    x: contentXY,
    y: contentXY
  }, contentBackgroundRectProps, {
    width: contentSize,
    height: contentSize
  }))), content && /*#__PURE__*/React.createElement(View, {
    style: [{
      width: contentSize,
      height: contentSize,
      top: contentXY,
      left: contentXY
    }, styles.content, contentStyle]
  }, content));
}
const round = number => Math.round(number * 100) / 100;
const styles = StyleSheet.create({
  content: {
    position: 'absolute'
  }
});
//# sourceMappingURL=index.js.map