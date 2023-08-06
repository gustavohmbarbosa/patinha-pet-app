type retornoProps = {
  erro?: boolean;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export async function getCep(cep: string) {
  // remover a mascara caso esteja
  const cepNoMask = cep.split("-").join("");

  // fazer a tentativa da busca da api - https://viacep.com.br/
  try {
    const retorno = await fetch(`https://viacep.com.br/ws/${cepNoMask}/json/`);
    const cepInfo: retornoProps = await retorno.json();

    if (cepInfo.erro) {
      throw new Error("Cep inexistente!");
    } else {
      return cepInfo;
    }
  } catch (error) {
    throw new Error("Erro ao buscar cep, verifique o cep inserido.");
  }
}
