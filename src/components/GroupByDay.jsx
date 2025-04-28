import FormatDay from './FormatDay';
import FormatMonth from './FormatMonth';

function GroupByDay(data) {
  const groupedData = {};

  data.forEach((item) => {
    const mes = FormatMonth(item.fecha);
    const dia = FormatDay(item.fecha);

    if (!groupedData[mes]) {
      groupedData[mes] = {};
    }
    if (!groupedData[mes][dia]) {
      groupedData[mes][dia] = { items: [], total: 0 };
    }

    groupedData[mes][dia].items.push(item);
    groupedData[mes][dia].total += item.valor;
  });

  return groupedData;
}
export default GroupByDay;
