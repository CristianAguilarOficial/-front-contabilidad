import '../styles/InputIventario.css';

function FormatMonth(fecha) {
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const date = new Date(fecha);
  return `${meses[date.getMonth()]} ${date.getFullYear()}`;
}
export default FormatMonth;
