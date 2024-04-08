export function getInfoData(dataEspecifica?: Date) {
  const agora = dataEspecifica ? dataEspecifica : new Date();
  const anoAtual = agora.getFullYear();
  const mesAtual = agora.getMonth();
  const diaAtual = agora.getDate();
  const diaDaSemana = agora.getDay();
  const horaAtual = agora.getHours();

  const diasNoMesAtual = new Date(anoAtual, mesAtual + 1, 0).getDate();

  const diasNoMesAnterior = new Date(anoAtual, mesAtual, 0).getDate();

  const diasNoMesSeguinte = new Date(anoAtual, mesAtual + 2, 0).getDate();

  const primeiroDiaMes = new Date(anoAtual, mesAtual, 1).getDay();

  const meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDaysFull = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"];
  const nomeDiaDaSemana = weekDaysFull[diaDaSemana];
  const nomeMes = meses[mesAtual]

  return {
    day: diaAtual,
    dayFull: nomeDiaDaSemana,
    month: mesAtual + 1,
    monthFull: nomeMes,
    year: anoAtual,
    currentTime:horaAtual,
    weekDays,
    weekDaysFull,
    firstMonthDay: primeiroDiaMes,
    firstMonthDayFull: weekDays[primeiroDiaMes],
    qtyDaysThisMonth: diasNoMesAtual,
    qtyDaysPastMonth: diasNoMesAnterior,
    qtyDaysNextMonth: diasNoMesSeguinte,
  };
}

