import QRCode from 'qrcode';
export function createMatrix(value, errorCorrectionLevel) {
  const arr = QRCode.create(value, {
    errorCorrectionLevel: errorCorrectionLevel
  }).modules.data;
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce((rows, key, i) => {
    return (
      // TODO Fix typescript error
      //  @ts-ignore
      (i % sqrt === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows
    );
  }, []);
}
//# sourceMappingURL=createMatrix.js.map