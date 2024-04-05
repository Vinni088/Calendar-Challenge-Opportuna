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

  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const meses= ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  const nomeDiaDaSemana = diasDaSemana[diaDaSemana];
  const nomeMes = meses[mesAtual]

  return {
    diaNumero: diaAtual,
    diaHojeSemana: nomeDiaDaSemana,
    mesNumero: mesAtual + 1,
    mesExtenso: nomeMes,
    anoAtual,
    horaAtual,
    quantidadeDiasMesAtual: diasNoMesAtual,
    quantidadeDiasMesAnterior: diasNoMesAnterior,
    quantidadeDiasMesSeguinte: diasNoMesSeguinte,
  };
}

