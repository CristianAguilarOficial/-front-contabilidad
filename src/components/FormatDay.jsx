import FormatMonth from './FormatMonth';
// Función para formatear la fecha a "20 de Marzo 2024"
function FormatDay(fecha) {
  const date = new Date(fecha);
  return `${date.getDate()} de ${FormatMonth(fecha)}`;
}
export default FormatDay;
