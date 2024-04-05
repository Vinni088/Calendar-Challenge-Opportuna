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

  const meses= ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const nomeDiaDaSemana = weekDays[diaDaSemana];
  const nomeMes = meses[mesAtual]

  return {
    day: diaAtual,
    dayFull: nomeDiaDaSemana,
    month: mesAtual + 1,
    monthFull: nomeMes,
    year: anoAtual,
    currentTime:horaAtual,
    weekDays,
    firstMonthDay: primeiroDiaMes,
    firstMonthDayFull: weekDays[primeiroDiaMes],
    qtyDaysThisMonth: diasNoMesAtual,
    qtyDaysPastMonth: diasNoMesAnterior,
    qtyDaysNextMonth: diasNoMesSeguinte,
  };
}

